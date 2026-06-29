import clsx from 'clsx';
import type { DetailContent } from '@/engine/types';
import { renderInline } from '@/detail/renderInline';

type Tone = 'tip' | 'warn' | 'key' | 'analogy';

const TONE: Record<Tone, { label: string; icon: string; cls: string }> = {
  tip: { label: 'Tip', icon: '◆', cls: 'border-l-accent' },
  warn: { label: 'Watch out', icon: '▲', cls: 'border-l-[var(--color-accent-2)]' },
  key: { label: 'Key idea', icon: '★', cls: 'border-l-accent' },
  analogy: { label: 'Like this', icon: '☻', cls: 'border-l-[var(--color-accent-2)]' },
};

export function Callout({
  tone,
  md,
  label,
  details,
}: {
  tone: Tone;
  md: string;
  label?: string;
  details?: Record<string, DetailContent>;
}) {
  const t = TONE[tone];
  const isAnalogy = tone === 'analogy';
  return (
    <div className={clsx('rounded-md border border-border border-l-[3px] bg-surface-2 px-4 py-3', t.cls)}>
      <p
        className={clsx(
          'mb-1.5 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide',
          isAnalogy ? 'text-[var(--color-accent-2)]' : 'text-accent',
        )}
      >
        <span aria-hidden>{t.icon}</span>
        {label ?? t.label}
      </p>
      <p
        className={clsx(
          'text-fg',
          isAnalogy ? 'font-friendly text-[1.45rem] leading-snug' : 'text-[1.05rem] leading-relaxed',
        )}
      >
        {renderInline(md, details)}
      </p>
    </div>
  );
}
