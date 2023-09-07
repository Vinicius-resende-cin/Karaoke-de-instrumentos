import Image from "next/image";
import Link from "next/link";

export interface SongThumb {
  url: string;
  width: number;
  height: number;
}

interface SongCardProps {
  id: string;
  title: string;
  thumb: SongThumb;
  url: string;
}

export default function SongCard({ id, title, thumb, url }: SongCardProps) {
  const thumbRatio = thumb.width / thumb.height;
  const thumbHeight = 90;
  const thumbWidth = thumbHeight * thumbRatio;

  return (
    <div
      className="w-full py-1 px-3 flex flex-col sm:flex-row items-center gap-1 rounded-lg
    bg-slate-300 shadow">
      <Link
        href={url}
        target="_blank"
        className="flex flex-col sm:flex-row items-center sm:gap-5">
        <Image src={thumb.url} alt={title} width={thumbWidth} height={thumbHeight} />
        <h1 className="w-4/5 text-center sm:self-start text-black font-semibold">
          {title}
        </h1>
      </Link>
      <Link
        href={`/${id}`}
        className="w-full sm:w-auto sm:ml-auto flex items-center justify-center py-3 px-10 rounded-lg bg-blue-400 text-white">
        Play
      </Link>
    </div>
  );
}
