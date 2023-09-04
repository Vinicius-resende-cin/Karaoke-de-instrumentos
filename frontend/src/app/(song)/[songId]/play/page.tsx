"use client";
import Image from "next/image";
import { serverURL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useInstrumentContext } from "../../contexts/IntrumentContext";
import Load from "./components/load/load";

const fetchSong = async (songName: string, instrument: string) => {
  const response = await fetch(
    `${serverURL}/track-with-removed-stem?filename=${songName}.mp3&stem_to_remove=${instrument}`
  );

  return response;
};

export default function Player() {
  const [songSrc, setSongSrc] = useState<string>();
  const [errorFetchChecker, setErrorFetchChecker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songId = useParams().songId as string;
  const songName = "Riots";
  const { choosenInstrument } = useInstrumentContext();

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

  const handleFetchSong = async () => {
    fetchSong(songName, choosenInstrument)
      .then((response) => {
        if (response.ok) return response.blob();
        throw new Error(`${response.status} server error`);
      })
      .then((song) => {
        const audioURL = URL.createObjectURL(song);
        setSongSrc(audioURL);
        setIsLoading(false);
      })
      .catch(async (error) => {
        console.error("Error fetching audio:", error);
        setErrorFetchChecker(!errorFetchChecker);
      });
  };

  useEffect(() => {
    handleFetchSong();
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const delaySec = 10;
    let timer = setTimeout(() => handleFetchSong(), delaySec * 1000);
    return () => clearTimeout(timer);
  }, [errorFetchChecker]);

  return (
    <div className="p-10 flex flex-col items-center">
      <Link href={`/${songId}`} className="self-start">
        Voltar
      </Link>
      <p className="self-end text-blue-500">
        Tocando agora:{" "}
        <span className="text-black font-bold dark:invert">{songName}</span>
      </p>
      <div className="w-full h-96 my-10 grow bg-blue-300 rounded-md"></div>
      {isLoading ? (
        <Load />
      ) : (
        <>
          {songSrc && (
            <audio ref={audioRef}>
              <source src={songSrc} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          )}
          <div className="w-full flex items-center justify-around">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-sm bg-blue-500 disabled:bg-gray-400"
              onClick={playPause}
              disabled={!songSrc}>
              <Image
                src={isPlaying ? "/icons/pause.ico" : "/icons/play.ico"}
                alt="play/pause button"
                width={20}
                height={20}
              />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-500 disabled:bg-gray-400"
              onClick={stop}
              disabled={!songSrc}>
              <Image src={"/icons/stop.ico"} alt="stop button" width={20} height={20} />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-sm bg-green-500 disabled:bg-gray-400"
              onClick={restart}
              disabled={!songSrc}>
              <Image
                src={"/icons/reset.ico"}
                alt="restart button"
                width={20}
                height={20}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
