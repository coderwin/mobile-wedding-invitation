import type { Accounts, Contacts } from './types';

/**
 * 전화번호와 계좌번호는 공개 저장소에 커밋하지 않습니다.
 *
 * 실제 값은 환경 변수로 넣습니다.
 *   - 로컬:  .env.local
 *   - 배포:  Vercel > Settings > Environment Variables
 *
 * 값이 없으면 아래 샘플이 쓰이므로, 키를 넣지 않아도 사이트는 정상 동작합니다.
 * 형식은 .env.example 을 참고하세요.
 */

const SAMPLE_CONTACTS: Contacts = {
  groom: '010-1234-5678',
  groomFather: '010-1234-1111',
  groomMother: '010-1234-2222',
  bride: '010-8765-4321',
  brideFather: '010-8765-1111',
  brideMother: '010-8765-2222',
  venue: '02-1234-5678',
};

const SAMPLE_ACCOUNTS: Accounts = {
  groom: [
    { label: '신랑', bank: '국민은행', number: '123456-01-234567', holder: '이준서' },
    { label: '아버지', bank: '신한은행', number: '110-234-567890', holder: '이영호' },
  ],
  bride: [
    { label: '신부', bank: '카카오뱅크', number: '3333-01-2345678', holder: '박지은' },
    { label: '어머니', bank: '우리은행', number: '1002-345-678901', holder: '한소영' },
  ],
};

function parseJsonEnv<T>(raw: string | undefined, fallback: T, name: string): T {
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    console.warn(`${name} 의 JSON 형식이 잘못되어 샘플 값을 사용합니다.`);
    return fallback;
  }
}

export const contacts = parseJsonEnv(
  process.env.NEXT_PUBLIC_WEDDING_CONTACTS,
  SAMPLE_CONTACTS,
  'NEXT_PUBLIC_WEDDING_CONTACTS',
);

export const accounts = parseJsonEnv(
  process.env.NEXT_PUBLIC_WEDDING_ACCOUNTS,
  SAMPLE_ACCOUNTS,
  'NEXT_PUBLIC_WEDDING_ACCOUNTS',
);
