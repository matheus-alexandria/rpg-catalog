'use client';
import Card from "@/components/Card";
import Image from "next/image";
import logo from '../../public/logoBlack.png';
import { useEffect, useState } from "react";
import AddGameModal from "@/components/AddGameModal";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/v1/games`)
    .then((res) => res.json())
    .then((data: IGameData[]) => {
      setCards(data);
    });
  }, []);

  return (
    <main className="w-screen h-screen">
      {isModalOpen && <AddGameModal setOpenModal={setIsModalOpen} />}
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
        <div className="h-full w-[8rem] rounded-lg flex items-center justify-center">
          <button 
            className="text-4xl text-catalog-white h-[20%] w-[70%] rounded-lg flex items-center justify-center hover:bg-slate-700 bg-slate-800 transition-colors"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            +
          </button>
        </div>
      </div>
    </main>
  );
}
