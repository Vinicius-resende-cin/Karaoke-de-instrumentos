import asyncio

from fastapi.middleware.cors import CORSMiddleware

from typing import Annotated

from fastapi import FastAPI, Query, Request
from starlette import status
from starlette.responses import JSONResponse

from src.entity.custom_error import CustomError
from src.repository.combine_stems_repository_pydub import CombineStemsRepositoryPydub
from src.repository.file_repository import FileRepositoryImpl
from src.repository.spleeter_repositry_cli import SpleeterRepositoryCLI
from src.repository.youtube_downloader_repository_pytube import YoutubeDownloaderRepositoryPytube
from src.usecase.download_and_split import DownloadAndSplitUseCase
from src.usecase.get_track_with_removed_stem import GetTrackWithRemovedStemUseCase
from src.usecase.list_tracks import ListTracksUseCase

file_repository = FileRepositoryImpl()
youtube_downloader_repository = YoutubeDownloaderRepositoryPytube()
spleeter_repository = SpleeterRepositoryCLI(file_repository)
combine_stems_repository = CombineStemsRepositoryPydub(file_repository)

download_and_split_use_case = DownloadAndSplitUseCase(youtube_downloader_repository, spleeter_repository)
get_track_with_removed_stem_use_case = GetTrackWithRemovedStemUseCase(file_repository, combine_stems_repository)
list_tracks_use_case = ListTracksUseCase(file_repository)

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

@app.post("/download-and-split", status_code=status.HTTP_204_NO_CONTENT)
async def download_and_split(
        url: Annotated[str, Query()],
):
    try:
        await asyncio.to_thread(download_and_split_use_case.execute, url)
    except Exception as e:
        print(str(e) + ":: error downloading and splitting")
        raise CustomError(status.HTTP_500_INTERNAL_SERVER_ERROR, str(e) + ":: error downloading and splitting")

@app.get("/tracks", status_code=status.HTTP_200_OK)
def list_tracks():
    return list_tracks_use_case.execute()

@app.get("/track-with-removed-stem", status_code=status.HTTP_200_OK)
def get_track_with_remove_stem(
        filename: Annotated[str, Query()],
        stem_to_remove: Annotated[str, Query()],
):
    try:
        file = get_track_with_removed_stem_use_case.execute(filename, stem_to_remove)
        return file
    except Exception as e:
        print(str(e) + ":: error getting track with removed stem")
        raise CustomError(status.HTTP_500_INTERNAL_SERVER_ERROR, str(e) + ":: error getting track with removed stem")
