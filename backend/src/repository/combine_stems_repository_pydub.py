from pydub import AudioSegment

from src.entity.combine_stems import CombineStemsRepository
from src.entity.file import FileRepository


class CombineStemsRepositoryPydub(CombineStemsRepository):
    def __init__(self, file_repository: FileRepository):
        self.file_repository: FileRepository = file_repository

    def combine(self, filename: str, stem_to_remove: str) -> str:
        file_with_stem_removed = f'{stem_to_remove.replace(".wav", "")}_removed.wav'

        if self.file_repository.exists_track_with_stem_removed(filename, stem_to_remove):
            return file_with_stem_removed

        stems = self.file_repository.list_splitted_files(filename)
        stems.remove(stem_to_remove)
        folder_path = self.file_repository.get_splitted_folder_path(filename)

        sounds = [AudioSegment.from_file(f'{folder_path}/{stem}', format='wav') for stem in stems]

        output = sounds[0]
        for sound in sounds[1:]:
            output = output.overlay(sound)
        output.export(f'{folder_path}/{file_with_stem_removed}', format='wav')

        return file_with_stem_removed
