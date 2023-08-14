import React from "react";
import song_ico from "../../assets/icons/song.ico";
import song_selected from "../../assets/icons/song_selected.ico";

export default function PlaylistButton({ selected }) {
  return (
    <a href="/playlist">
      <img src={selected ? song_selected : song_ico} alt="Playlist"></img>
    </a>
  );
}
