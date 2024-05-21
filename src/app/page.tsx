'use client';
import Card from "@/components/Card";
import Image from "next/image";
import logo from '../../public/logoBlack.png';
import { useEffect, useState } from "react";

type IGameData = {
  id: string;
  title: string;
  description: string;
  cover_path: string;
  theme: string;
  gameplay_focus: string;
  dice: string;
}

export default function Home() {
  const [cards, setCards] = useState<IGameData[]>([]);

  useEffect(() => {
    fetch('http://localhost:3500/api/v1/games')
    .then((res) => res.json())
    .then((data: IGameData[]) => {
      setCards(data);
    });
  }, []);

  return (
    <main className="w-screen h-screen">
      <header className="p-7">
        <Image src={logo} width={120} height={120} alt='Shield and sword with "Catálogo RPGs" written under it' />
      </header>
      <div className="flex items-start justify-center h-1/2 gap-12 mt-5">
        {cards.map((element: IGameData) => (
          <Card 
            key={element.id}
            imagePath={element.cover_path}
            title={element.title}
            rpgData={{ diceSystem: element.dice, focus: element.gameplay_focus, theme: element.theme }}
          />
        ))}
        <div className="h-[28rem] w-[14rem] rounded-lg flex flex-col items-center justify-center bg-stone-800">
          <span className="text-4xl">+</span>
        </div>
      </div>
    </main>
  );
}
