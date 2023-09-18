export interface SongThumb {
  url: string;
  width: number;
  height: number;
}

export interface Song {
  id: string;
  title: string;
  thumb: SongThumb;
  url: string;
}
