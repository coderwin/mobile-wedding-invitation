import { wedding } from '@/data/wedding';
import { WEEKDAYS, buildMonthGrid, formatFullDate } from '@/lib/date';
import { DdayCounter } from './DdayCounter';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export function Calendar() {
  const { year, month, day } = wedding.date;
  const weeks = buildMonthGrid();

  return (
    <Section eyebrow="The Date" className="bg-cream">
      <Reveal className="text-center">
        <p className="font-serif text-lg tracking-[0.1em] text-ink">{formatFullDate()}</p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mx-auto mt-10 max-w-[19rem]">
          <p className="mb-5 text-center text-xs tracking-[0.3em] text-muted">
            {year}. {String(month).padStart(2, '0')}
          </p>

          <div className="grid grid-cols-7 border-b border-line pb-3 text-center">
            {WEEKDAYS.map((label, index) => (
              <span
                key={label}
                className={`text-[0.7rem] tracking-wider ${
                  index === 0 ? 'text-accent' : 'text-muted'
                }`}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-7 gap-y-1.5 text-center">
            {weeks.flat().map((date, index) => {
              const isSunday = index % 7 === 0;
              const isWeddingDay = date === day;

              return (
                <span key={index} className="flex h-9 items-center justify-center">
                  {date && (
                    <span
                      className={
                        isWeddingDay
                          ? 'flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm text-white'
                          : `text-sm ${isSunday ? 'text-accent/70' : 'text-ink/70'}`
                      }
                      {...(isWeddingDay ? { 'aria-label': `${month}월 ${day}일 예식일` } : {})}
                    >
                      {date}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-10">
        <DdayCounter />
      </Reveal>
    </Section>
  );
}
