import { Reveal } from './Reveal';

type Props = {
  /** 섹션 위에 작게 올라가는 영문 라벨 */
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, children, className = '' }: Props) {
  return (
    <section className={`px-7 py-16 ${className}`}>
      {(eyebrow || title) && (
        <Reveal className="mb-10 text-center">
          {eyebrow && (
            <p className="text-[0.65rem] tracking-[0.35em] text-accent uppercase">{eyebrow}</p>
          )}
          {title && <h2 className="mt-3 font-serif text-xl text-ink">{title}</h2>}
        </Reveal>
      )}
      {children}
    </section>
  );
}
