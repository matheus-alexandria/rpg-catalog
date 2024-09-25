'use client';
import Header from '@/components/Header';
import { IGameData } from '@/types/IGameData';
import { IUserData } from '@/types/IUserData';
import { Pencil } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

export default function CardExpanded({ params }: { params: { gameId: string } }) {
  const DEFAULT_EXPLANATION = '* Ainda não temos uma explicação breve das regras para esse RPG! *';
  const [gameData, setGameData] = useState<IGameData | null>(null);
  const [user, setUser] = useState<IUserData | null>(null);
  const [isUpdateModeOn, setIsUpdateModeOn] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState<string | null>(null);

  async function getGameData(gameId: string) {
    const fetchData = await fetch(`/api/v1/games/${gameId}`);
    const gameData = (await fetchData.json()) as { game: IGameData };
    setGameData(gameData.game);
  }

  function updateGameData() {
    setIsUpdateModeOn(false);
    if (!validateForm()) return;
    fetch('/api/v1/games', {
      method: 'PUT',
      body: JSON.stringify({
        description: updatedDescription,
        game_id: params.gameId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data: IGameData) => setGameData(data));
  }

  function validateForm(): boolean {
    if (updatedDescription?.length === 0) {
      return false;
    }

    return true;
  }

  useEffect(() => {
    const stringifiedUserData = localStorage.getItem('loggedUserData');

    if (stringifiedUserData) {
      const userData = JSON.parse(stringifiedUserData);
      setUser(userData.user);
    }
    getGameData(params.gameId);
  }, []);

  return (
    gameData && (
      <div className="h-screen w-screen text-lg">
        <Header logoSize={60} user={user} setUserData={setUser} />
        <div className="flex px-8">
          <div className="mr-8">
            <img src={gameData.cover_path} alt={`${gameData.title} book cover`} />
          </div>
          <div className="flex flex-col rounded-xl px-3">
            <div className="flex justify-between items-center">
              <b className="text-5xl font-serif">{gameData.title}</b>
              {user?.role === 'ADMIN' && (
                <button
                  type="button"
                  className="mr-2"
                  onClick={() => setIsUpdateModeOn((cur) => !cur)}
                >
                  <Pencil size={30} className="hover:text-warmGray-400 transition-colors" />
                </button>
              )}
            </div>

            <hr className="mt-2" />
            {isUpdateModeOn ? (
              <textarea
                className="mt-8 mb-12 bg-transparent h-32"
                defaultValue={gameData.description}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            ) : (
              <p className="mt-8 mb-12 h-auto">{gameData.description}</p>
            )}

            <b>Como começar a jogar?</b>
            <p className="mb-8">{gameData?.explanation || DEFAULT_EXPLANATION}</p>

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
                <b className="mr-1">Dado principal:</b> {gameData.dice}
              </li>
              <li>
                <b className="mr-1">O sistema costuma focar em:</b> {gameData.gameplay_focus}
              </li>
            </ul>
            {isUpdateModeOn && (
              <button
                type="button"
                onClick={() => updateGameData()}
                className="w-1/6 p-2 mt-5 font-bold bg-purple-500 rounded-md hover:bg-purple-600 transition-colors"
              >
                Salvar modificações
              </button>
            )}
            <footer className="h-20" />
          </div>
        </div>
      </div>
    )
  );
}
