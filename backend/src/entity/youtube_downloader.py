from abc import ABC, abstractmethod


class YoutubeDownloaderRepository(ABC):
    @abstractmethod
    def download(self, url: str) -> str:
        pass
