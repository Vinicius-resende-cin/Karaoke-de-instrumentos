import uuid

import numpy as np
from scipy.spatial import distance

import acoustid
from fastapi import UploadFile

from src.entity.file import FileRepository
from src.entity.karaoke import KaraokeRepository


class KaraokeRepositoryAcoustId(KaraokeRepository):
    def __init__(self, file_repository: FileRepository):
        self.file_repository = file_repository

    def get_score(self, filename: str, stem: str, played_track: UploadFile) -> float:
        # Get stem fingerprint
        folder_path = self.file_repository.get_splitted_folder_path(filename)
        stem_file = f'{folder_path}/{stem}'
        _, stem_fingerprint = acoustid.fingerprint_file(stem_file)

        # Get played track fingerprint
        played_track_path = f'./uploads/{uuid.uuid4()}'
        with open(played_track_path, 'wb') as f:
            f.write(played_track.file.read())
        _, played_track_fingerprint = acoustid.fingerprint_file(played_track_path)

        # Compare fingerprints
        # make them the same size (ignore alignment)
        stem_size = len(stem_fingerprint)
        played_track_size = len(played_track_fingerprint)

        if stem_size > played_track_size:
            stem_slice = stem_fingerprint[:played_track_size]
            played_track_slice = played_track_fingerprint
        else:
            stem_slice = stem_fingerprint
            played_track_slice = played_track_fingerprint[:stem_size]

        # tuen into np arrays and normalize
        fingerprint_array_stem = np.array([float(x) for x in stem_slice])
        fingerprint_array_played_track = np.array([float(x) for x in played_track_slice])

        norm_stem_fp = fingerprint_array_stem / np.linalg.norm(fingerprint_array_stem)
        norm_played_track_fp = fingerprint_array_played_track / np.linalg.norm(fingerprint_array_played_track)

        # calculate score
        score_cosine = 1 - distance.cosine(norm_stem_fp, norm_played_track_fp)
        score_euclidean = 1 - distance.euclidean(norm_stem_fp, norm_played_track_fp)
        score_correlation = 1 - distance.correlation(norm_stem_fp, norm_played_track_fp)
        
        final_score = abs((score_cosine + score_euclidean) ** 2 * min(score_correlation, 0.05) * 10) / 2

        return final_score
