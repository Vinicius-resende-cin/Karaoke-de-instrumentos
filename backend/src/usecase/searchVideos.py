from src.repository.youtube_search_repository import YoutubeSearchRepository

class YoutubeSearchUseCase:
    def __init__(self, youtube_search_repository: YoutubeSearchRepository) -> None:
        self.youtube_search_repository = youtube_search_repository

    def execute(self, query: str, num_results: int = 10, result_type: str = 'videos') -> dict:
        try:
            results = self.youtube_search_repository.search_videos(query, num_results, result_type)
            return results
        except ConnectionError as e:
            print(f"Um erro de conexão aconteceu: {e}")
            return {}
        except Exception as e:
            print(f"Um erro aconteceu: {e}")
            return {}
