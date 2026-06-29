import clsx from 'clsx';
import { useState, useEffect, type ReactNode } from 'react';
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
  onHome,
  onPrev,
  onNext,
  onToggleSidebar,
  onToggleTheme,
  onFullscreen,
  onPresent,
  theme,
  isAdmin,
}: {
  slideNo: number;
  slideTotal: number;
  slides: SlideOutlineEntry[];
  onJump: (p: Position, step: number) => void;
  step: number;
  totalSteps: number;
  onHome: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  onFullscreen: () => void;
  onPresent: () => void;
  theme: 'dark' | 'light';
  isAdmin: boolean;
}) {
  const stepLetter = totalSteps > 1 ? String.fromCharCode(97 + step) : '';
  const currentAddress = `${slideNo}${stepLetter}`;

  const [inputVal, setInputVal] = useState(currentAddress);
  useEffect(() => { setInputVal(currentAddress); }, [currentAddress]);

  function handleSubmit() {
    const m = inputVal.trim().match(/^(\d+)([a-z])?$/i);
    if (!m) { setInputVal(currentAddress); return; }
    const no = parseInt(m[1], 10);
    const s = m[2] ? m[2].toLowerCase().charCodeAt(0) - 97 : 0;
    const entry = slides.find((e) => e.globalNo === no);
    if (entry) onJump(entry.position, s);
    else setInputVal(currentAddress);
  }

  return (
    <footer className="flex items-center justify-between gap-4 border-t border-border bg-surface/60 px-4 py-2 backdrop-blur">
      <div className="flex items-center gap-1.5">
        <IconButton onClick={onToggleSidebar} title="Toggle sidebar (o)">☰</IconButton>
      </div>

      <div className="flex items-center gap-3">
        <IconButton onClick={onHome} title="First slide">⌂</IconButton>
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
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { handleSubmit(); (e.target as HTMLInputElement).blur(); }
              if (e.key === 'Escape') setInputVal(currentAddress);
            }}
            onBlur={() => setInputVal(currentAddress)}
            title="Jump to slide — type a number (12) or step (13a, 13b…)"
            aria-label="Jump to slide"
            className="w-16 rounded border border-border bg-surface px-2 py-1 text-center font-mono text-sm text-fg-muted outline-none transition-colors focus:border-accent focus:text-fg"
          />
          <span className="font-mono text-sm tabular-nums text-fg-subtle">/ {slideTotal}</span>
        </div>
        <IconButton onClick={onNext} title="Next (→ / space)">→</IconButton>
      </div>

      <div className="flex items-center gap-1.5">
        {isAdmin && <IconButton onClick={onPresent} title="Open presenter view (p)">⧉</IconButton>}
        <IconButton onClick={onFullscreen} title="Fullscreen (f)">⛶</IconButton>
        <IconButton onClick={onToggleTheme} title="Toggle theme (t)">{theme === 'dark' ? '☾' : '☀'}</IconButton>
      </div>
    </footer>
  );
}
