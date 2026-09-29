import Image from 'next/image';
import { wedding } from '@/data/wedding';
import { formatDotDate, formatTime, weddingWeekday } from '@/lib/date';

export function Cover() {
  const { groom, bride, venue, gallery } = wedding;

  return (
    <section className="relative flex h-[100svh] min-h-[600px] flex-col justify-between overflow-hidden">
      <Image
        src={gallery.cover}
        alt=""
        fill
        priority
        sizes="(max-width: 480px) 100vw, 480px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white/85" />

      <div className="relative px-7 pt-16 text-center">
        <p className="text-[0.6rem] tracking-[0.45em] text-accent uppercase">
          Wedding Invitation
        </p>
        <h1 className="mt-6 font-serif text-[2rem] leading-tight text-ink">
          {groom.name}
          <span className="mx-3 align-middle text-base text-accent">·</span>
          {bride.name}
        </h1>
      </div>

      <div className="relative px-7 pb-20 text-center">
        <p className="font-serif text-lg tracking-[0.12em] text-ink">{formatDotDate()}</p>
        <p className="mt-2 text-xs tracking-[0.2em] text-muted uppercase">
          {weddingWeekday}요일 {formatTime()}
        </p>
        <div className="mx-auto my-6 h-8 w-px bg-line" />
        <p className="text-sm text-muted">
          {venue.name} {venue.hall}
        </p>
      </div>
    </section>
  );
}
