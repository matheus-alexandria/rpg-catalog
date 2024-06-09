'use client';
import { Trash } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { icons } from '../../public/icons';

interface CardProps {
  id: string;
  title: string;
  imagePath?: string;
  removeCard: (id: string) => void;
  rpgData: {
    diceSystem: string;
    theme: string;
    focus: string;
  };
}

export default function Card({ id, title, imagePath, rpgData, removeCard }: CardProps) {
  const router = useRouter();
  const imageMultiplier = 80;

  function deleteCard(e: MouseEvent<HTMLButtonElement>) {
    fetch('/api/v1/games', {
      method: 'DELETE',
      body: JSON.stringify({
        id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 201) removeCard(id);
    });

    e.stopPropagation();
  }

  return (
    <button
      className="h-[30rem] max-w-[240px] rounded-lg flex flex-col items-center justify-between group gap-3 pb-5 bg-slate-800 hover:bg-slate-700 transition-colors hover:opacity-100:"
      type="button"
      onClick={() => router.push('/card')}
    >
      {imagePath ? (
        <Image
          src={imagePath}
          className="rounded-t-lg"
          alt="DnD Players Handbook cover"
          width={3 * imageMultiplier}
          height={4 * imageMultiplier}
        />
      ) : (
        <div className={'w-[240px] h-[320px] bg-catalog-primary rounded-t-lg'} />
      )}
      <button
        type="button"
        className="absolute translate-y-2 translate-x-24 opacity-0 group-hover:opacity-90 transition-opacity"
        onClick={(e) => deleteCard(e)}
      >
        <Trash size={20} color="#FFFFFF" className="hover:fill-red-500 transition-colors" />
      </button>

      <b className="text-2xl text-center font-serif">{title}</b>

      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-5">
          <span className="flex gap-1">
            <Image priority src={icons.d20} width={20} height={20} alt="20 sided die icon" />
            {rpgData.diceSystem}
          </span>
          <span className="flex gap-1">
            <Image priority src={icons.bookCover} width={20} height={20} alt="Book cover icon" />
            {rpgData.theme}
          </span>
        </div>
        <span className="flex gap-1">
          <Image priority src={icons.trailPath} width={20} height={20} alt="Trail path icon" />
          {rpgData.focus}
        </span>
      </div>
    </button>
  );
}
