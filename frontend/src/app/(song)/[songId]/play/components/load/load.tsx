import Image from "next/image";

export default function Load() {
  return <Image src={"/gifs/loading.gif"} alt="loading gif" width={50} height={50} />;
}
