'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { icons } from "../../public/icons";

interface CardProps {
  title: string;
  imagePath?: string;
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
      className="h-[30rem] rounded-lg flex flex-col items-center justify-between gap-3 pb-5 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
      onClick={() => router.push('/card')}
    >
      {imagePath ? (
        <Image
          src={imagePath}
          className="rounded-t-lg"
          alt='DnD Players Handbook cover'
          width={imageSize}
          height={imageSize}
        />
      ) : (
        <div className={`h-[340px] w-[220px] bg-catalog-secondary`}></div>
      )}

      <b className="text-2xl text-center font-serif">{title}</b>

      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-5">
          <span className="flex gap-1">
            <Image priority src={icons.d20} width={20} height={20} alt='20 sided dice icon' />
            {rpgData.diceSystem}
          </span>
          <span className="flex gap-1">
            <Image priority src={icons.bookCover} width={20} height={20} alt='Book cover icon' />
            {rpgData.theme}
          </span>
        </div>
        <span className="flex gap-1">
          <Image priority src={icons.trailPath} width={20} height={20} alt='Trail path icon' />
          {rpgData.focus}
        </span>
      </div>
    </div>
  )
}