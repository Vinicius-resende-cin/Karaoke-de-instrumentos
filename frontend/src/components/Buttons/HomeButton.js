import React from "react";
import home_ico from "../../assets/icons/home.ico";
import home_selected from "../../assets/icons/home_selected.ico";

export default function HomeButton({ selected }) {
  return (
    <a href="/home">
      <img src={selected ? home_selected : home_ico} alt="Home"></img>
    </a>
  );
}
