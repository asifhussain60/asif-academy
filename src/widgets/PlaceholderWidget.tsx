import clsx from 'clsx';
import type { WidgetProps } from './types';

/**
 * Styled stand-in for a not-yet-authored interactive widget. Renders the real
 * card frame + a step indicator so the visual system is visible during Phase A.
 */
export function PlaceholderWidget({ ctx, params }: WidgetProps) {
  const label = (params?.label as string) ?? 'interactive widget';
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface-2 p-8 text-center shadow-sm">
      <p className="font-display text-2xl text-fg-muted">{label}</p>
      <p className="text-fg-subtle mt-1 font-mono text-xs">
        interactive widget placeholder · step {ctx.step + 1} of {ctx.totalSteps}
      </p>
      <div className="mt-5 flex items-center justify-center gap-2">
        {Array.from({ length: Math.max(ctx.totalSteps, 1) }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              'h-1.5 rounded-full transition-all duration-300',
              i <= ctx.step ? 'w-8 bg-accent' : 'w-4 bg-border',
            )}
          />
        ))}
      </div>
    </div>
  );
}
