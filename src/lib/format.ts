import type { Parent } from '@/data/wedding';

/** 고인은 이름 앞에 故 를 붙입니다. */
export function parentName(parent: Parent) {
  return parent.deceased ? `故 ${parent.name}` : parent.name;
}

/** 전화 걸기 / 문자 보내기 링크용. 하이픈과 공백을 제거합니다. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

export function smsHref(phone: string) {
  return `sms:${phone.replace(/[^0-9+]/g, '')}`;
}
