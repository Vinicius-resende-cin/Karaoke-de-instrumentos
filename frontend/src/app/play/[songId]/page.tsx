"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { serverURL } from "@/config";
import "./instrument-selection.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = `${serverURL}/songs`;

const fetchSong = async (songId: string) => {
  const response = await fetch(`${BASE_URL}/${songId}/`);
  const song = await response.json();
  return song;
};

export default function InstrumentSelection() {
  const [showAcordes, setShowAcordes] = useState(false);
  const [showLetra, setShowLetra] = useState(false);
  const [song, setSong] = useState();

  const params = useSearchParams();

  const toggleShowAcordes = () => {
    setShowAcordes(!showAcordes);
  };

  const toggleShowLetra = () => {
    setShowLetra(!showLetra);
  };

  const getSong = async () => {
    const songId = params.get("songId") as string;
    const song = await fetchSong(songId);
    setSong(song);
  };

  useEffect(() => {
    getSong();
  });

  return (
    <div className="container">
      <Link href="/home" className="backButton">
        Voltar
      </Link>
      <div className="songContainer">
        <Image
          src={"/icons/home.ico"}
          alt="Song Cover"
          className="songImage"
          width={100}
          height={100}
        />
        <div className="songName">As It Was</div>
        <div className="artistName">Harry Styles</div>
      </div>
      <div className="select">
        <label htmlFor="instrument" className="instrumentClass">
          Instrumento:
        </label>
        <div className="select-wrapper">
          <select>
            <option value="guitarra">Guitarra</option>
            <option value="piano">Piano</option>
            <option value="violino">Violino</option>
            <option value="violao">Violão</option>
            <option value="bateria">Bateria</option>
          </select>
          <span className="select-icon">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </div>
      </div>
      <div className="showOptions">
        <div className="showText">Mostrar Acordes:</div>
        <div
          className={`checkbox ${showAcordes ? "checked" : ""}`}
          onClick={toggleShowAcordes}></div>
      </div>
      <div className="showOptions">
        <div className="showText">Mostrar Letra:</div>
        <div
          className={`checkbox2 ${showLetra ? "checked" : ""}`}
          onClick={toggleShowLetra}></div>
      </div>
      <div className="playButton">
        <span className="playIcon">▶</span>
      </div>
    </div>
  );
}
