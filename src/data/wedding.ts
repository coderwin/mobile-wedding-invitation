import { accounts, contacts } from './contacts';
import type { Parent } from './types';

/**
 * 청첩장에 들어가는 내용은 이 파일에서 관리합니다.
 * 실제 정보로 바꿀 때 컴포넌트는 건드리지 않아도 됩니다.
 *
 * 단, 전화번호와 계좌번호는 공개 저장소에 올라가지 않도록
 * 환경 변수로 분리했습니다. (src/data/contacts.ts 참고)
 *
 * 현재 값은 모두 샘플입니다.
 */
export const wedding = {
  groom: {
    name: '이준서',
    firstName: '준서',
    phone: contacts.groom,
    /** 장남 / 차남 / 아들 등 */
    order: '장남',
    father: { name: '이영호', phone: contacts.groomFather } as Parent,
    mother: { name: '최미경', phone: contacts.groomMother } as Parent,
  },

  bride: {
    name: '박지은',
    firstName: '지은',
    phone: contacts.bride,
    order: '차녀',
    father: { name: '박성우', phone: contacts.brideFather } as Parent,
    mother: { name: '한소영', phone: contacts.brideMother } as Parent,
  },

  /** 예식 일시 (24시간제) */
  date: {
    year: 2027,
    month: 5,
    day: 15,
    hour: 12,
    minute: 0,
  },

  venue: {
    name: '그레이스 컨벤션',
    hall: '3층 그랜드홀',
    address: '서울 강남구 테헤란로 123',
    tel: contacts.venue,
    /** 카카오맵에서 확인한 좌표 */
    lat: 37.5006,
    lng: 127.0366,
  },

  greeting: {
    title: '소중한 분들을 초대합니다',
    body: [
      '서로의 계절을 오래 바라보다',
      '이제는 같은 방향을 보기로 했습니다.',
      '',
      '함께 걸어갈 첫걸음에',
      '따뜻한 마음으로 축복해 주시면',
      '더없이 감사하겠습니다.',
    ],
  },

  transport: [
    {
      title: '지하철',
      lines: ['2호선 역삼역 3번 출구에서 도보 5분', '9호선 신논현역 4번 출구에서 도보 10분'],
    },
    {
      title: '버스',
      lines: ['간선 146, 360, 740 — 역삼역 정류장 하차', '지선 4412, 4432 — 국기원입구 정류장 하차'],
    },
    {
      title: '주차',
      lines: ['건물 지하 1~4층 주차장 이용', '예식 하객 2시간 무료 (안내데스크에서 확인)'],
    },
  ],

  /** public/images 기준 경로. 실제 사진으로 교체하세요. */
  gallery: {
    cover: '/images/cover.svg',
    photos: [
      '/images/gallery-01.svg',
      '/images/gallery-02.svg',
      '/images/gallery-03.svg',
      '/images/gallery-04.svg',
      '/images/gallery-05.svg',
      '/images/gallery-06.svg',
      '/images/gallery-07.svg',
      '/images/gallery-08.svg',
      '/images/gallery-09.svg',
    ],
  },

  /** 마음 전하실 곳. 실제 값은 환경 변수에서 옵니다. */
  accounts,

  /** 카카오톡·문자로 공유될 때 보이는 내용 */
  share: {
    title: '이준서 ♥ 박지은 결혼합니다',
    description: '2027년 5월 15일 토요일 낮 12시 · 그레이스 컨벤션 3층 그랜드홀',
    /**
     * 공유 카드 썸네일에 들어가는 영문 표기.
     * 썸네일 이미지는 코드로 생성하는데, 한글 폰트를 따로 심어야 해서
     * 영문으로 둡니다. (src/app/opengraph-image.tsx)
     */
    coupleEn: 'JUNSEO & JIEUN',
  },

  /**
   * 배포 후 실제 주소로 바꿔주세요. 카카오톡 공유 썸네일에 필요합니다.
   * 예: https://junseo-jieun.vercel.app
   */
  siteUrl: 'https://example.com',

  /** true 로 두면 검색엔진에 노출되지 않습니다. (계좌·연락처 보호) */
  hideFromSearchEngines: true,
} as const;

export type Wedding = typeof wedding;
export type { Account, Accounts, Contacts, Parent, Person } from './types';
