import { wedding } from '@/data/wedding';
import { telHref } from '@/lib/format';
import { KakaoMap } from './KakaoMap';
import { CopyButton } from './ui/CopyButton';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export function Location() {
  const { venue, transport } = wedding;
  const query = encodeURIComponent(venue.name);

  const mapApps = [
    {
      label: '카카오맵',
      href: `https://map.kakao.com/link/to/${query},${venue.lat},${venue.lng}`,
    },
    {
      label: '네이버지도',
      href: `https://map.naver.com/p/search/${query}`,
    },
    {
      // 티맵은 앱이 설치되어 있어야 열립니다.
      label: '티맵',
      href: `tmap://route?goalname=${query}&goalx=${venue.lng}&goaly=${venue.lat}`,
    },
  ];

  return (
    <Section eyebrow="Location" title="오시는 길">
      <Reveal delay={100} className="text-center">
        <p className="font-serif text-lg text-ink">{venue.name}</p>
        <p className="mt-1.5 text-sm text-muted">{venue.hall}</p>
      </Reveal>

      <Reveal delay={150} className="mt-8">
        <div className="overflow-hidden border border-line">
          <KakaoMap />
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-5">
        <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-sm text-ink/80">{venue.address}</p>
          <CopyButton
            value={venue.address}
            successMessage="주소를 복사했습니다."
            className="shrink-0 border border-line px-3 py-2 text-xs text-muted transition-colors active:bg-cream"
          >
            주소 복사
          </CopyButton>
        </div>

        <a
          href={telHref(venue.tel)}
          className="flex items-center justify-between border-b border-line py-4 text-sm text-ink/80"
        >
          <span>{venue.tel}</span>
          <span className="text-xs text-muted">전화하기</span>
        </a>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {mapApps.map((app) => (
            <a
              key={app.label}
              href={app.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 items-center justify-center border border-line text-xs text-ink/75 transition-colors active:bg-cream"
            >
              {app.label}
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={250} className="mt-12 space-y-7">
        {transport.map((item) => (
          <div key={item.title}>
            <h3 className="text-xs tracking-[0.2em] text-accent">{item.title}</h3>
            <ul className="mt-3 space-y-1.5">
              {item.lines.map((line) => (
                <li key={line} className="text-[0.85rem] leading-relaxed text-ink/70">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
