import os
import re
import urllib.parse

from pytube import YouTube
from pytube.exceptions import RegexMatchError, VideoUnavailable, PytubeError
from unidecode import unidecode

from src.entity.custom_error import CustomError
from src.entity.youtube_downloader import YoutubeDownloaderRepository


class YoutubeDownloaderRepositoryPytube(YoutubeDownloaderRepository):
    @staticmethod
    def normalize_string(s: str) -> str:
        decoded = urllib.parse.unquote(s)
        normalized = unidecode(decoded).replace(' ', '_')
        cleaned = re.sub(r'[^a-zA-Z0-9-_.]', '', normalized)
        return cleaned

    def download(self, url: str) -> str:
        try:
            yt = YouTube(url)
            audio = yt.streams.filter(only_audio=True).first()
            if audio is None:
                raise CustomError.audio_not_found()
            filename = self.normalize_string(yt.title)
            song = audio.download(output_path='./samples', filename=filename)
            base, _ = os.path.splitext(song)
            new_file = base + '.mp3'
            os.rename(song, new_file)
            print(f'File {filename} downloaded')
            return new_file
        except (RegexMatchError, VideoUnavailable, PytubeError) as e:
            raise CustomError.error_downloading() from e
        except Exception as e:
            raise CustomError.internal_error() from e
