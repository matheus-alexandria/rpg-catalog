'use client';

import { IGameData } from '@/types/IGameData';
import { IThemeData } from '@/types/IThemeData';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';

export default function AddGameModal(props: AddGameModalProps) {
  const [themeTags, setThemeTags] = useState<IThemeData[]>([]);
  const [game, setGame] = useState('');
  const [description, setDescription] = useState('');
  const [dice, setDice] = useState('d20');
  const [theme, setTheme] = useState('');
  const [gameplayFocus, setGameplayFocus] = useState('');
  const [highlighted, setHighlighted] = useState<number | null>(null);

  function validateForm(): boolean {
    if (
      (game.length === 0 && game.length > 50) ||
      description.length === 0 ||
      (theme.length === 0 && theme.length > 50) ||
      (gameplayFocus.length === 0 && gameplayFocus.length > 50)
    ) {
      return false;
    }

    return true;
  }

  function setFocus(focus: string, buttonIndex: number) {
    setGameplayFocus(focus);
    setHighlighted(buttonIndex);
  }

  function sendFormData(event: FormEvent) {
    event.preventDefault();
    if (!validateForm()) return;

    fetch('/api/v1/games', {
      method: 'POST',
      body: JSON.stringify({
        title: game,
        description,
        dice,
        theme,
        gameplay_focus: gameplayFocus
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        props.addCard(data);
        props.setOpenModal(false);
      });
  }

  useEffect(() => {
    fetch('/api/v1/themes')
      .then((res) => res.json())
      .then((data: { themes: IThemeData[] }) => {
        setThemeTags(data.themes);
      });
  }, []);

  return (
    <div className="absolute w-[44rem] left-[31%] top-[14%] bg-slate-900 px-8 py-6 rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Adicionar novo jogo</h2>
        <button
          className="text-2xl font-bold"
          type="button"
          onClick={() => props.setOpenModal(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => sendFormData(e)} className="flex flex-col mt-2 gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-lg">Insira o nome do RPG de mesa:</p>
          <input
            type="text"
            className="p-2 rounded-sm text-catalog-dark placeholder:text-catalog-dark placeholder:text-opacity-70"
            placeholder="Dungeons & Dragons"
            onChange={(e) => setGame(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg">Escreva uma breve descrição sobre ele:</p>
          <input
            type="text"
            className="p-2 rounded-sm text-catalog-dark placeholder:text-catalog-dark placeholder:text-opacity-70"
            placeholder="Jogo com foco em fantasia..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg">Qual o principal dado utilizado?</p>
          <select
            className="p-2 text-catalog-dark rounded-sm"
            defaultValue={dice}
            onChange={(e) => setDice(e.target.value)}
          >
            <option value="d100">D100</option>
            <option value="d20">D20</option>
            <option value="d12">D12</option>
            <option value="d10">D10</option>
            <option value="d8">D8</option>
            <option value="d6">D6</option>
            <option value="d4">D4</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg">Escolha um ou mais temas que se encaixem esse RPG</p>
          <div className="bg-white rounded-md p-2">
            <button
              type="button"
              className="bg-purple-600 rounded-md py-1 px-3 hover:bg-purple-400 transition-colors"
            >
              fantasia
            </button>
          </div>
          <select className="flex items-start gap-3" onChange={(e) => console.log(e.target.value)}>
            {themeTags.map((theme) => (
              <option key={theme.id} value={theme.name}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg">Qual o foco do sistema?</p>
          <div className="flex gap-5">
            {['Roleplay', 'Combate', 'Investigação'].map((focus, index) => (
              <button
                type="button"
                onClick={() => setFocus(focus, index)}
                className={` p-3 font-bold rounded-lg transition-colors ${
                  highlighted === index ? 'bg-purple-600' : 'bg-catalog-dark hover:bg-slate-600'
                }`}
                key={`button-${focus}`}
              >
                {focus}
              </button>
            ))}
          </div>
        </div>
        <button
          className="w-1/4 rounded-lg p-2 mt-4 bg-catalog-accent text-catalog-dark font-bold hover:bg-green-400 transition-colors"
          type="submit"
        >
          Criar
        </button>
      </form>
    </div>
  );
}

type AddGameModalProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  addCard: (card: IGameData) => void;
};
