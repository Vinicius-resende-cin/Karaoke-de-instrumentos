from src.entity.youtube_search import YoutubeSearch
from youtubesearchpython import VideosSearch

class YoutubeSearchRepository(YoutubeSearch):
    def search_videos(self, query: str, num_results: int = 10, lang='pt-BR', region='BR') -> dict:
        try:
            videosSearch = VideosSearch(query, limit=num_results, language=lang, region=region)
            results = videosSearch.result().get('result', None)
            videos = []
            if results is not None:
                for i in range(len(results)):
                    id = results[i]['id']
                    title = results[i]['title']
                    thumb = results[i]['thumbnails'][-1]
                    url = results[i]['link']

                    videos.append({'id': id, 'title': title, 'thumb': thumb, 'url': url})
            else:
                print("Nenhum resultado encontrado.")
            return {"results": videos}
        except ConnectionError as e:
            print(f"Um erro de conexão aconteceu: {e}")
            return {}
        except Exception as e:
            print(f"Um erro aconteceu: {e}")
            return {}
