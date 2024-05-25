'use client'

import { FormEvent, useState } from "react";

export default function AddGameModal() {
  const [game, setGame] = useState('');

  function sendFormData(event: FormEvent) {
    event.preventDefault();
    console.log(game);
  }

  return (
    <div className="absolute h-80 w-96 left-1/2 top-1/2 bg-red-400">
      <h3>Adicionar novo jogo</h3>
      <form onSubmit={(e) => sendFormData(e)}>
        <p>Insira o nome do RPG de mesa:</p>
        <input 
          type="text"
          placeholder="Dungeons & Dragons"
          onChange={(e) => setGame(e.target.value)}
        ></input>
        <button type="submit">Criar</button>
      </form>
    </div>
  )
}