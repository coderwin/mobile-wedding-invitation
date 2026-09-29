'use client';

import { useEffect, useState } from 'react';
import { wedding } from '@/data/wedding';
import { copyText } from '@/lib/clipboard';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { useToast } from './ui/Toast';

type KakaoSdk = {
  isInitialized: () => boolean;
  init: (key: string) => void;
  Share: {
    sendDefault: (settings: Record<string, unknown>) => void;
  };
};

declare global {
  interface Window {
    Kakao?: KakaoSdk;
  }
}

const SDK_ID = 'kakao-js-sdk';
const SDK_SRC = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js';

export function ShareButtons() {
  const appKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  const [kakaoReady, setKakaoReady] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    if (!appKey) return;

    const init = () => {
      const sdk = window.Kakao;
      if (!sdk) return;
      if (!sdk.isInitialized()) sdk.init(appKey);
      setKakaoReady(true);
    };

    const existing = document.getElementById(SDK_ID);
    if (existing) {
      if (window.Kakao) init();
      else existing.addEventListener('load', init);
      return;
    }

    const script = document.createElement('script');
    script.id = SDK_ID;
    script.async = true;
    script.src = SDK_SRC;
    script.onload = init;
    document.head.appendChild(script);
  }, [appKey]);

  const shareUrl = () =>
    typeof window === 'undefined' ? wedding.siteUrl : window.location.href;

  const handleKakaoShare = async () => {
    const url = shareUrl();

    if (kakaoReady && window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: wedding.share.title,
          description: wedding.share.description,
          imageUrl: `${wedding.siteUrl}/opengraph-image`,
          link: { mobileWebUrl: url, webUrl: url },
        },
        buttons: [
          {
            title: '청첩장 보기',
            link: { mobileWebUrl: url, webUrl: url },
          },
        ],
      });
      return;
    }

    // 카카오 키가 없거나 SDK 로드에 실패한 경우
    if (navigator.share) {
      try {
        await navigator.share({ title: wedding.share.title, text: wedding.share.description, url });
        return;
      } catch {
        return; // 사용자가 공유를 취소한 경우
      }
    }

    const ok = await copyText(url);
    showToast(ok ? '링크를 복사했습니다.' : '링크 복사에 실패했습니다.');
  };

  return (
    <Section eyebrow="Share" className="bg-cream pt-14">
      <Reveal>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleKakaoShare}
            className="flex h-12 items-center justify-center border border-line bg-white text-sm text-ink/75 transition-colors active:bg-cream"
          >
            카카오톡 공유
          </button>
          <button
            type="button"
            onClick={async () => {
              const ok = await copyText(shareUrl());
              showToast(ok ? '링크를 복사했습니다.' : '링크 복사에 실패했습니다.');
            }}
            className="flex h-12 items-center justify-center border border-line bg-white text-sm text-ink/75 transition-colors active:bg-cream"
          >
            링크 복사
          </button>
        </div>
      </Reveal>
    </Section>
  );
}
