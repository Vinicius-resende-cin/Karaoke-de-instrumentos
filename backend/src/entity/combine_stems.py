from abc import ABC, abstractmethod


class CombineStemsRepository(ABC):
    @abstractmethod
    def combine(self, filename: str, stem_to_remove: str) -> str:
        pass
