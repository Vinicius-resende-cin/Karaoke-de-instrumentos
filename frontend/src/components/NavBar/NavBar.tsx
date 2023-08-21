"use client";
import { useState } from "react";
import NavButton from "@/components/NavBar/NavButton/NavButton";

export default function NavBar() {
  const [selectedButton, setSelectedButton] = useState("home");

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <nav>
      <div className="flex flex-row justify-around p-6">
        <NavButton
          link="/home"
          name="home"
          image="/icons/home.ico"
          image_selected="/icons/home_selected.ico"
          size={50}
          selected={selectedButton === "home"}
          handleClick={handleButtonClick}
        />
        <NavButton
          link="/playlist"
          name="playlist"
          image="/icons/song.ico"
          image_selected="/icons/song_selected.ico"
          size={50}
          selected={selectedButton === "playlist"}
          handleClick={handleButtonClick}
        />
        <NavButton
          link="/profile"
          name="profile"
          image="/icons/profile.ico"
          image_selected="/icons/profile_selected.ico"
          size={50}
          selected={selectedButton === "profile"}
          handleClick={handleButtonClick}
        />
        <NavButton
          link="/options"
          name="options"
          image="/icons/options.ico"
          image_selected="/icons/options_selected.ico"
          size={50}
          selected={selectedButton === "options"}
          handleClick={handleButtonClick}
        />
      </div>
    </nav>
  );
}
