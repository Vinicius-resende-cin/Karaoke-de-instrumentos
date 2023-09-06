from src.repository.youtube_search_repository import YoutubeSearchRepository
from youtubesearchpython import VideosSearch

class YoutubeSearch(YoutubeSearchRepository):
    def search_videos(self, query: str, num_results: int = 10, result_type: str = 'videos') -> dict:
        try:
            videosSearch = VideosSearch(query, limit=num_results, type=result_type)
            results = {}
            if videosSearch.result()['result']:
                for i in range(len(videosSearch.result()['result'])):
                    title = videosSearch.result()['result'][i]['title']
                    url = videosSearch.result()['result'][i]['link']
                    results[title] = url
            else:
                print("Nenhum resultado encontrado.")
            return results
        except ConnectionError as e:
            print(f"Um erro de conexão aconteceu: {e}")
            return {}
        except Exception as e:
            print(f"Um erro aconteceu: {e}")
            return {}
