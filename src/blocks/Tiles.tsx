import clsx from 'clsx';
import type { DetailContent, TileDef } from '@/engine/types';
import { renderInline } from '@/detail/renderInline';

/**
 * A responsive grid of definition / comparison cards. Used for "this vs that" contrasts
 * (e.g. Chat vs Agent). `tone: 'accent'` highlights the key option; `'muted'` de-emphasizes
 * the weaker contrast.
 */
export function Tiles({
  tiles,
  columns,
  details,
}: {
  tiles: TileDef[];
  columns?: number;
  details?: Record<string, DetailContent>;
}) {
  const cols = columns ?? Math.min(tiles.length, 3);
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {tiles.map((t, i) => {
        const accent = t.tone === 'accent';
        const muted = t.tone === 'muted';
        return (
          <div
            key={i}
            className={clsx(
              'rounded-xl border p-4 shadow-sm transition-colors',
              accent && 'border-accent/60 bg-accent-soft',
              muted && 'border-border bg-surface-2 opacity-80',
              !accent && !muted && 'border-border bg-surface-2',
            )}
          >
            <p className="flex items-center gap-2 font-display text-xl font-semibold text-fg">
              {t.icon && (
                <span
                  className={clsx(
                    'grid h-7 w-7 place-items-center rounded-md text-[15px]',
                    accent ? 'bg-accent text-[var(--color-accent-contrast)]' : 'bg-surface text-fg-muted',
                  )}
                  aria-hidden
                >
                  {t.icon}
                </span>
              )}
              <span className={accent ? 'text-accent' : undefined}>{renderInline(t.title, details)}</span>
            </p>
            <p className="cc-hl mt-2.5 text-[18px] leading-relaxed text-fg-muted">{renderInline(t.body, details)}</p>
          </div>
        );
      })}
    </div>
  );
}
