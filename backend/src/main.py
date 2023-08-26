from typing import Annotated

from fastapi import FastAPI, Query, Request
from starlette import status
from starlette.responses import JSONResponse

from src.entity.custom_error import CustomError
from src.repository.spleeter_repositry_cli import SpleeterRepositoryCLI
from src.repository.youtube_downloader_repository_pytube import YoutubeDownloaderRepositoryPytube
from src.usecase.download_and_split import DownloadAndSplitUseCase


youtube_downloader_repository = YoutubeDownloaderRepositoryPytube()
spleeter_repository = SpleeterRepositoryCLI()
download_and_split_use_case = DownloadAndSplitUseCase(youtube_downloader_repository, spleeter_repository)

app = FastAPI()

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
def download_and_split(url: Annotated[str, Query()]):
    download_and_split_use_case.execute(url)
