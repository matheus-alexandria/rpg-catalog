'use client';
import AddGameModal from '@/components/AddGameModal';
import Card from '@/components/Card';
import { IGameData } from '@/types/IGameData';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '../../public/logoBlack.png';

export default function Home() {
  const [cards, setCards] = useState<IGameData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function addNewCard(card: IGameData) {
    const currentCards = cards;
    currentCards.push(card);
    setCards(currentCards);
  }

  function removeCard(id: string) {
    const currentCards = cards;
    const cardIndex = cards.findIndex((card) => card.id === id);
    currentCards.splice(cardIndex, 1);
    setCards([...currentCards]);
  }

  useEffect(() => {
    fetch('/api/v1/games')
      .then((res) => res.json())
      .then((data: IGameData[]) => {
        setCards(data);
      });
  }, []);

  return (
    <main className="w-screen h-screen">
      {isModalOpen && <AddGameModal setOpenModal={setIsModalOpen} addCard={addNewCard} />}
      <header className="p-7">
        <Image
          src={logo}
          width={120}
          height={120}
          alt='Shield and sword with "Catálogo RPGs" written under it'
        />
      </header>
      <div className="flex items-start justify-center gap-12 mt-5 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {cards.map((element: IGameData) => (
            <Card
              key={element.id}
              id={element.id}
              removeCard={removeCard}
              imagePath={element.cover_path}
              title={element.title}
              rpgData={{
                diceSystem: element.dice,
                focus: element.gameplay_focus,
                theme: element.GameTheme[0]?.theme.name
              }}
            />
          ))}
          <div className="h-[30rem] w-[8rem] rounded-lg flex items-center justify-center">
            <button
              className="text-4xl text-white h-[20%] w-[70%] rounded-lg flex items-center justify-center hover:bg-slate-700 bg-slate-800 transition-colors"
              type="button"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <footer className="h-20" />
    </main>
  );
}
