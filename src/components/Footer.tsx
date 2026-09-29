import { wedding } from '@/data/wedding';
import { formatDotDate } from '@/lib/date';

export function Footer() {
  const { groom, bride } = wedding;

  return (
    <footer className="bg-cream px-7 pb-14 pt-4 text-center">
      <p className="font-serif text-sm tracking-[0.1em] text-ink/70">
        {groom.name} · {bride.name}
      </p>
      <p className="mt-2 text-[0.7rem] tracking-[0.25em] text-muted">{formatDotDate()}</p>
    </footer>
  );
}
