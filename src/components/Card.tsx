'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  imagePath: string;
  rpgData: {
    diceSystem: string;
    theme: string;
    focus: string;
  }
}

export default function Card({ title, imagePath, rpgData }: CardProps) {
  const router = useRouter();
  const imageSize = 250;
  return (
    <div 
      className="w-[100%] rounded-lg flex flex-col items-center justify-between gap-3 m-3 bg-stone-950"
      onClick={() => router.push('/card')}
    >
      <Image
        src={imagePath}
        className="rounded-t-lg"
        alt='DnD Players Handbook cover'
        width={imageSize}
        height={imageSize}
      />

      <b className="text-lg text-center font-serif">{title}</b>

      <div className="flex gap-5">
        <span>{rpgData.diceSystem}</span>
        <span>{rpgData.theme}</span>
        <span>{rpgData.focus}</span>
      </div>
    </div>
  )
}