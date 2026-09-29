/**
 * 청첩장에 들어가는 모든 내용은 이 파일에서만 관리합니다.
 * 실제 정보로 바꿀 때 다른 파일은 건드리지 않아도 됩니다.
 *
 * 현재 값은 모두 샘플입니다.
 */

export type Person = {
  name: string;
  phone: string;
};

export type Parent = Person & {
  /** 고인인 경우 이름 앞에 故 를 붙입니다. */
  deceased?: boolean;
};

export type Account = {
  bank: string;
  number: string;
  holder: string;
  /** 관계 표기 (예: 신랑, 아버지) */
  label: string;
  /** 카카오페이 송금 링크 (없으면 생략) */
  kakaopayUrl?: string;
};

export const wedding = {
  groom: {
    name: '이준서',
    firstName: '준서',
    phone: '010-1234-5678',
    /** 장남 / 차남 / 아들 등 */
    order: '장남',
    father: { name: '이영호', phone: '010-1234-1111' } as Parent,
    mother: { name: '최미경', phone: '010-1234-2222' } as Parent,
  },

  bride: {
    name: '박지은',
    firstName: '지은',
    phone: '010-8765-4321',
    order: '차녀',
    father: { name: '박성우', phone: '010-8765-1111' } as Parent,
    mother: { name: '한소영', phone: '010-8765-2222' } as Parent,
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
    tel: '02-1234-5678',
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

  accounts: {
    groom: [
      { label: '신랑', bank: '국민은행', number: '123456-01-234567', holder: '이준서' },
      { label: '아버지', bank: '신한은행', number: '110-234-567890', holder: '이영호' },
    ] as Account[],
    bride: [
      { label: '신부', bank: '카카오뱅크', number: '3333-01-2345678', holder: '박지은' },
      { label: '어머니', bank: '우리은행', number: '1002-345-678901', holder: '한소영' },
    ] as Account[],
  },

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
