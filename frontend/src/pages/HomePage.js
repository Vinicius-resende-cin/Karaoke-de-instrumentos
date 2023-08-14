import SongList from "../components/SongList/SongList";

export default function HomePage() {
  return (
    <div>
      <h1>Tocadas Recentemente</h1>
      <SongList></SongList>
      <h1>Sugestões</h1>
      <SongList></SongList>
    </div>
  );
}
