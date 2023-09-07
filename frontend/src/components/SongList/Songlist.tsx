import SongCard, { SongThumb } from "./SongCard/SongCard";

interface Song {
  id: string;
  title: string;
  thumb: SongThumb;
  url: string;
}

interface SongListProps {
  songs: Song[];
}

export default function SongList({ songs }: SongListProps) {
  return (
    <div className="w-full flex flex-col gap-5">
      {songs.map((song) => (
        <SongCard key={song.id} {...song} />
      ))}
    </div>
  );
}
