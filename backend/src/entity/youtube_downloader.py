from abc import ABC, abstractmethod


class YoutubeDownloaderRepository(ABC):
    @staticmethod
    @abstractmethod
    def normalize_string(s: str) -> str:
        pass

    @abstractmethod
    def download(self, url: str) -> str:
        pass
