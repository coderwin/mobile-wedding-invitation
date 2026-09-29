'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { wedding } from '@/data/wedding';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

const SWIPE_THRESHOLD_PX = 50;

export function Gallery() {
  const photos = wedding.gallery.photos;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const move = useCallback(
    (step: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + step + photos.length) % photos.length;
      });
    },
    [photos.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [openIndex, close, move]);

  return (
    <Section eyebrow="Gallery" title="우리의 순간들">
      <Reveal delay={100}>
        <ul className="grid grid-cols-3 gap-1.5">
          {photos.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="relative block aspect-square w-full overflow-hidden bg-cream"
                aria-label={`${index + 1}번째 사진 크게 보기`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 480px) 33vw, 160px"
                  className="object-cover transition-transform duration-500 active:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="사진 확대 보기"
          className="fixed inset-0 z-50 flex flex-col bg-black/92"
          onClick={close}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const delta = event.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > SWIPE_THRESHOLD_PX) move(delta < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          <div className="flex justify-end p-4">
            <button
              type="button"
              onClick={close}
              aria-label="닫기"
              className="flex h-11 w-11 items-center justify-center text-2xl leading-none text-white/80"
            >
              ×
            </button>
          </div>

          <div className="relative flex-1" onClick={(event) => event.stopPropagation()}>
            <Image
              key={photos[openIndex]}
              src={photos[openIndex]}
              alt={`${openIndex + 1}번째 사진`}
              fill
              sizes="100vw"
              className="animate-fade object-contain"
            />
          </div>

          <div
            className="flex items-center justify-between px-4 pb-8 pt-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="이전 사진"
              className="flex h-11 w-11 items-center justify-center text-xl text-white/70"
            >
              ‹
            </button>
            <span className="text-xs tracking-[0.2em] text-white/60">
              {openIndex + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="다음 사진"
              className="flex h-11 w-11 items-center justify-center text-xl text-white/70"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
