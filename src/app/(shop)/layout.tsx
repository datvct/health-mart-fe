import Header from '@/components/Header';
// import { Geist, Geist_Mono } from 'next/font/google';
import Footer from '../../components/Footer';
import '../../styles/global.css';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <>
      <Header />
      <main className="bg-[#edf0f3] mx-auto px-2 sm:px-10 md:px-10">{children}</main>
      <Footer />
    </>
    // </body>
  );
}
