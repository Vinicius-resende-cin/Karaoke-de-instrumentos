from fastapi.responses import FileResponse

from src.entity.combine_stems import CombineStemsRepository
from src.entity.file import FileRepository


class GetTrackWithRemovedStemUseCase:
    def __init__(self, file_repository: FileRepository, combine_stems_repository: CombineStemsRepository):
        self.file_repository: FileRepository = file_repository
        self.combine_stems_repository: CombineStemsRepository = combine_stems_repository

    def execute(self, filename: str, stem_to_remove: str):
        if not stem_to_remove.endswith('.wav'):
            stem_to_remove = f'{stem_to_remove}.wav'
        # Combine stems
        track_name = self.combine_stems_repository.combine(filename, stem_to_remove)
        # Return track
        folder_path = self.file_repository.get_splitted_folder_path(filename)
        filepath = f'{folder_path}/{track_name}'
        return FileResponse(filepath)
