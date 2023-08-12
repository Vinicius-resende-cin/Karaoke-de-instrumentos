# Karaoke API

## Requirements

You need to have Python 3.10 and Poetry installed.

You need to have `ffmpeg`, `libsndfile` and `libasound2-dev` installed:

```sh
sudo apt-get update
sudo apt-get install ffmpeg
sudo apt-get install libsndfile1
sudo apt-get install libasound2-dev
```

## Setup

Install dependencies using poetry:
```sh
poetry install
```

## Run

Run the API:
```sh
poetry run uvicorn src.main: app --reload
```

Check the docs accessing this URL on browser:

http://localhost:8000/docs
