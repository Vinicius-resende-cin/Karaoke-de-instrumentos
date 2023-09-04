import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-10 flex flex-col items-center justify-start gap-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="font-bold text-3xl">Populares</h1>
        <Link href="/AtVZifGCX7s" className="text-xl">
          Riots - Stuck in the Sound
        </Link>
      </div>
      <div>
        <h1 className="font-bold text-3xl">Sugestões</h1>
      </div>
    </div>
  );
}
