import Songs from "../api/songs.json";
import SongList from "@/components/SongList/Songlist";

export default function HomePage() {
  const top10Songs = Songs["top"];

  return (
    <div className="p-10 flex flex-col items-center justify-start gap-10">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="font-bold text-3xl">Populares</h1>
        <SongList songs={top10Songs} />
      </div>
    </div>
  );
}
