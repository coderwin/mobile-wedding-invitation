import { ImageResponse } from 'next/og';
import { wedding } from '@/data/wedding';
import { formatDotDate, weddingWeekday } from '@/lib/date';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = wedding.share.title;

const WEEKDAY_EN: Record<string, string> = {
  일: 'SUN',
  월: 'MON',
  화: 'TUE',
  수: 'WED',
  목: 'THU',
  금: 'FRI',
  토: 'SAT',
};

/**
 * 카카오톡·문자 공유 카드에 쓰이는 썸네일을 빌드 시점에 PNG로 만듭니다.
 * ImageResponse 기본 폰트는 한글을 지원하지 않아 영문만 사용합니다.
 */
export default function OpengraphImage() {
  // satori 는 자식이 둘 이상인 div 에 display 를 요구하므로 한 문장으로 합칩니다.
  const dateLine = `${formatDotDate().replace(/\s/g, '')}  ${WEEKDAY_EN[weddingWeekday]}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faf8f6',
          color: '#2b2825',
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 12, color: '#a08d80' }}>
          WEDDING INVITATION
        </div>
        <div style={{ marginTop: 48, fontSize: 76, letterSpacing: 6 }}>
          {wedding.share.coupleEn}
        </div>
        <div style={{ marginTop: 48, width: 80, height: 1, backgroundColor: '#ddd6cf' }} />
        <div style={{ marginTop: 44, fontSize: 30, letterSpacing: 8, color: '#6b645f' }}>
          {dateLine}
        </div>
      </div>
    ),
    size,
  );
}
