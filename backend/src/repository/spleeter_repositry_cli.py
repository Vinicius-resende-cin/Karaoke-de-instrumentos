import os

from src.entity.file import FileRepository
from src.entity.spleeter import SpleeterRepository


class SpleeterRepositoryCLI(SpleeterRepository):
    def __init__(self, file_repository: FileRepository):
        self.file_repository: FileRepository = file_repository

    def split(self, filename: str) -> None:
        # Get the file path
        filepath = self.file_repository.get_file_path(filename)
        # Check it exists before trying to split it
        self.file_repository.check_file_exists(filepath)
        # Check if file is already splitted
        if self.file_repository.is_splitted(filename):
            return
        # Split file
        print(f'Splitting {filename}...')
        os.system(f'spleeter separate -p spleeter:5stems -o ./samples/ {filepath}')
        print(f'Splitting {filename}... Done!')
