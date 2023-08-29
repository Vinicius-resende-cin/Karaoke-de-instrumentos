"use client";
import "./Player.scss";
import Image from "next/image";
import { serverURL } from "@/config";
import { useEffect, useRef, useState } from "react";

const fetchSong = async (songName: string, instrument: string) => {
  const response = await fetch(
    `${serverURL}/track-with-removed-stem?filename=${songName}.mp3&stem_to_remove=${instrument}`
  ).then((res) => res.blob());

  return response;
};

export default function Player() {
  const [songSrc, setSongSrc] = useState<string>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songName = "Riots";
  const instrument = "vocals";

  function stop() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }

    window.location.href = "/home";
  }

  function playPause() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function restart() {
    if (!audioRef.current) return;
    playPause();
    audioRef.current.currentTime = 0;
  }

  useEffect(() => {
    fetchSong(songName, instrument)
      .then((song) => {
        const audioURL = URL.createObjectURL(song);
        setSongSrc(audioURL);
      })
      .catch((error) => {
        console.error("Error fetching audio:", error);
      });
  }, []);

  return (
    <div className="container">
      <a className="backButton" href={`/${songName}`}>
        voltar
      </a>
      <p className="playingNow">Tocando agora: {songName}</p>
      {songSrc && (
        <audio ref={audioRef}>
          <source src={songSrc} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
      <div className="lyricsContainer"></div>
      <div className="buttonsContainer">
        <button className="pause" onClick={playPause} disabled={!songSrc}>
          <Image
            src={isPlaying ? "/icons/pause.ico" : "/icons/play.ico"}
            alt="play/pause button"
            width={20}
            height={20}
          />
        </button>
        <button className="stop" onClick={stop} disabled={!songSrc}>
          <Image src={"/icons/stop.ico"} alt="stop button" width={20} height={20} />
        </button>
        <button className="reset" onClick={restart} disabled={!songSrc}>
          <Image src={"/icons/reset.ico"} alt="restart button" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
