import os

from src.entity.custom_error import CustomError
from src.entity.file import FileRepository


class FileRepositoryImpl(FileRepository):
    @staticmethod
    def get_file_path(filename: str) -> str:
        return os.path.join('.', 'samples', filename)

    @staticmethod
    def get_splitted_folder_path(filename: str) -> str:
        return FileRepositoryImpl.get_file_path(filename).replace('.mp3', '')

    @staticmethod
    def check_file_exists(filepath: str) -> None:
        if not os.path.exists(filepath):
            raise CustomError.file_not_found()

    @staticmethod
    def is_splitted(filename: str) -> bool:
        folder_path = FileRepositoryImpl.get_splitted_folder_path(filename)
        return os.path.exists(folder_path)

    @staticmethod
    def list_splitted_files(filename: str) -> list[str]:
        folder_path = FileRepositoryImpl.get_splitted_folder_path(filename)
        files = os.listdir(folder_path)
        return [file for file in files if 'removed' not in file]

    @staticmethod
    def exists_track_with_stem_removed(filename: str, stem: str) -> bool:
        folder_path = FileRepositoryImpl.get_splitted_folder_path(filename)
        files = os.listdir(folder_path)
        return any([f'{stem}_removed.wav' in file for file in files])
    
    @staticmethod
    def list_tracks() -> list[str]:
        files = os.listdir('./samples')
        return [file for file in files if '.mp3' in file]
