import { useState } from "react";
import SongList from "@/components/SongList/Songlist";
import { Song } from "@/models/Song";

interface SearchBarProps {
  onSearch: Function;
  searchList: Song[];
  showResults: boolean;
}

export default function SearchBar({ onSearch, searchList, showResults }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <>
      <div className="w-full relative">
        <div className="w-full flex justify-between items-center gap-1 cursor-default">
          <input
            placeholder="Digite sua pesquisa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-slate-400 rounded text-black"
          />
          <button onClick={handleSearch} className="w-40 p-2 rounded bg-blue-400">
            Pesquisar
          </button>
        </div>
      </div>
      {showResults && searchList.length > 0 && (
        <div className="w-full relative z-10 flex justify-center">
          <div className="w-full p-5 absolute bg-slate-400 dark:bg-white rounded">
            <SongList songs={searchList} />
          </div>
        </div>
      )}
    </>
  );
}
