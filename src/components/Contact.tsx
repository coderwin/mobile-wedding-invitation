import { wedding } from '@/data/wedding';
import { parentName, smsHref, telHref } from '@/lib/format';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

type Row = { role: string; name: string; phone: string };

export function Contact() {
  const { groom, bride } = wedding;

  const groups: { title: string; rows: Row[] }[] = [
    {
      title: '신랑측',
      rows: [
        { role: '신랑', name: groom.name, phone: groom.phone },
        { role: '아버지', name: parentName(groom.father), phone: groom.father.phone },
        { role: '어머니', name: parentName(groom.mother), phone: groom.mother.phone },
      ],
    },
    {
      title: '신부측',
      rows: [
        { role: '신부', name: bride.name, phone: bride.phone },
        { role: '아버지', name: parentName(bride.father), phone: bride.father.phone },
        { role: '어머니', name: parentName(bride.mother), phone: bride.mother.phone },
      ],
    },
  ];

  return (
    <Section eyebrow="Contact" title="연락하기" className="bg-cream">
      <Reveal delay={100} className="space-y-9">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs tracking-[0.2em] text-accent">{group.title}</h3>
            <ul className="mt-3">
              {group.rows.map((row) => (
                <li
                  key={row.phone}
                  className="flex items-center justify-between border-b border-line py-3.5"
                >
                  <span className="text-sm text-ink/80">
                    <span className="mr-2.5 text-xs text-muted">{row.role}</span>
                    {row.name}
                  </span>
                  <span className="flex gap-2">
                    <a
                      href={telHref(row.phone)}
                      aria-label={`${row.name}에게 전화하기`}
                      className="flex h-11 w-11 items-center justify-center border border-line bg-white text-[0.7rem] text-muted"
                    >
                      전화
                    </a>
                    <a
                      href={smsHref(row.phone)}
                      aria-label={`${row.name}에게 문자 보내기`}
                      className="flex h-11 w-11 items-center justify-center border border-line bg-white text-[0.7rem] text-muted"
                    >
                      문자
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
