import Header from '@/components/Header';
import Footer from '../../components/Footer';
import '../../styles/global.css';
import Image from 'next/image';
import { FOOTER } from '../../constants/images';
import { ChatBox } from '../../components/ChatBox';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="bg-[#edf0f3] mx-auto px-2 sm:px-10 md:px-10">
        {children}
        <ChatBox></ChatBox>
      </main>
      <section>
        <Image
          src={FOOTER.Footer_PC}
          alt="chân trang"
          className="hidden md:block lg:block xl:block 2xl:block"
        />
        <Image
          src={FOOTER.Footer_MB}
          alt="chân trang"
          className="block md:hidden lg:hidden xl:hidden 2xl:hidden"
        />
      </section>
      <Footer />
    </>
  );
}
