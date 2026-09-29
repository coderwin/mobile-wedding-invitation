'use client';

import { useEffect, useRef, useState } from 'react';
import { wedding } from '@/data/wedding';

type KakaoLatLng = object;

type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => object;
  Marker: new (options: { position: KakaoLatLng; map: object }) => object;
};

declare global {
  interface Window {
    kakao?: { maps: KakaoMaps };
  }
}

const SDK_ID = 'kakao-maps-sdk';

export function KakaoMap() {
  const appKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!appKey) return;

    const render = () => {
      const maps = window.kakao?.maps;
      const container = containerRef.current;
      if (!maps || !container) return;

      maps.load(() => {
        const center = new maps.LatLng(wedding.venue.lat, wedding.venue.lng);
        const map = new maps.Map(container, { center, level: 4 });
        new maps.Marker({ position: center, map });
      });
    };

    const existing = document.getElementById(SDK_ID) as HTMLScriptElement | null;
    if (existing) {
      if (window.kakao?.maps) render();
      else existing.addEventListener('load', render);
      return;
    }

    const script = document.createElement('script');
    script.id = SDK_ID;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.onload = render;
    script.onerror = () => setFailed(true);
    document.head.appendChild(script);
  }, [appKey]);

  if (!appKey || failed) {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 bg-cream text-center">
        <p className="text-sm text-ink/70">{wedding.venue.name}</p>
        <p className="px-8 text-xs leading-relaxed text-muted">
          {failed
            ? '지도를 불러오지 못했습니다. 아래 버튼으로 길찾기를 이용해 주세요.'
            : '카카오 지도 키를 등록하면 지도가 표시됩니다.'}
        </p>
      </div>
    );
  }

  return <div ref={containerRef} className="aspect-[4/3] w-full bg-cream" />;
}
