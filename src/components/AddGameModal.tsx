'use client'

import { Dispatch, FormEvent, SetStateAction, useState } from "react";

export default function AddGameModal(props: AddGameModalProps) {
  const [game, setGame] = useState('');

  function sendFormData(event: FormEvent) {
    event.preventDefault();
    console.log(game);
  }

  return (
    <div className="absolute h-[36rem] w-[36rem] left-[32%] top-[14%] bg-slate-900 px-8 py-6 rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Adicionar novo jogo</h2>
        <button className="text-xl font-bold" onClick={() => props.setOpenModal(false)}>X</button>
      </div>
      <form onSubmit={(e) => sendFormData(e)} className="flex flex-col mt-2 gap-2">
        <p className="">Insira o nome do RPG de mesa:</p>
        <input 
          type="text"
          className="p-2 rounded-sm text-catalog-dark"
          placeholder="Dungeons & Dragons"
          onChange={(e) => setGame(e.target.value)}
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