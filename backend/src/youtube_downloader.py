import os
from pytube import YouTube
from pytube.exceptions import RegexMatchError, VideoUnavailable, PytubeError

def download_youtube_video(url: str, output_path: str):
    try:
        yt = YouTube(url)
        audio = yt.streams.filter(only_audio=True).first()
        if audio is None:
            raise PytubeError("Nenhum fluxo de áudio encontrado para a URL fornecida.")
        song = audio.download(output_path=output_path)
        base, ext = os.path.splitext(song)
        new_file = base + '.mp3'
        os.rename(song, new_file)
        print("Download concluído com sucesso!")
    except (RegexMatchError, VideoUnavailable, PytubeError) as e:
        print(f"Ocorreu um erro ao baixar o vídeo: {str(e)}")
    except Exception as e:
        print(f"Ocorreu um erro inesperado: {str(e)}")
