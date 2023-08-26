from abc import ABC, abstractmethod


class FileRepository(ABC):
    @staticmethod
    @abstractmethod
    def get_file_path(filename: str) -> str:
        pass

    @staticmethod
    @abstractmethod
    def get_splitted_folder_path(filename: str) -> str:
        pass

    @staticmethod
    @abstractmethod
    def check_file_exists(filepath: str) -> None:
        pass

    @staticmethod
    @abstractmethod
    def is_splitted(filename: str) -> bool:
        pass

    @staticmethod
    @abstractmethod
    def list_splitted_files(filename: str) -> list[str]:
        pass

    @staticmethod
    @abstractmethod
    def exists_track_with_stem_removed(filename: str, stem: str) -> bool:
        pass

    @staticmethod
    @abstractmethod
    def list_tracks() -> list[str]:
        pass
