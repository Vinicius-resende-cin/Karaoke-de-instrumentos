import React from "react";
import options_icon from "../../assets/icons/options.ico";
import options_selected from "../../assets/icons/options_selected.ico";

export default function OptionsButton({ selected }) {
  return (
    <a href="/options">
      <img src={selected ? options_selected : options_icon} alt="Playlist"></img>
    </a>
  );
}
