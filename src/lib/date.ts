import { wedding } from '@/data/wedding';

const DAY_MS = 24 * 60 * 60 * 1000;
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

/**
 * 서버(UTC)와 브라우저(로컬 시간대)가 같은 값을 계산하도록
 * 모든 날짜 연산을 한국 시간 기준 자정 타임스탬프로 정규화합니다.
 * 이렇게 하지 않으면 D-Day 숫자가 서버와 클라이언트에서 달라져
 * hydration 경고가 발생합니다.
 */
function kstMidnight(year: number, month: number, day: number) {
  return Date.UTC(year, month - 1, day);
}

function todayKstMidnight() {
  const kstNow = new Date(Date.now() + KST_OFFSET_MS);
  return Date.UTC(kstNow.getUTCFullYear(), kstNow.getUTCMonth(), kstNow.getUTCDate());
}

const { year, month, day, hour, minute } = wedding.date;

export const weddingWeekdayIndex = new Date(kstMidnight(year, month, day)).getUTCDay();
export const weddingWeekday = WEEKDAYS[weddingWeekdayIndex];

/** 예식일까지 남은 일수. 당일은 0, 지난 뒤에는 음수. */
export function daysUntilWedding() {
  return Math.round((kstMidnight(year, month, day) - todayKstMidnight()) / DAY_MS);
}

/** "낮 12시", "오후 1시 30분" 형태 */
export function formatTime() {
  const period = hour < 12 ? '오전' : hour === 12 ? '낮' : '오후';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${period} ${displayHour}시${minute ? ` ${minute}분` : ''}`;
}

/** "2027년 5월 15일 토요일 낮 12시" */
export function formatFullDate() {
  return `${year}년 ${month}월 ${day}일 ${weddingWeekday}요일 ${formatTime()}`;
}

/** "2027. 05. 15" */
export function formatDotDate() {
  return `${year}. ${String(month).padStart(2, '0')}. ${String(day).padStart(2, '0')}`;
}

/**
 * 예식이 있는 달의 달력 배열. 첫 주 앞의 빈 칸은 null 로 채웁니다.
 */
export function buildMonthGrid() {
  const firstWeekday = new Date(kstMidnight(year, month, 1)).getUTCDay();
  const lastDate = new Date(Date.UTC(year, month, 0)).getUTCDate();

  const cells: (number | null)[] = Array(firstWeekday).fill(null);
  for (let d = 1; d <= lastDate; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
