import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NavButtonProps {
  link: string;
  name: string;
  image: string;
  image_selected: string;
  size: number;
  selected: boolean;
  handleClick: Function;
}

export default function NavButton({
  link,
  name,
  image,
  image_selected,
  size,
  selected,
  handleClick
}: NavButtonProps) {
  return (
    <Link href={link} onClick={() => handleClick(name)}>
      <Image
        className={selected ? "" : "dark:invert"}
        src={selected ? image_selected : image}
        alt={name}
        width={size}
        height={size}
      />
    </Link>
  );
}
