"use client";
import "./Load.scss";
import { useParams } from "next/navigation";
import { serverURL } from "@/config";
import Image from "next/image";

const fetchAndRedirect = async (
  songName: string,
  instrument: string,
  destination: string
) => {
  const response = await fetch(
    `${serverURL}/track-with-removed-stem?filename=${songName}.mp3&stem_to_remove=${instrument}`
  );

  if (response.ok) {
    window.location.href = destination;
  }
};

export default function Load() {
  const params = useParams();
  const songId = params.songId;

  const songName = "Riots";
  const instrument = "vocals";
  const destination = `/${songId}/play`;

  fetchAndRedirect(songName, instrument, destination);

  return <Image src={"/gifs/loading.gif"} alt="loading gif" width={100} height={100} />;
}
