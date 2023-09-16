"use client";
import Image from "next/image";
import { serverURL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSongContext } from "@/contexts/SongContext";
import Link from "next/link";
import { useInstrumentContext } from "../../contexts/IntrumentContext";
import { useFeedbackContext } from "../../contexts/FeedbackContext";
import Load from "./components/load/load";
import { useReactMediaRecorder } from "react-media-recorder";

const fetchSong = async (songId: string, instrument: string) => {
  const response = await fetch(
    `${serverURL}/track-with-removed-stem?songId=${songId}.mp3&stem_to_remove=${instrument}`
  );

  return response;
};

const fetchFeedback = async (played_track: Blob, stem: string, songId: string) => {
  const data = new FormData();
  data.append("played_track", played_track);

  const response = await fetch(
    `${serverURL}/karaoke-score?stem=${stem}&songId=${songId}`,
    {
      method: "POST",
      body: data
    }
  );

  return response;
};

export default function Player() {
  const [songSrc, setSongSrc] = useState<string>();
  const [errorFetchChecker, setErrorFetchChecker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const router = useRouter();

  const { selectedSong } = useSongContext();
  const { choosenInstrument } = useInstrumentContext();
  const { setScore } = useFeedbackContext();

  async function handleFetchFeedback(blob: Blob) {
    return await fetchFeedback(blob, choosenInstrument, selectedSong.id)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(`${response.status} server error`);
      })
      .then((data) => {
        console.log(data);
        setScore(data.score);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  }

  function stop(goHome: boolean = true) {
    if (audioRef.current) {
      restart();
      setIsPlaying(false);
    }

    if (goHome) router.push("/home");
    else router.push(`/${selectedSong.id}/feedback`);
  }

  const { startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStart: () => {
      console.log("started recording");
      setScore(0);
    },
    onStop: (blobUrl, blob) => {
      console.log(blobUrl);
      handleFetchFeedback(blob);
    }
  });

  if (typeof selectedSong.id === "undefined") {
    router.push("/home");
    return;
  }

  function start() {
    if (!audioRef.current) return;
    restart();
    stopRecording();
    if (isPlaying) return;
    audioRef.current.play();
    setIsPlaying(true);
  }

  function restart() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    if (!isPlaying) return;
    setIsPlaying(false);
  }

  function handleStart() {
    start();
    if (!isPlaying) startRecording();
  }

  function handleStop(goHome: boolean = true) {
    stopRecording();
    stop(goHome);
  }

  const handleFetchSong = async () => {
    fetchSong(selectedSong.id, choosenInstrument)
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
      <Link href={`/${selectedSong.id}`} className="self-start">
        Voltar
      </Link>
      <p className="self-end text-blue-500">
        Tocando agora:{" "}
        <span className="text-black font-bold dark:invert">{selectedSong.title}</span>
      </p>
      <div className="w-full h-96 my-10 grow bg-blue-300 rounded-md"></div>
      {isLoading ? (
        <Load />
      ) : (
        <>
          {songSrc && (
            <audio
              ref={audioRef}
              onEnded={() => {
                handleStop(false);
              }}>
              <source src={songSrc} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          )}
          <div className="w-full flex items-center justify-around">
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-sm ${
                isPlaying ? "bg-[#13ad5b]" : "bg-blue-500"
              } disabled:bg-gray-400`}
              onClick={handleStart}
              disabled={!songSrc}>
              <Image
                src={isPlaying ? "/icons/reset.ico" : "/icons/play.ico"}
                alt="play/restart button"
                width={20}
                height={20}
              />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-sm bg-gray-500 disabled:bg-gray-400"
              onClick={() => {
                handleStop();
              }}
              disabled={!songSrc}>
              <Image src={"/icons/stop.ico"} alt="stop button" width={20} height={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
