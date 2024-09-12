'use client';
import { IGameData } from '@/types/IGameData';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CardExpanded({ params }: { params: { gameId: string } }) {
  const imageMultiplier = 200;
  const [gameData, setGameData] = useState<IGameData | null>(null);

  async function getGameData(gameId: string) {
    const fetchData = await fetch(`/api/v1/games/${gameId}`);
    const gameData = (await fetchData.json()) as { game: IGameData };
    setGameData(gameData.game);
  }

  useEffect(() => {
    getGameData(params.gameId);
  }, []);

  return (
    gameData && (
      <div className="h-screen w-screen m-2 flex bg-zinc-800 p-8">
        <div className="mr-8">
          <Image
            src={gameData.cover_path}
            alt={'Anything'}
            width={3 * imageMultiplier}
            height={4 * imageMultiplier}
          />
        </div>
        <div className="flex flex-col rounded-xl px-3">
          <b className="text-5xl font-serif">Dungeons & Dragons</b>

          <hr className="mt-2" />
          <p className="mt-8 mb-12">DESCRIÇÃO RÁPIDO DO JOGO</p>

          <b>Como começar a jogar?</b>
          <p className="mb-8">EXPLICAÇÃO SIMPLES DAS REGRAS</p>

          <strong>Perguntas & Respostas</strong>
          <p className="mt-1 mb-4">
            <b>Preciso de dados para jogar?</b> Você precisa de dados para jogar, mas não precisa
            ter eles fisicamente. Apesar de ser divertido jogar dados, você pode usar as diversas
            ferramentas online para rodar todos os dados necessários (
            <a className="text-red-400" href="https://rolladie.net/roll-a-d20-die">
              como esta
            </a>
            ), o seu mestre vai avisar sempre que precisar rolar algum tipo de dado.
          </p>
          <p className="mb-4">
            <b>Posso jogar com até quantas pessoas?</b> O ideal é um grupo entre 4 a 6 pessoas,
            contando com o mestre, mas é possível jogar com bem mais pessoas!
          </p>
          <ul>
            <li>
              <b className="mr-1">Sistema:</b> {gameData.dice}
            </li>
            <li>
              <b className="mr-1">O jogo foca em:</b> {gameData.gameplay_focus}
            </li>
          </ul>
        </div>
      </div>
    )
  );
}
