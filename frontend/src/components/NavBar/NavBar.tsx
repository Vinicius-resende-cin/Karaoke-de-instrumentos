"use client";
import { useState } from "react";
import Image from "next/image";
import NavButton from "@/components/NavBar/NavButton/NavButton";

export default function NavBar() {
  const [selectedButton, setSelectedButton] = useState("home");

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <nav>
      <div className="flex flex-row justify-between px-5 py-6">
        <span className="flex items-center gap-2 text-xl font-bold">
          <Image
            src="/icons/mic.ico"
            alt="Logo"
            className="dark:invert"
            width={50}
            height={50}
          />
          Karaoke
        </span>
        <span className="flex items-center gap-5">
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
        </span>
      </div>
    </nav>
  );
}
