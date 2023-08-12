import React from "react";
import profile_icon from "../../assets/icons/profile.ico";
import profile_selected from "../../assets/icons/profile_selected.ico";

export default function ProfileButton({ selected }) {
  return (
    <a href="/profile">
      <img src={selected ? profile_selected : profile_icon} alt="Playlist"></img>
    </a>
  );
}
