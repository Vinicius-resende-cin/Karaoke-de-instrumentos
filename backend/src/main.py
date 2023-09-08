import asyncio
import os

from fastapi.middleware.cors import CORSMiddleware

from typing import Annotated
from pytube import YouTube

from fastapi import FastAPI, Query, Request, UploadFile
from starlette import status
from starlette.responses import JSONResponse

from src.entity.custom_error import CustomError
from src.repository.combine_stems_repository_pydub import CombineStemsRepositoryPydub
from src.repository.file_repository import FileRepositoryImpl
from src.repository.karaoke_repository import KaraokeRepositoryAcoustId
from src.repository.spleeter_repositry_cli import SpleeterRepositoryCLI
from src.repository.youtube_search_repository import YoutubeSearchRepository
from src.repository.youtube_downloader_repository_pytube import YoutubeDownloaderRepositoryPytube
from src.usecase.get_karaoke_score import GetKaraokeScoreUseCase

from src.usecase.search_videos import YoutubeSearchUseCase
from src.usecase.download_and_split import DownloadAndSplitUseCase
from src.usecase.get_track_with_removed_stem import GetTrackWithRemovedStemUseCase
from src.usecase.list_tracks import ListTracksUseCase

file_repository = FileRepositoryImpl()
search_repository = YoutubeSearchRepository()
youtube_downloader_repository = YoutubeDownloaderRepositoryPytube()
spleeter_repository = SpleeterRepositoryCLI(file_repository)
combine_stems_repository = CombineStemsRepositoryPydub(file_repository)
karaoke_repository = KaraokeRepositoryAcoustId(os.environ['ACOUSTID_API_KEY'], file_repository)

search_use_case = YoutubeSearchUseCase(search_repository)
download_and_split_use_case = DownloadAndSplitUseCase(youtube_downloader_repository, spleeter_repository)
get_track_with_removed_stem_use_case = GetTrackWithRemovedStemUseCase(file_repository, combine_stems_repository)
list_tracks_use_case = ListTracksUseCase(file_repository)
get_karaoke_score_use_case = GetKaraokeScoreUseCase(karaoke_repository)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(CustomError)
def custom_error_handler(_: Request, e: CustomError):
    return JSONResponse(
        status_code=e.status,
        content={'message': e.message},
    )

@app.get("/")
def hello_world():
    return {"message": "Hello World"}

@app.get("/search", status_code=status.HTTP_200_OK)
async def search_songs(
        query: Annotated[str, Query()]
):
    try:
        print(f"Processing search of {query}")
        results = await asyncio.to_thread(search_use_case.execute, query)
        return results
    except Exception as e:
        raise CustomError(status.HTTP_500_INTERNAL_SERVER_ERROR, str(e) + ":: error searching")

@app.post("/download-and-split", status_code=status.HTTP_204_NO_CONTENT)
async def download_and_split(
        url: Annotated[str, Query()],
):
    try:
        print(f"Processing download and split of {url}")
        await asyncio.to_thread(download_and_split_use_case.execute, url)
    except Exception as e:
        print(str(e) + ":: error downloading and splitting")
        raise CustomError(status.HTTP_500_INTERNAL_SERVER_ERROR, str(e) + ":: error downloading and splitting")

@app.get("/tracks", status_code=status.HTTP_200_OK)
def list_tracks():
    return list_tracks_use_case.execute()

@app.get("/track-with-removed-stem", status_code=status.HTTP_200_OK)
async def get_track_with_remove_stem(
        song_id: Annotated[str, Query(alias="songId")],
        stem_to_remove: Annotated[str, Query()],
):
    try:
        yt = YouTube(f"https://www.youtube.com/watch?v={song_id}")
        filename = youtube_downloader_repository.normalize_string(yt.title)
        print(f"Processing remove stem {stem_to_remove} of {filename}")
        file = await asyncio.to_thread(get_track_with_removed_stem_use_case.execute, filename, stem_to_remove)
        return file
    except Exception as e:
        print(str(e) + ":: error getting track with removed stem")
        raise CustomError(status.HTTP_500_INTERNAL_SERVER_ERROR, str(e) + ":: error getting track with removed stem")

@app.post("/karaoke-score", status_code=status.HTTP_200_OK)
async def get_karaoke_score(
        played_track: UploadFile,
        stem: Annotated[str, Query()],
        song_id: Annotated[str, Query(alias="songId")],
):
    try:
        yt = YouTube(f"https://www.youtube.com/watch?v={song_id}")
        filename = youtube_downloader_repository.normalize_string(yt.title)
        score = await asyncio.to_thread(get_karaoke_score_use_case.execute, filename, stem, played_track)
        return score
    except Exception as e:
        print(str(e) + ":: error getting karaoke score")
        raise CustomError(status.HTTP_500_INTERNAL_SERVER_ERROR, str(e) + ":: error getting karaoke score")
