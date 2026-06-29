import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { getTutorial } from '@/curricula';
import { getSlide, getLessonRef, type Position } from '@/engine/navigation';
import { renderInline } from '@/detail/renderInline';
import { usePresenterPosition } from './usePresenterSync';
import { loadOverrides, saveOverride, overrideKey, type OverridesMap } from './overridesClient';

/** Only the Foundations module is editable for now (per scope). */
const EDITABLE_MODULE = '01-foundations';

function useElapsed(): string {
  const [now, setNow] = useState(() => Date.now());
  const [start] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const secs = Math.floor((now - start) / 1000);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

/** Resolve the read-aloud bullets for the current step from any supported talkingPoints shape. */
function currentBeats(tp: string | string[] | string[][] | undefined, step: number): string[] {
  if (!tp) return [];
  if (typeof tp === 'string') return [tp];
  if (tp.length === 0) return [];
  if (Array.isArray(tp[0])) {
    const perStep = tp as string[][];
    return perStep[Math.min(step, perStep.length - 1)] ?? [];
  }
  const flat = tp as string[];
  return [flat[Math.min(step, flat.length - 1)] ?? ''];
}

/** Text box → bullets: one non-empty line per bullet, markup preserved verbatim. */
function parseDraft(draft: string): string[] {
  return draft.split('\n').filter((l) => l.trim() !== '');
}

function ToolBtn({ onClick, title, children }: { onClick: () => void; title: string; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex h-8 min-w-8 items-center justify-center rounded-md border border-border px-2.5 font-mono text-sm text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
    >
      {children}
    </button>
  );
}

/** A flushable snapshot of the step being edited, kept in a ref so auto-save survives a position jump. */
interface EditTarget {
  key: string;
  moduleId: string;
  lessonId: string;
  slideId: string;
  step: number;
  before: string[];
}

/**
 * The private /present window. Hidden from the audience; shows step-indexed talking points and
 * updates live via BroadcastChannel. Built as an APP shell (toolbar + buttons) — not a plain
 * article — so Safari does not auto-flip it into Reader Mode (which strips our styling). It never
 * auto-closes; the Close button is the only way to dismiss it.
 *
 * Talking points (only, never the Q&A) are editable for the Foundations module: read-only by
 * default with an Edit button; Save/Discard while editing; and an auto-save the moment the deck
 * advances to another slide or step. Edits persist to a dev-only overrides file (overridesClient).
 */
export function PresenterWindow() {
  const pos = usePresenterPosition();
  const elapsed = useElapsed();
  const [scale, setScale] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [overrides, setOverrides] = useState<OverridesMap>({});
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');

  // Refs let the auto-save flush use the *outgoing* step's draft, even as state re-renders for the new one.
  const editingRef = useRef(false);
  const draftRef = useRef('');
  const targetRef = useRef<EditTarget | null>(null);
  const prevKeyRef = useRef<string | null>(null);

  useEffect(() => {
    void loadOverrides().then(setOverrides);
  }, []);

  const tutorial = pos ? getTutorial(pos.tutorialId) : undefined;
  const position: Position | null = pos
    ? { moduleId: pos.moduleId, lessonId: pos.lessonId, slideIndex: pos.slideIndex }
    : null;
  const slide = tutorial && position ? getSlide(tutorial, position) : undefined;
  const lessonRef = tutorial && position ? getLessonRef(tutorial, position.moduleId, position.lessonId) : undefined;

  const step = pos?.step ?? 0;
  const originalBeats = currentBeats(slide?.talkingPoints, step);
  const key = pos && slide ? overrideKey(pos.moduleId, pos.lessonId, slide.id, step) : '';
  const savedAfter = key ? overrides[key]?.after : undefined;
  const displayedBeats = savedAfter ?? originalBeats;
  const canEdit = pos?.moduleId === EDITABLE_MODULE && !!slide;

  const persist = useCallback((t: EditTarget, after: string[]) => {
    setOverrides((o) => ({ ...o, [t.key]: { before: o[t.key]?.before ?? t.before, after } }));
    void saveOverride({
      moduleId: t.moduleId,
      lessonId: t.lessonId,
      slideId: t.slideId,
      step: t.step,
      before: t.before,
      after,
    });
  }, []);

  // Auto-save: when the deck advances (key changes), flush any in-progress edit for the previous step.
  useEffect(() => {
    if (!key) return;
    if (prevKeyRef.current && prevKeyRef.current !== key && editingRef.current && targetRef.current) {
      const t = targetRef.current;
      const after = parseDraft(draftRef.current);
      const lastSaved = (overrides[t.key]?.after ?? t.before).join('\n');
      if (after.join('\n') !== lastSaved) persist(t, after);
    }
    // Landing on a new step is always read-only.
    setIsEditing(false);
    editingRef.current = false;
    targetRef.current = null;
    prevKeyRef.current = key;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const startEdit = () => {
    if (!pos || !slide) return;
    setDraft(displayedBeats.join('\n'));
    draftRef.current = displayedBeats.join('\n');
    targetRef.current = {
      key,
      moduleId: pos.moduleId,
      lessonId: pos.lessonId,
      slideId: slide.id,
      step,
      before: originalBeats,
    };
    setIsEditing(true);
    editingRef.current = true;
  };

  const saveEdit = () => {
    if (targetRef.current) persist(targetRef.current, parseDraft(draft));
    setIsEditing(false);
    editingRef.current = false;
  };

  const discardEdit = () => {
    setIsEditing(false);
    editingRef.current = false;
  };

  const onDraftChange = (v: string) => {
    setDraft(v);
    draftRef.current = v;
  };

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      {/* App toolbar — keeps this looking like an app (defeats Reader Mode) + manual controls. */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-surface/90 px-4 py-2.5 backdrop-blur">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">Presenter · private</p>
        <div className="flex items-center gap-2">
          <span className="mr-1 font-mono text-sm tabular-nums text-fg-muted">{elapsed}</span>
          <ToolBtn onClick={() => setScale((s) => Math.max(0.8, s - 0.1))} title="Smaller text">A−</ToolBtn>
          <ToolBtn onClick={() => setScale((s) => Math.min(1.6, s + 0.1))} title="Larger text">A+</ToolBtn>
          <ToolBtn onClick={() => window.close()} title="Close presenter window">✕</ToolBtn>
        </div>
      </header>

      <div className="flex-1 p-5">
        {!slide ? (
          <p className="text-[17px] text-fg-subtle">Waiting for the slide window… navigate there to sync.</p>
        ) : (
          <>
            <p className="font-mono text-[13px] text-fg-subtle">
              {lessonRef?.module.title} → {lessonRef?.lesson.title} · slide {position!.slideIndex + 1}
              {(slide.steps ?? 1) > 1 ? ` · step ${step + 1}/${slide.steps}` : ''}
            </p>

            <section className="mt-4 rounded-lg border border-border bg-surface p-5 shadow">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-mono text-[13px] uppercase tracking-wider text-fg-subtle">Talking points</p>
                {canEdit && !isEditing && (
                  <button
                    onClick={startEdit}
                    className="rounded-md border border-border px-2.5 py-1 font-mono text-[12px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {savedAfter ? 'Edit ✎ (edited)' : 'Edit ✎'}
                  </button>
                )}
                {canEdit && isEditing && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={saveEdit}
                      className="rounded-md border border-accent bg-accent px-2.5 py-1 font-mono text-[12px] text-[var(--color-accent-contrast)] transition-opacity hover:opacity-90"
                    >
                      Save
                    </button>
                    <button
                      onClick={discardEdit}
                      className="rounded-md border border-border px-2.5 py-1 font-mono text-[12px] text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
                    >
                      Discard
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <>
                  <textarea
                    value={draft}
                    onChange={(e) => onDraftChange(e.target.value)}
                    spellCheck
                    autoFocus
                    rows={Math.max(6, draft.split('\n').length + 1)}
                    className="w-full resize-y rounded-md border border-border bg-surface-2 p-3 leading-[1.6] text-fg outline-none focus:border-accent"
                    style={{ fontSize: `${17 * scale}px` }}
                  />
                  <p className="mt-2 font-mono text-[11px] text-fg-subtle">
                    One bullet per line. Markup like **bold** and [[label|key]] is kept as written. Auto-saves when you advance.
                  </p>
                </>
              ) : displayedBeats.length === 0 ? (
                <p className="text-[17px] text-fg-subtle">— (no talking points for this step yet)</p>
              ) : (
                <ul className="space-y-3.5">
                  {displayedBeats.map((b, i) => (
                    <li key={i} className="cc-hl flex gap-3 leading-[1.6] text-fg" style={{ fontSize: `${19 * scale}px` }}>
                      <span className="mt-[3px] shrink-0 select-none text-accent" aria-hidden>▸</span>
                      <span>{renderInline(b)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {slide.faqs && slide.faqs.length > 0 && (
              <section className="mt-4">
                <p className="mb-2.5 font-mono text-[13px] uppercase tracking-wider text-fg-subtle">Likely questions</p>
                <ul className="space-y-2.5">
                  {slide.faqs.map((f, i) => {
                    const open = openFaq === i;
                    return (
                      <li key={i} className="overflow-hidden rounded-md border border-border bg-surface-2">
                        <button
                          onClick={() => setOpenFaq(open ? null : i)}
                          className="flex w-full items-center justify-between gap-3 p-3.5 text-left transition-colors hover:bg-surface"
                          aria-expanded={open}
                        >
                          <span className="font-semibold text-fg" style={{ fontSize: `${16 * scale}px` }}>{f.q}</span>
                          <span className={`shrink-0 select-none text-lg text-accent transition-transform ${open ? 'rotate-45' : ''}`} aria-hidden>
                            +
                          </span>
                        </button>
                        {open && (
                          <p className="cc-hl border-t border-border px-3.5 py-3 leading-relaxed text-fg-muted" style={{ fontSize: `${15 * scale}px` }}>
                            {renderInline(f.a)}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
