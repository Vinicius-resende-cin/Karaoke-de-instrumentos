from abc import ABC, abstractmethod

class YoutubeSearch(ABC):
    @abstractmethod
    def search_videos(self, query: str, num_results: int = 10, lang='pt-BR', region='BR') -> dict:
        pass
