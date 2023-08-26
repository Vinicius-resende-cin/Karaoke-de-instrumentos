"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { serverURL } from "@/config";
import "./instrument-selection.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = `${serverURL}/songs`;

const songURL = (songId: string) => {
  return `https://youtube.com/watch?v=${songId}`;
};

const fetchSong = async (songId: string) => {
  const response = await fetch(`${BASE_URL}/${songId}/`);
  const song = await response.json();
  return song;
};

const loadServerSong = async (songId: string) => {
  const url = songURL(songId);
  await fetch(`${serverURL}/download-and-split?url=${url}`, { method: "POST" });
};

export default function InstrumentSelection() {
  const [showAcordes, setShowAcordes] = useState(false);
  const [showLetra, setShowLetra] = useState(false);
  const [song, setSong] = useState();

  const params = useParams();

  const toggleShowAcordes = () => {
    setShowAcordes(!showAcordes);
  };

  const toggleShowLetra = () => {
    setShowLetra(!showLetra);
  };

  const getSong = async () => {
    const songId = params.songId as string;
    await loadServerSong(songId);
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
          width={130}
          height={130}
        />
        <div className="songName">Riots</div>
        <div className="artistName">Stuck In The Sound</div>
      </div>
      <div className="select">
        <label htmlFor="instrument" className="instrumentClass">
          Instrumento:
        </label>
        <div className="select-wrapper">
          <select>
            <option value="guitarra">Baixo</option>
            <option value="piano">Piano</option>
            <option value="bateria">Percurssão</option>
            <option value="bateria">Vocal</option>
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
