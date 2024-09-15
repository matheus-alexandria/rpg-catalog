import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../public/logoBlack.png';

export default function Header({ logoSize = 120 }) {
  const router = useRouter();
  return (
    <header className="p-7">
      <button type="button" onClick={() => router.push('/')}>
        <Image
          src={logo}
          width={logoSize}
          height={logoSize}
          alt='Shield and sword with "Catálogo RPGs" written under it'
        />
      </button>
    </header>
  );
}
