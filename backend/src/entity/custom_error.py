from starlette import status as st


class CustomError(Exception):
    def __init__(self, status: int, message: str):
        self.status = status
        self.message = message

    def __str__(self):
        return repr(self.message)

    @classmethod
    def internal_error(cls):
        return cls(st.HTTP_500_INTERNAL_SERVER_ERROR, 'Internal Server Error')

    @classmethod
    def file_not_found(cls):
        return cls(st.HTTP_500_INTERNAL_SERVER_ERROR, 'File not found')

    @classmethod
    def audio_not_found(cls):
        return cls(st.HTTP_400_BAD_REQUEST, 'Audio not found for the provided URL.')

    @classmethod
    def error_downloading(cls):
        return cls(st.HTTP_500_INTERNAL_SERVER_ERROR, 'Error trying to download the video.')
