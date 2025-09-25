import { Josefin_Sans } from 'next/font/google';
import Header from './_components/Header';
import './_styles/globals.css';
import { ReservationProvider } from './_components/ReservationContext';

const josefin = Josefin_Sans({
  subsets: ['latin'],
});

export const metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'Welcome | The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 relative flex min-h-dvh flex-col antialiased`}
      >
        <Header />
        <div className='flex grow px-8 py-12'>
          <main className='mx-auto mt-24 max-w-7xl grow'>
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
