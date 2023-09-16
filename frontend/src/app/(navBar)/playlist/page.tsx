import SongList from "@/components/SongList/Songlist";
import Songs from "../api/songs.json";

export default function PlaylistPage() {
  const starredSongs = Songs["starred"];

  return (
    <div className="p-10 flex flex-col items-center justify-start gap-10">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="font-bold text-3xl">Favoritos</h1>
        <SongList songs={starredSongs} />
      </div>
    </div>
  );
}
