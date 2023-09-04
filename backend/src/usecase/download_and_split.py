from src.entity.spleeter import SpleeterRepository
from src.entity.youtube_downloader import YoutubeDownloaderRepository


class DownloadAndSplitUseCase:
    def __init__(
            self,
            youtube_downloader_repository: YoutubeDownloaderRepository,
            spleeter_repository: SpleeterRepository,
    ) -> None:
        self.youtube_downloader_repository = youtube_downloader_repository
        self.spleeter_repository = spleeter_repository

    def execute(self, url: str) -> None:
        # Download video audio
        try:
            filename = self.youtube_downloader_repository.download(url)
        except Exception as e:
            raise Exception(str(e) + ":: error downloading")
        # Split audio
        try:
            self.spleeter_repository.split(filename)
        except Exception as e:
            raise Exception(str(e) + ":: error splitting")
