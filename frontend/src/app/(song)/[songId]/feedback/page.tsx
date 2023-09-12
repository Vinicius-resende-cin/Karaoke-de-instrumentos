"use client";

import { useFeedbackContext } from "../../contexts/FeedbackContext";

export default function Feedback() {
  const { score } = useFeedbackContext();

  function getStarScore(score: number) {
    if (score < 0.1) {
      return "☆☆☆☆☆";
    } else if (score < 0.25) {
      return "★☆☆☆☆";
    } else if (score < 0.5) {
      return "★★☆☆☆";
    } else if (score < 0.6) {
      return "★★★☆☆";
    } else if (score < 0.9) {
      return "★★★★☆";
    } else {
      return "★★★★★";
    }
  }

  return (
    <div>
      <h1>{getStarScore(score)}</h1>
    </div>
  );
}
