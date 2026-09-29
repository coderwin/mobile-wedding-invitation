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

export type Contacts = {
  groom: string;
  groomFather: string;
  groomMother: string;
  bride: string;
  brideFather: string;
  brideMother: string;
  /** 예식장 대표 번호 */
  venue: string;
};

export type Accounts = {
  groom: Account[];
  bride: Account[];
};
