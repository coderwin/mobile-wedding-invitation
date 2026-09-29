import type { Metadata, Viewport } from 'next';
import { wedding } from '@/data/wedding';
import { ToastProvider } from '@/components/ui/Toast';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(wedding.siteUrl),
  title: wedding.share.title,
  description: wedding.share.description,
  openGraph: {
    type: 'website',
    title: wedding.share.title,
    description: wedding.share.description,
    siteName: wedding.share.title,
    locale: 'ko_KR',
  },
  // 계좌번호·연락처가 검색에 노출되지 않도록 기본값은 차단입니다.
  robots: wedding.hideFromSearchEngines ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // 어르신이 확대해서 보실 수 있어야 하므로 확대를 막지 않습니다.
  maximumScale: 5,
  themeColor: '#faf8f6',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko">
      <head>
        {/*
          한글 웹폰트는 용량이 커서 next/font 로 자체 호스팅하면 수 MB를 내려받습니다.
          Google Fonts CSS 는 unicode-range 로 잘게 쪼개 필요한 글자만 받아오므로
          모바일 데이터에서 훨씬 빠릅니다.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router 루트 레이아웃이므로 모든 페이지에 적용됩니다. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Noto+Sans+KR:wght@300;400;500&display=swap"
        />
      </head>
      <body className="antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
