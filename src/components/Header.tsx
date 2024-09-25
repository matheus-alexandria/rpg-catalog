'use client';
import { IUserData } from '@/types/IUserData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import logo from '../../public/logoBlack.png';
import LoginModal from './LoginModal';

interface HeaderParams {
  user: IUserData | null;
  logoSize?: number;
  setUserData?: (user: IUserData | null) => void;
}

export default function Header({
  user,
  logoSize = 120,
  setUserData = (user: IUserData | null) => {
    return;
  }
}: HeaderParams) {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  function resetUser() {
    setUserData(null);
    localStorage.removeItem('loggedUserData');
  }

  return (
    <>
      {isLoginModalOpen && (
        <LoginModal closeModal={() => setIsLoginModalOpen(false)} setUserData={setUserData} />
      )}
      <header className="p-7 flex justify-between text-xl font-bold">
        <button type="button" onClick={() => router.push('/')}>
          <Image
            src={logo}
            width={logoSize}
            height={logoSize}
            alt='Shield and sword with "Catálogo RPGs" written under it'
          />
        </button>

        {user ? (
          <div className="flex items-center justify-center">
            <button type="button" className="text-white font-bold" onClick={() => resetUser()}>
              {`Olá, ${user.login}!`}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="text-white border-2 py-2 px-4 rounded-full hover:bg-green-100 hover:bg-opacity-40 transition-colors"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </button>
          </div>
        )}
      </header>
    </>
  );
}
