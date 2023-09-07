"use client";
import { createContext, useContext, useState } from "react";

export interface SongThumb {
  url: string;
  width: number;
  height: number;
}

interface Song {
  id: string;
  title: string;
  thumb: SongThumb;
  url: string;
}

interface SongContext {
  selectedSong: Song;
  setSelectedSong: React.Dispatch<React.SetStateAction<Song>>;
}

interface SongProviderProps {
  children: React.ReactNode;
}

export const SongContext = createContext<SongContext | null>(null);

export function SongProvider({ children }: SongProviderProps) {
  const [selectedSong, setSelectedSong] = useState({} as Song);

  return (
    <SongContext.Provider value={{ selectedSong, setSelectedSong }}>
      {children}
    </SongContext.Provider>
  );
}

export function useSongContext() {
  const context = useContext(SongContext);
  if (!context) throw new Error("SongContext not found!");
  return context;
}
