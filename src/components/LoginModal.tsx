'use client';

import { IUserData } from '@/types/IUserData';
import { FormEvent, useState } from 'react';

interface LoginModalProps {
  setUserData: (user: IUserData) => void;
  closeModal: () => void;
}

export default function LoginModal(props: LoginModalProps) {
  const [login, setLogin] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  function handleCreateUserForm(e: FormEvent) {
    e.preventDefault();
    fetch('/api/v1/login', {
      method: 'POST',
      body: JSON.stringify({
        login,
        password,
        role: 'CREATOR'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('não foi possível logar com o usuário');
      })
      .then((data: { user: IUserData }) => {
        localStorage.setItem('loggedUserData', JSON.stringify(data));
        props.setUserData(data.user);
        props.closeModal();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
      <div className="fixed h-screen w-screen top-0 left-0 z-5 bg-black opacity-60" />
      <div className="fixed left-[30%] top-[35%] w-[44rem] bg-slate-900 px-8 py-6 rounded-lg z-10">
        <div className="flex justify-between">
          <p className="font-bold text-xl">Crie seu usuário!</p>
          <button className="text-lg font-bold" type="button" onClick={() => props.closeModal()}>
            X
          </button>
        </div>
        <form onSubmit={(e) => handleCreateUserForm(e)} className="flex flex-col mt-2 gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-xl">Login:</p>
            <input
              type="text"
              className="p-2 rounded-sm text-catalog-dark placeholder:text-catalog-dark placeholder:text-opacity-70"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl">Senha:</p>
            <input
              type="password"
              className="p-2 rounded-sm text-catalog-dark placeholder:text-catalog-dark placeholder:text-opacity-70"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-1/4 rounded-lg p-2 mt-4 bg-catalog-accent text-catalog-dark font-bold hover:bg-green-400 transition-colors"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
