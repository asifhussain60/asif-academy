import { useState } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useHover,
  useFocus,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { DetailContent } from '@/engine/types';
import { renderInline } from './renderInline';

/**
 * An inline "detail marker": an underlined term that, on HOVER, opens a large rich tooltip, and
 * on CLICK, pins a dismissible popover (PPT-style "appears as I click"). @floating-ui keeps the
 * large card on-screen near slide edges (flip/shift). Keyboard-accessible; dismiss on Esc / outside.
 */
export function DetailMark({ label, detail }: { label: string; detail: DetailContent }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  const isOpen = open || pinned;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (next) => {
      setOpen(next);
      if (!next) setPinned(false);
    },
    placement: 'top',
    middleware: [offset(12), flip({ padding: 12 }), shift({ padding: 12 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { enabled: !pinned, move: false, delay: { open: 90, close: 140 } });
  const focus = useFocus(context);
  const click = useClick(context, { toggle: true });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: pinned ? 'dialog' : 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, click, dismiss, role]);

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps({ onClick: () => setPinned((p) => !p) })}
        className="cc-detail-mark"
      >
        {label}
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
              {/* Positioning wrapper: Floating UI owns this element's transform (placement). */}
              <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className="z-50">
                {/* Animated layer: its own transform for fade/scale — no conflict with positioning. */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 6 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="w-[27rem] max-w-[85vw] overflow-hidden rounded-xl border border-border bg-surface text-fg shadow-xl"
                >
                  {/* Accent header with a concept glyph — makes it a card, not a grey box. */}
                  <div className="flex items-center gap-2.5 border-b border-border bg-accent-soft px-4 py-3">
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-[15px] text-[var(--color-accent-contrast)]">
                      {detail.icon ?? '✶'}
                    </span>
                    <p className="font-display text-[17px] font-semibold text-fg">{detail.title}</p>
                  </div>

                  <div className="p-4">
                    <p className="text-[15px] leading-relaxed text-fg">{renderInline(detail.body)}</p>

                    {detail.points && detail.points.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {detail.points.map((pt, i) => (
                          <li key={i} className="flex gap-2 text-[15px] leading-snug text-fg-muted">
                            <span className="mt-[2px] select-none text-accent" aria-hidden>▸</span>
                            <span>{renderInline(pt)}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {detail.analogy && (
                      <div className="mt-3 flex gap-2 rounded-lg border border-[var(--color-accent-2)]/40 bg-surface-2 px-3 py-2.5">
                        <span className="select-none text-xl" aria-hidden>💡</span>
                        <p>
                          <span className="font-friendly text-[15px] font-bold text-[var(--color-accent-2)]">Like this — </span>
                          <span className="font-friendly text-[17px] leading-snug text-fg">{detail.analogy}</span>
                        </p>
                      </div>
                    )}

                    {detail.code && (
                      <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-surface-2 p-2.5 font-mono text-[14px] leading-relaxed text-fg">
                        {detail.code.code}
                      </pre>
                    )}

                    {detail.source && (
                      <p className="mt-3 text-[14px] text-fg-subtle">
                        {detail.source.href ? (
                          <a href={detail.source.href} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                            {detail.source.label} ↗
                          </a>
                        ) : (
                          detail.source.label
                        )}
                      </p>
                    )}
                    {pinned && (
                      <p className="mt-2.5 text-[13px] text-fg-subtle">Click the term again or press Esc to close.</p>
                    )}
                  </div>
                </motion.div>
              </div>
            </FloatingFocusManager>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}
