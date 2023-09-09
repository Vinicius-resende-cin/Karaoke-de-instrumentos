"use client";

import { serverURL } from "@/config";
import { useEffect, useState } from "react";

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

  const stem = "bass";
  const songId = "QU9c0053UAU";

  function getStarScore(score: number) {
    if (score < 0.5) {
      return "☆☆☆☆☆";
    } else if (score < 0.6) {
      return "★☆☆☆☆";
    } else if (score < 0.7) {
      return "★★☆☆☆";
    } else if (score < 0.8) {
      return "★★★☆☆";
    } else if (score < 0.9) {
      return "★★★★☆";
    } else {
      return "★★★★★";
    }
  }

  useEffect(() => {
    if (!file) return;
    fetchFeedback(file, stem, songId)
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
    <div>
      <form>
        <input type="file" onChange={handleChangeFile} />
      </form>
      <h1>{getStarScore(score)}</h1>
    </div>
  );
}
