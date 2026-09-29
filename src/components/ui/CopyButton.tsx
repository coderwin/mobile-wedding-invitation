'use client';

import { copyText } from '@/lib/clipboard';
import { useToast } from './Toast';

type Props = {
  value: string;
  /** 복사 성공 시 보여줄 안내 문구 */
  successMessage: string;
  children: React.ReactNode;
  className?: string;
};

export function CopyButton({ value, successMessage, children, className = '' }: Props) {
  const showToast = useToast();

  return (
    <button
      type="button"
      onClick={async () => {
        const ok = await copyText(value);
        showToast(ok ? successMessage : '복사에 실패했습니다. 길게 눌러 복사해 주세요.');
      }}
      className={className}
    >
      {children}
    </button>
  );
}
