import "./HomePage.scss";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="pt-10 flex flex-col items-center justify-start gap-10 text-3xl">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1>Populares</h1>
        <Link href="/exemplo">Exemplo</Link>
      </div>
      <div>
        <h1>Sugestões</h1>
      </div>
    </div>
  );
}
