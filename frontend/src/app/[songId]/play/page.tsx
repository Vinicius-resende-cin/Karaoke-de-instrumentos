"use client";
import { useParams } from "next/navigation";
import "./Player.scss";
import Image from "next/image";

export default function Player() {
  const params = useParams();
  const songId = params.songId;
  return (
    <div className="container">
      <a className="backButton" href={`/${songId}`}>
        voltar
      </a>
      <p className="playingNow">Tocando agora: {songId}</p>
      <div className="lyricsContainer"></div>
      <div className="buttonsContainer">
        <button className="pause">
          <Image
            src={"/icons/pause.ico"}
            alt=""
            className="pauseImage"
            width={50}
            height={50}
          />
        </button>
        <button className="stop">
          <Image
            src={"/icons/stop.ico"}
            alt=""
            className="stopImage"
            width={50}
            height={50}
          />
        </button>
        <button className="reset">
          <Image
            src={"/icons/reset.ico"}
            alt=""
            className="resetImage"
            width={50}
            height={50}
          />
        </button>
      </div>
    </div>
  );
}