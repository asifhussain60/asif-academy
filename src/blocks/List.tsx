import clsx from 'clsx';
import type { DetailContent } from '@/engine/types';
import { renderInline } from '@/detail/renderInline';

const MARK = { check: '✓', arrow: '→', dot: '•' } as const;

export function List({
  items,
  ordered = false,
  marker = 'dot',
  details,
}: {
  items: string[];
  ordered?: boolean;
  marker?: 'check' | 'arrow' | 'dot';
  details?: Record<string, DetailContent>;
}) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5 text-[1.15rem] leading-relaxed text-fg-muted">
          <span className={clsx('select-none pt-1 font-mono text-base text-accent', ordered && 'tabular-nums')}>
            {ordered ? `${i + 1}.` : MARK[marker]}
          </span>
          <span>{renderInline(it, details)}</span>
        </li>
      ))}
    </Tag>
  );
}
