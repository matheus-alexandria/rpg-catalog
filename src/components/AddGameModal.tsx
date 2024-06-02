'use client';

import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

export default function AddGameModal(props: AddGameModalProps) {
  const [game, setGame] = useState('');
  const [description, setDescription] = useState('');
  const [dice, setDice] = useState('d20');
  const [theme, setTheme] = useState('');
  const [gameplayFocus, setGameplayFocus] = useState('');

  function sendFormData(event: FormEvent) {
    event.preventDefault();
    fetch('/api/v1/games', {
      method: 'POST',
      body: JSON.stringify({
        title: game,
        description,
        dice,
        theme,
        gameplay_focus: gameplayFocus
      })
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

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
          <p className="text-lg">Qual o dado principal utilizado?</p>
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
        <div className="flex flex-col gap-1">
          <p className="text-lg">Qual o tema principal desse RPG?</p>
          <input
            type="text"
            className="p-2 rounded-sm text-catalog-dark placeholder:text-catalog-dark placeholder:text-opacity-70"
            placeholder="Fantasia"
            onChange={(e) => setTheme(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg">Qual o foco do jogo?</p>
          <input
            type="text"
            className="p-2 rounded-sm text-catalog-dark placeholder:text-catalog-dark placeholder:text-opacity-70"
            placeholder="Ex: Roleplay, combate"
            onChange={(e) => setGameplayFocus(e.target.value)}
          />
        </div>
        <button
          className="w-1/3 rounded-lg p-2 mt-4 bg-catalog-accent text-catalog-dark font-bold hover:bg-green-400 transition-colors"
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
};
