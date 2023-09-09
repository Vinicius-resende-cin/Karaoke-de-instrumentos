from abc import ABC, abstractmethod

from fastapi import UploadFile


class KaraokeRepository(ABC):
    @abstractmethod
    def get_score(self, filename: str, stem: str, played_track: UploadFile) -> int:
        pass
