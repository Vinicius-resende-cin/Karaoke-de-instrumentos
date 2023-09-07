import Link from "next/link";
import TopSongs from "./api/data.json";
import SongList from "@/components/SongList/Songlist";

export default function HomePage() {
  const top10_songs = TopSongs["songs"];

  return (
    <div className="p-10 flex flex-col items-center justify-start gap-10">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="font-bold text-3xl">Populares</h1>
        <Link href="/AtVZifGCX7s" className="text-xl">
          Riots - Stuck in the Sound *remover
        </Link>
        <SongList songs={top10_songs} />
      </div>
    </div>
  );
}
