import { wedding, type Parent } from '@/data/wedding';
import { parentName } from '@/lib/format';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export function Greeting() {
  const { greeting, groom, bride } = wedding;

  return (
    <Section eyebrow="Invitation" title={greeting.title}>
      <Reveal delay={100}>
        <div className="space-y-1 text-center text-[0.95rem] leading-[2.1] text-ink/80">
          {greeting.body.map((line, index) =>
            line === '' ? (
              <div key={index} className="h-4" />
            ) : (
              <p key={index}>{line}</p>
            ),
          )}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mx-auto mt-12 h-px w-10 bg-line" />
        <dl className="mt-10 space-y-3 text-center text-sm text-ink/80">
          <div>
            <dt className="sr-only">신랑측 혼주</dt>
            <dd>
              {formatParents(groom.father, groom.mother)}
              <span className="text-muted">의 {groom.order}</span>{' '}
              <span className="font-serif text-base text-ink">{groom.firstName}</span>
            </dd>
          </div>
          <div>
            <dt className="sr-only">신부측 혼주</dt>
            <dd>
              {formatParents(bride.father, bride.mother)}
              <span className="text-muted">의 {bride.order}</span>{' '}
              <span className="font-serif text-base text-ink">{bride.firstName}</span>
            </dd>
          </div>
        </dl>
      </Reveal>
    </Section>
  );
}

function formatParents(father: Parent, mother: Parent) {
  return `${parentName(father)} · ${parentName(mother)}`;
}
