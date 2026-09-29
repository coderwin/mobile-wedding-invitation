'use client';

import { useSyncExternalStore } from 'react';
import { wedding } from '@/data/wedding';
import { daysUntilWedding } from '@/lib/date';

/** 남은 일수는 바뀌지 않으므로 구독할 대상이 없습니다. */
const noopSubscribe = () => () => {};

/**
 * 페이지가 정적으로 빌드되므로 남은 일수를 서버에서 계산하면 빌드 시점에 고정됩니다.
 * 항상 최신 값을 보여주기 위해 브라우저에서 계산합니다.
 */
export function DdayCounter() {
  const days = useSyncExternalStore<number | null>(
    noopSubscribe,
    daysUntilWedding,
    () => null,
  );

  const { groom, bride } = wedding;
  const names = `${groom.firstName} · ${bride.firstName}`;

  return (
    <p className="min-h-6 text-center text-sm text-ink/70">
      {days === null ? null : days > 0 ? (
        <>
          <span className="font-serif">{names}</span>의 결혼식까지{' '}
          <span className="font-serif text-base text-accent">{days}</span>일 남았습니다.
        </>
      ) : days === 0 ? (
        <>
          <span className="font-serif">{names}</span>의 결혼식이 <strong className="font-serif text-accent">오늘</strong>입니다.
        </>
      ) : (
        <>
          <span className="font-serif">{names}</span>의 결혼식이{' '}
          <span className="font-serif text-base text-accent">{Math.abs(days)}</span>일 지났습니다.
        </>
      )}
    </p>
  );
}
