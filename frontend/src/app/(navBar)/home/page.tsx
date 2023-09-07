import Link from "next/link";
import TopSongs from "./api/data.json";
import SongList from "@/components/SongList/Songlist";

export default function HomePage() {
  const top10Songs = TopSongs["songs"];
  const starredSongs = [
    {
      id: "AtVZifGCX7s",
      title: "Stuck in the Sound - Riots [official video]",
      thumb: {
        url: "https://i.ytimg.com/vi/AtVZifGCX7s/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC2gKIfmS6oexJAs7qxZrbfbWwRBg",
        width: 720,
        height: 404
      },
      url: "https://www.youtube.com/watch?v=AtVZifGCX7s"
    }
  ];

  return (
    <div className="p-10 flex flex-col items-center justify-start gap-10">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="font-bold text-3xl">Favoritos</h1>
        <SongList songs={starredSongs} />
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="font-bold text-3xl">Populares</h1>
        <SongList songs={top10Songs} />
      </div>
    </div>
  );
}
