"use client";

import { useFeedbackContext } from "../../contexts/FeedbackContext";
import Image from "next/image";
import { useSongContext } from "@/contexts/SongContext";
import "./feedback.scss";

export default function Feedback() {
  const { score } = useFeedbackContext();
  const { selectedSong } = useSongContext();

  function getStarScore(score: number) {
    if (score < 0.1) {
      return "/images/0stars.png";
    } else if (score < 0.25) {
      return "/images/1stars.png";
    } else if (score < 0.5) {
      return "/images/2stars.png";
    } else if (score < 0.6) {
      return "/images/3stars.png";
    } else if (score < 0.9) {
      return "/images/4stars.png";
    } else {
      return "/images/5stars.png";
    }
  }

  return (
    <div className="container">
      <div className="scoreContainer">
        <h1 className="score">Pontuação</h1>
        <Image src={getStarScore(score)} alt="stars" width={250} height={100} />
      </div>
      <div className="buttonsContainer">
        <a href={`/${selectedSong.id}/play`} className="resetButton">
          <Image src={"/icons/reset.ico"} alt="home button" width={35} height={35} />
        </a>
        <a href="/home" className="homeButton">
          <Image src={"/icons/home.ico"} alt="home button" width={40} height={40} />
        </a>
      </div>
    </div>
  );
}
