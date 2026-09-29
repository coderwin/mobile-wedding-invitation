import { wedding, type Account } from '@/data/wedding';
import { CopyButton } from './ui/CopyButton';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export function Accounts() {
  const groups = [
    { title: '신랑측 계좌번호', accounts: wedding.accounts.groom },
    { title: '신부측 계좌번호', accounts: wedding.accounts.bride },
  ];

  return (
    <Section eyebrow="Gift" title="마음 전하실 곳">
      <Reveal delay={100}>
        <p className="text-center text-[0.85rem] leading-relaxed text-muted">
          참석이 어려우신 분들을 위해 계좌번호를 남깁니다.
          <br />
          축하의 마음만으로도 충분히 감사합니다.
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-8 space-y-2.5">
        {groups.map((group) => (
          <details key={group.title} className="group border border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm text-ink/80">
              {group.title}
              <span className="text-xs text-muted transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <ul className="border-t border-line bg-cream/60 px-5 py-2">
              {group.accounts.map((account) => (
                <AccountRow key={`${account.bank}-${account.number}`} account={account} />
              ))}
            </ul>
          </details>
        ))}
      </Reveal>
    </Section>
  );
}

function AccountRow({ account }: { account: Account }) {
  const copyValue = `${account.bank} ${account.number} ${account.holder}`;

  return (
    <li className="flex items-center justify-between gap-3 border-b border-line py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="text-xs text-muted">
          {account.label} · {account.holder}
        </p>
        <p className="mt-1 truncate text-sm text-ink/85">
          {account.bank} {account.number}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        {account.kakaopayUrl && (
          <a
            href={account.kakaopayUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 items-center border border-line bg-white px-3 text-xs text-muted"
          >
            송금
          </a>
        )}
        <CopyButton
          value={copyValue}
          successMessage="계좌번호를 복사했습니다."
          className="flex h-10 items-center border border-line bg-white px-3 text-xs text-muted"
        >
          복사
        </CopyButton>
      </div>
    </li>
  );
}
