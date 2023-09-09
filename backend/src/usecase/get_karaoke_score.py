from fastapi import UploadFile

from src.entity.karaoke import KaraokeRepository


class GetKaraokeScoreUseCase:
    def __init__(self, repository: KaraokeRepository):
        self.repository = repository

    def execute(self, filename: str, stem: str, played_track: UploadFile) -> float:
        if not stem.endswith('.wav'):
            stem = f'{stem}.wav'
        return self.repository.get_score(filename, stem, played_track)
