import clsx from 'clsx';
import type { DetailContent } from '@/engine/types';
import { renderInline } from '@/detail/renderInline';

export function Prose({
  md,
  size = 'base',
  details,
}: {
  md: string;
  size?: 'sm' | 'base' | 'lg';
  details?: Record<string, DetailContent>;
}) {
  return (
    <p
      className={clsx(
        'leading-relaxed text-fg-muted',
        size === 'sm' && 'text-base',
        size === 'base' && 'text-[1.15rem]',
        size === 'lg' && 'text-[1.1rem] leading-relaxed text-fg',
      )}
    >
      {renderInline(md, details)}
    </p>
  );
}
