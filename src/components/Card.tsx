import Image from "next/image";
import { useState } from "react";

interface CardProps {
  title: string;
  imagePath: string;
  rpgData: {
    diceSystem: string;
    numberOfPlayers: string;
  }
}

export default function Card({ title, imagePath, rpgData }: CardProps) {
  const imageSize = 150;
  return (
    <div 
      className="w-[15%] rounded-md flex flex-col items-center justify-between gap-3 p-5 m-3 bg-stone-950"
    >
      <div className="flex flex-col items-center justify-start gap-2">
        <Image
          src={imagePath}
          alt='DnD Players Handbook cover'
          width={imageSize}
          height={imageSize}
        />
        
        <b className="text-xl text-center font-serif">{title}</b>
      </div>

      <div className="flex gap-5">
        <span>{rpgData.diceSystem}</span>
        <span>{rpgData.numberOfPlayers}</span>
      </div>
    </div>
  )
}