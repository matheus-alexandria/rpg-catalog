'use client'

import { Dispatch, FormEvent, SetStateAction, useState } from "react";

export default function AddGameModal(props: AddGameModalProps) {
  const [game, setGame] = useState('');
  const [description, setDescription] = useState('');
  const [dice, setDice] = useState('');
  const [theme, setTheme] = useState('');
  const [gameplayFocus, setGameplayFocus] = useState('');

  function sendFormData(event: FormEvent) {
    event.preventDefault();
  }

  // description, dice, theme, gameplay_focus

  return (
    <div className="absolute w-[36rem] left-[32%] top-[14%] bg-slate-900 px-8 py-6 rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Adicionar novo jogo</h2>
        <button className="text-xl font-bold" onClick={() => props.setOpenModal(false)}>X</button>
      </div>
      <form onSubmit={(e) => sendFormData(e)} className="flex flex-col mt-2 gap-3">
        <p className="">Insira o nome do RPG de mesa:</p>
        <input 
          type="text"
          className="p-2 rounded-sm text-catalog-dark placeholder:text-catalog-dark placeholder:text-opacity-70"
          placeholder="Dungeons & Dragons"
          onChange={(e) => setGame(e.target.value)}
        ></input>
        <p className="">Escreva uma breve descrição sobre ele:</p>
        <input 
          type="text"
          className="p-2 rounded-sm text-catalog-dark placeholder:text-catalog-dark placeholder:text-opacity-70"
          placeholder="Jogo com foco em fantasia..."
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <p className="">Qual o dado principal utilizado?</p>
        {/* Fazer multipla escolha de dados */}
        <p className="">Qual o tema principal desse RPG?</p>
        <input 
          type="text"
          className="p-2 rounded-sm text-catalog-dark placeholder:text-catalog-dark placeholder:text-opacity-70"
          placeholder="Fantasia"
          onChange={(e) => setTheme(e.target.value)}
        ></input>
        <p className="">Qual o foco do jogo?</p>
        <input 
          type="text"
          className="p-2 rounded-sm text-catalog-dark placeholder:text-catalog-dark placeholder:text-opacity-70"
          placeholder="Ex: Roleplay, combate"
          onChange={(e) => setGameplayFocus(e.target.value)}
        ></input>
        <button 
          className="w-1/2 rounded-lg p-2 mt-4 bg-catalog-accent text-catalog-dark font-bold hover:bg-green-400 transition-colors" 
          type="submit"
        >
          Criar
        </button>
      </form>
    </div>
  )
}

type AddGameModalProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}