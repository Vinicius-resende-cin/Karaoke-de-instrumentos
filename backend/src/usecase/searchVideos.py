from src.repository.youtube_search_repository import YoutubeSearchRepository

class YoutubeSearchUseCase:
    def __init__(self, youtube_search_repository: YoutubeSearchRepository) -> None:
        self.youtube_search_repository = youtube_search_repository

    def search_videos(self, query: str, num_results: int = 10, result_type: str = 'videos') -> dict:
        return self.youtube_search_repository.search_videos(query, num_results, result_type)
