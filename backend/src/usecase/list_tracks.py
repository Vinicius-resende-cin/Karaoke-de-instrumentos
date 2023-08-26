from src.entity.file import FileRepository


class ListTracksUseCase:
    def __init__(self, file_repository: FileRepository):
        self.file_repository: FileRepository = file_repository

    def execute(self) -> list[str]:
        tracks = self.file_repository.list_tracks()
        return [track.replace('.mp3', '') for track in tracks]
