import uuid

import acoustid
from fastapi import UploadFile

from src.entity.file import FileRepository
from src.entity.karaoke import KaraokeRepository


class KaraokeRepositoryAcoustId(KaraokeRepository):
    def __init__(self, api_key: str, file_repository: FileRepository):
        self.api_key = api_key
        self.file_repository = file_repository

    def get_score(self, filename: str, stem: str, played_track: UploadFile) -> int:
        # Get stem fingerprint
        folder_path = self.file_repository.get_splitted_folder_path(filename)
        stem_file = f'{folder_path}/{stem}'
        stem_fingerprint, stem_duration = acoustid.fingerprint_file(stem_file)
        # Get played track fingerprint
        played_track_path = f'./uploads/{uuid.uuid4()}'
        with open(played_track_path, 'wb') as f:
            f.write(played_track.file.read())
        played_track_fingerprint, played_track_duration = acoustid.fingerprint_file(played_track_path)
        # Compare fingerprints
        score = acoustid.match(self.api_key, [stem_fingerprint, played_track_fingerprint])
        # Return best score
        best_match = max(score, key=lambda x: x[1])
        return int(best_match[1] * 100)
