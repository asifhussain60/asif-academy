import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import type { Slide } from '@/engine/types';
import { renderInline } from '@/detail/renderInline';

/** Normalize any talkingPoints shape to steps-of-bullets ([step][bullet]). */
function toSteps(tp: string | string[] | string[][] | undefined): string[][] {
  if (!tp) return [];
  if (typeof tp === 'string') return [[tp]];
  if (tp.length === 0) return [];
  if (Array.isArray(tp[0])) return tp as string[][];
  return (tp as string[]).map((s) => [s]);
}

/**
 * In-deck talking-points panel — the same private read-aloud script the /present window shows,
 * surfaced as a left-side popup so you can self-present or review without a second window. Off by
 * default; toggled (button / `s`). Q&A lives on the right, so both can be open at once.
 *
 * Step-indexed talking points render as a list with the current step highlighted; clicking a step
 * jumps the slide to it (which also re-syncs any open presenter window).
 */
export function TalkingPointsPanel({
  slide,
  open,
  step,
  onGoToStep,
}: {
  slide: Slide;
  open: boolean;
  step: number;
  onGoToStep: (s: number) => void;
}) {
  const steps = toSteps(slide.talkingPoints);
  const isStepped = steps.length > 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="absolute left-4 top-4 bottom-4 z-30 flex w-[24rem] max-w-[85vw] flex-col rounded-xl border border-border bg-surface/95 shadow-xl backdrop-blur"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">Talking points</p>
            <span className="font-mono text-[11px] text-fg-subtle">private · press s</span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {steps.length === 0 ? (
              <p className="text-sm text-fg-subtle">No talking points for this slide yet.</p>
            ) : (
              <ol className="space-y-2.5">
                {steps.map((pt, i) => {
                  const current = isStepped && i === Math.min(step, steps.length - 1);
                  return (
                    <li key={i}>
                      <button
                        onClick={() => isStepped && onGoToStep(i)}
                        className={clsx(
                          'w-full rounded-lg border px-3.5 py-3 text-left transition-colors',
                          isStepped && 'cursor-pointer',
                          current
                            ? 'border-accent bg-accent-soft'
                            : 'border-border bg-surface-2 hover:border-fg-subtle',
                        )}
                      >
                        {isStepped && (
                          <span
                            className={clsx(
                              'mb-1 block font-mono text-[11px] uppercase tracking-wider',
                              current ? 'text-accent' : 'text-fg-subtle',
                            )}
                          >
                            Step {i + 1}
                            {current ? ' · now' : ''}
                          </span>
                        )}
                        <ul
                          className={clsx(
                            'cc-hl space-y-1.5 text-[14.5px] leading-relaxed',
                            current ? 'text-fg' : 'text-fg-muted',
                          )}
                        >
                          {pt.map((b, j) => (
                            <li key={j} className="flex gap-2">
                              <span className="mt-[2px] shrink-0 select-none text-accent" aria-hidden>▸</span>
                              <span>{renderInline(b)}</span>
                            </li>
                          ))}
                        </ul>
                      </button>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
