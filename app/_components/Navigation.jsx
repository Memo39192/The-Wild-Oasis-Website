import Image from 'next/image';
import Link from 'next/link';
import { auth } from '../_lib/auth';

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className='z-10 text-xl'>
      <ul className='flex items-center gap-16'>
        <li>
          <Link
            href='/cabins'
            className='hover:text-accent-400 transition-colors'
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href='/about'
            className='hover:text-accent-400 transition-colors'
          >
            About
          </Link>
        </li>
        <li>
          {session?.user ? (
            <Link
              href='/account'
              className='hover:text-accent-400 flex items-center gap-4 transition-colors'
            >
              <img
                className='h-8 w-8 rounded-full'
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy='no-referrer'
              />

              <span className='mt-1'>{session.user.name}</span>
            </Link>
          ) : (
            <Link
              href='/account'
              className='hover:text-accent-400 transition-colors'
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
