import os

from src.entity.custom_error import CustomError
from src.entity.spleeter import SpleeterRepository


class SpleeterRepositoryCLI(SpleeterRepository):
    @staticmethod
    def _get_file_path(filename: str) -> str:
        return os.path.join('.', 'samples', filename)

    @staticmethod
    def _get_splitted_folder_path(filename: str) -> str:
        return SpleeterRepositoryCLI._get_file_path(filename).replace('.mp3', '')

    @staticmethod
    def _check_file_exists(filepath: str) -> None:
        if not os.path.exists(filepath):
            raise CustomError.file_not_found()

    @staticmethod
    def is_splitted(filename: str) -> bool:
        folder_path = SpleeterRepositoryCLI._get_splitted_folder_path(filename)
        return os.path.exists(folder_path)

    def split(self, filename: str) -> None:
        # Get the file path
        filepath = self._get_file_path(filename)
        # Check it exists before trying to split it
        self._check_file_exists(filepath)
        # Check if file is already splitted
        if self.is_splitted(filename):
            return
        # Split file
        os.system(f'spleeter separate -p spleeter:5stems -o ./samples/ {filepath}')
