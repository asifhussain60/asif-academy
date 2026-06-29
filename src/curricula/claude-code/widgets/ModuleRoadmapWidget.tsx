import clsx from 'clsx';
import { useDeckControls } from '@/app/DeckControls';
import { renderInline } from '@/detail/renderInline';
import type { WidgetProps } from '@/widgets/types';

interface ModuleStep {
  /** Short phase label, e.g. "Now" / "Module 2". */
  title: string;
  /** What gets added in this phase (supports inline **bold** / `code` / [[detail]]). */
  body: string;
}

/**
 * A stepped roadmap of cards: one card per phase of building the running example. The card matching
 * the current slide step is highlighted; the rest dim back. Clicking a card jumps the slide step
 * (via useDeckControls), so the deck arrow, a click, and the /present window stay in sync — and the
 * step-indexed talkingPoints refresh with each move. Phases are passed as `params.modules` so the
 * content stays in the tutorial data, not the widget.
 */
export function ModuleRoadmapWidget({ ctx, params }: WidgetProps) {
  const { goToStep } = useDeckControls();
  const modules = (params?.modules as ModuleStep[] | undefined) ?? [];
  if (modules.length === 0) return null;
  const active = Math.min(Math.max(ctx.step, 0), modules.length - 1);

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${modules.length}, minmax(0, 1fr))` }}>
      {modules.map((m, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            onClick={() => goToStep(i)}
            aria-current={isActive}
            className={clsx(
              'rounded-xl border p-4 text-left shadow-sm transition-all duration-200',
              isActive
                ? 'border-accent/60 bg-accent-soft'
                : 'border-border bg-surface-2 opacity-60 hover:opacity-100',
            )}
          >
            <p className={clsx('font-display text-xl font-semibold', isActive ? 'text-accent' : 'text-fg')}>
              {m.title}
            </p>
            <p className="cc-hl mt-2.5 text-[18px] leading-relaxed text-fg-muted">
              {renderInline(m.body, ctx.details)}
            </p>
          </button>
        );
      })}
    </div>
  );
}
