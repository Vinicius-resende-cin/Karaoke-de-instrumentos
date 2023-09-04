from abc import ABC, abstractmethod

class YoutubeSearchRepository(ABC):
    @abstractmethod
    def search_videos(self, query: str, num_results: int = 10, result_type: str = 'videos') -> dict:
        pass
