"use client";

import Image from "next/image";
import Link from "next/link";
import { useSongContext } from "@/contexts/SongContext";
import { useRouter } from "next/navigation";
import { SongThumb } from "@/models/Song";

interface SongCardProps {
  id: string;
  title: string;
  thumb: SongThumb;
  url: string;
}

export default function SongCard({ id, title, thumb, url }: SongCardProps) {
  const router = useRouter();
  const { setSelectedSong } = useSongContext();

  const thumbRatio = thumb.width / thumb.height;
  const thumbHeight = 90;
  const thumbWidth = thumbHeight * thumbRatio;

  function handleSelectSong() {
    setSelectedSong({ id, title, thumb, url });
    router.push(`/${id}`);
  }

  return (
    <div
      className="w-full py-1 px-3 flex flex-col sm:flex-row items-center gap-5 rounded-lg
    bg-slate-300 shadow">
      <Link href={url} target="_blank" className="flex flex-col sm:flex-row items-center sm:gap-5">
        <Image src={thumb.url} alt={title} width={thumbWidth} height={thumbHeight} />
        <h1 className="w-4/5 text-center sm:self-start text-black font-semibold">{title}</h1>
      </Link>
      <button
        className="w-full sm:w-auto sm:ml-auto flex items-center justify-center py-3 px-10 rounded-lg bg-blue-400 text-white"
        onClick={handleSelectSong}>
        Play
      </button>
    </div>
  );
}
