"use client";

import Songs from "../api/songs.json";
import SongList from "@/components/SongList/Songlist";
import SearchBar from "./components/searchBar/search-bar";
import { Song } from "@/models/Song";
import { MouseEvent, useRef, useState } from "react";
import { serverURL } from "@/config";

const fetchSearch = async (query: string) => {
  const response = await fetch(`${serverURL}/search?query=${query}`).then((response) =>
    response.json()
  );
  return response;
};

export default function HomePage() {
  const [searchList, setSearchList] = useState<Song[]>([]);
  const [showResults, setShowResults] = useState(false);
  const resultsList = useRef<HTMLDivElement>(null);
  const top10Songs = Songs["top"];

  function handleClicks(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    if (!resultsList.current) return;
    const target = event.target as HTMLElement;
    if (resultsList.current.contains(target)) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }

  async function handleSearch(searchTerm: string) {
    if (searchTerm === "") return setSearchList([]);
    await fetchSearch(searchTerm).then((response) => {
      setSearchList(response.results);
    });
  }

  return (
    <div
      className="p-10 flex flex-col items-center justify-start gap-10"
      onMouseDown={(e) => handleClicks(e)}>
      <div ref={resultsList} className="w-full">
        <SearchBar onSearch={handleSearch} searchList={searchList} showResults={showResults} />
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="font-bold text-3xl">Populares</h1>
        <SongList songs={top10Songs} />
      </div>
    </div>
  );
}
