import clsx from 'clsx';
import type { ReactNode } from 'react';
import type { Position, SlideOutlineEntry } from '@/engine/navigation';

function IconButton({ onClick, title, children, active }: { onClick: () => void; title: string; children: ReactNode; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={clsx(
        'flex h-9 min-w-9 items-center justify-center rounded-md border px-2.5 font-mono text-sm transition-colors',
        active ? 'border-accent bg-accent-soft text-fg' : 'border-border text-fg-muted hover:border-fg-subtle hover:text-fg',
      )}
    >
      {children}
    </button>
  );
}

export function Footer({
  slideNo,
  slideTotal,
  slides,
  onJump,
  step,
  totalSteps,
  onPrev,
  onNext,
  onToggleSidebar,
  onToggleTheme,
  onToggleQa,
  onToggleNotes,
  onFullscreen,
  onPresent,
  theme,
  qaOpen,
  notesOpen,
}: {
  slideNo: number;
  slideTotal: number;
  slides: SlideOutlineEntry[];
  onJump: (p: Position) => void;
  step: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  onToggleQa: () => void;
  onToggleNotes: () => void;
  onFullscreen: () => void;
  onPresent: () => void;
  theme: 'dark' | 'light';
  qaOpen: boolean;
  notesOpen: boolean;
}) {
  // Group slides by module so the dropdown reads as labelled sections.
  const groups: { module: string; items: SlideOutlineEntry[] }[] = [];
  for (const s of slides) {
    const last = groups[groups.length - 1];
    if (last && last.module === s.moduleTitle) last.items.push(s);
    else groups.push({ module: s.moduleTitle, items: [s] });
  }

  return (
    <footer className="flex items-center justify-between gap-4 border-t border-border bg-surface/60 px-4 py-2 backdrop-blur">
      <div className="flex items-center gap-1.5">
        <IconButton onClick={onToggleSidebar} title="Toggle sidebar (o)">☰</IconButton>
        <IconButton onClick={onToggleNotes} title="Talking points (s)" active={notesOpen}>Script</IconButton>
        <IconButton onClick={onToggleQa} title="Anticipated Q&A (q)" active={qaOpen}>Q&amp;A</IconButton>
      </div>

      <div className="flex items-center gap-3">
        <IconButton onClick={onPrev} title="Back (←)">←</IconButton>
        {totalSteps > 1 && (
          <div className="flex items-center gap-1" title={`step ${step + 1} of ${totalSteps}`}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={clsx('h-1.5 rounded-full transition-all duration-300', i <= step ? 'w-5 bg-accent' : 'w-2 bg-border')}
              />
            ))}
          </div>
        )}
        <div className="flex items-center gap-2">
          <span
            title="Slide number — use this to reference slides"
            className="rounded border border-border px-1.5 py-0.5 font-mono text-xs tabular-nums text-fg-muted select-none"
          >
            #{slideNo}
          </span>
          <select
            value={slideNo}
            onChange={(e) => {
              const entry = slides.find((s) => s.globalNo === Number(e.target.value));
              if (entry) onJump(entry.position);
            }}
            title="Jump to slide"
            aria-label="Jump to slide"
            className="max-w-[15rem] truncate rounded-md border border-border bg-surface px-2 py-1 font-mono text-sm text-fg-muted outline-none transition-colors hover:border-fg-subtle focus:border-accent"
          >
            {groups.map((g) => (
              <optgroup key={g.module} label={g.module}>
                {g.items.map((s) => (
                  <option key={s.globalNo} value={s.globalNo}>
                    {s.globalNo}. {s.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <span className="font-mono text-sm tabular-nums text-fg-subtle">/ {slideTotal}</span>
        </div>
        <IconButton onClick={onNext} title="Next (→ / space)">→</IconButton>
      </div>

      <div className="flex items-center gap-1.5">
        <IconButton onClick={onPresent} title="Open presenter view (p)">⧉</IconButton>
        <IconButton onClick={onFullscreen} title="Fullscreen (f)">⛶</IconButton>
        <IconButton onClick={onToggleTheme} title="Toggle theme (t)">{theme === 'dark' ? '☾' : '☀'}</IconButton>
      </div>
    </footer>
  );
}
