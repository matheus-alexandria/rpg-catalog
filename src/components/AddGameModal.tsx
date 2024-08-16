'use client';

import { IGameData } from '@/types/IGameData';
import { IThemeData } from '@/types/IThemeData';
import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function AddGameModal(props: AddGameModalProps) {
  const [themeTags, setThemeTags] = useState<IThemeData[]>([]);
  const [game, setGame] = useState('');
  const [description, setDescription] = useState('');
  const [dice, setDice] = useState('d20');
  const [chosenThemes, setChosenThemes] = useState<string[]>([]);
  const [gameplayFocus, setGameplayFocus] = useState('');
  const [highlighted, setHighlighted] = useState<number | null>(null);
  // const cropperRef = useRef<ReactCropperElement>(null);
  // const croppedUrl = useRef<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImagePath(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function setFocus(focus: string, buttonIndex: number) {
    setGameplayFocus(focus);
    setHighlighted(buttonIndex);
  }

  function addChosenTheme(theme: string) {
    if (chosenThemes.find((chosen) => chosen === theme)) return;
    const curThemes = chosenThemes;
    curThemes.push(theme);
    setChosenThemes([...curThemes]);
  }

  function removeChosenTheme(theme: string | null) {
    const curThemes = chosenThemes;
    const chosenIndex = curThemes.findIndex((chosen) => chosen === theme);
    if (chosenIndex < 0) return;
    curThemes.splice(chosenIndex, 1);
    setChosenThemes([...curThemes]);
  }

  async function sendFormData(event: FormEvent) {
    event.preventDefault();
    if (!validateForm()) return;
    const form = createForm();

    const res = await fetch('/api/v1/games/create', {
      method: 'POST',
      body: form
    });

    const data = await res.json();
    if (res.ok) {
      props.addCard(data);
      props.setOpenModal(false);
    }
  }

  function validateForm(): boolean {
    if (
      (game.length === 0 && game.length > 50) ||
      description.length === 0 ||
      (chosenThemes.length === 0 && chosenThemes.length > 10) ||
      (gameplayFocus.length === 0 && gameplayFocus.length > 50)
    ) {
      return false;
    }

    return true;
  }

  function createForm() {
    const form = new FormData();
    form.append('title', game);
    form.append('description', description);
    form.append('dice', dice);
    form.append('gameplay_focus', gameplayFocus);
    for (const theme of chosenThemes) {
      form.append('themes', theme);
    }
    return form;
  }

  useEffect(() => {
    fetch('/api/v1/themes')
      .then((res) => res.json())
      .then((data: { themes: IThemeData[] }) => {
        setThemeTags(data.themes);
      });
  }, []);

  return (
    <>
      <div className="fixed h-screen w-screen top-0 left-0 z-5 bg-black opacity-20" />
      <div className="fixed left-[31%] top-[14%] w-[44rem] bg-slate-900 px-8 py-6 rounded-lg z-10">
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
            <div className="bg-white rounded-sm min-h-9">
              {chosenThemes.map((chosenTheme) => (
                <button
                  key={`chosen-${chosenTheme}`}
                  type="button"
                  onClick={(e) => removeChosenTheme(e.currentTarget.textContent)}
                  className="bg-purple-600 rounded-md my-2 mx-1 py-1 px-3 hover:bg-red-500"
                >
                  {chosenTheme}
                </button>
              ))}
            </div>
            <select
              className="flex items-start gap-3 text-catalog-dark rounded-sm p-1"
              defaultValue={'Adicionar novo tema'}
              onChange={(e) => addChosenTheme(e.target.value)}
            >
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
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Arraste uma figura do RPG aqui</p> : null}
          </div>
          <button
            className="w-1/4 rounded-lg p-2 mt-4 bg-catalog-accent text-catalog-dark font-bold hover:bg-green-400 transition-colors"
            type="submit"
          >
            Criar
          </button>
        </form>
      </div>
    </>
  );
}

type AddGameModalProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  addCard: (card: IGameData) => void;
};
