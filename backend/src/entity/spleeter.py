from abc import ABC, abstractmethod


class SpleeterRepository(ABC):
    @abstractmethod
    def split(self, filename: str) -> None:
        pass
