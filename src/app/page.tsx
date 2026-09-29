import { Accounts } from '@/components/Accounts';
import { Calendar } from '@/components/Calendar';
import { Contact } from '@/components/Contact';
import { Cover } from '@/components/Cover';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { Greeting } from '@/components/Greeting';
import { Location } from '@/components/Location';
import { ShareButtons } from '@/components/ShareButtons';

export default function Home() {
  return (
    // 데스크톱에서도 모바일 폭으로 보이도록 가운데 카드 형태로 고정합니다.
    <main className="mx-auto min-h-screen w-full max-w-[26rem] bg-paper shadow-[0_0_60px_rgba(0,0,0,0.05)]">
      <Cover />
      <Greeting />
      <Calendar />
      <Gallery />
      <Location />
      <Contact />
      <Accounts />
      <ShareButtons />
      <Footer />
    </main>
  );
}
