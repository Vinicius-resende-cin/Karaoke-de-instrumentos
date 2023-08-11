import os


def get_file_path(filename: str):
    return os.path.join('.', 'samples', filename)


def get_splitted_folder_path(filename: str):
    return get_file_path(filename).replace('.mp3', '')


def check_file_exists(filepath: str):
    if not os.path.exists(filepath):
        raise ValueError('File not found')


def is_splitted(filename: str):
    folder_path = get_splitted_folder_path(filename)
    return os.path.exists(folder_path)


def list_splitted_options(filename: str):
    folder_path = get_splitted_folder_path(filename)
    if not os.path.exists(folder_path):
        raise ValueError('File not splitted')
    return [file.replace('.wav', '')
            for file in os.listdir(folder_path)
            if os.path.isfile(os.path.join(folder_path, file))]


def split_song(filename: str):
    # Get file path
    filepath = get_file_path(filename)
    # Check it existis before trying to split it
    check_file_exists(filepath)
    # Check if file is already splitted
    if is_splitted(filename):
        print('File already splitted')
    else:
        # Split file
        print('Splitting file')
        os.system(f'spleeter separate -p spleeter:5stems -o ./samples/ {filepath}')
        print('File splitted')
    # Print splitted options
    print(f'Splitted options: {list_splitted_options(filename)}')


if __name__ == '__main__':
    split_song('rock_cut.mp3')
