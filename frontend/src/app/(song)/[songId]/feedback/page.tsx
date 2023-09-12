"use client";

import Image from "next/image";
import { serverURL } from "@/config";
import { useEffect, useState } from "react";
import { useSongContext } from "@/contexts/SongContext";
import { useInstrumentContext } from "../../contexts/IntrumentContext";
import "./feedback.scss"

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

export default function Feedback() {
  const [file, setFile] = useState<File | null>(null);
  const [score, setScore] = useState<number>(0);

  const { selectedSong } = useSongContext();
  const { choosenInstrument } = useInstrumentContext();

  function getStarScore(score: number) {
    if (score < 0.5) {
      return "/images/0stars.png";
    } else if (score < 0.6) {
      return "/images/2stars.png";
    } else if (score < 0.7) {
      return "/images/3stars.png";
    } else if (score < 0.8) {
      return "/images/4stars.png";
    } else if (score < 0.9) {
      return "/images/5stars.png";
    } else {
      return "/images/1stars.png";
    }
  }

  useEffect(() => {
    if (!file) return;
    fetchFeedback(file, choosenInstrument, selectedSong.id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setScore(data.score);
      });
  }, [file]);

  function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const newFile = e.target.files[0];
    setFile(newFile);
  }

  return (
    <div className="container">
      <div className="scoreContainer">
      <h1 className="score">Pontuação</h1>
      <Image
        src={getStarScore(score)}
        alt="stars"
        width={250}
        height={100}
      />
      </div>
      <div className="buttonsContainer">
        <a href={`/${selectedSong.id}/play`} className="resetButton">
          <Image
            src={"/icons/reset.ico"}
            alt="home button"
            width={35}
            height={35}
          />
        </a>
        <a href="/home" className="homeButton">
        <Image
          src={"/icons/home.ico"}
          alt="home button"
          width={40}
          height={40}
        />
        </a>
      </div>
    </div>
  );
}
