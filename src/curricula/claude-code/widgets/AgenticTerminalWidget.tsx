import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { WidgetProps } from '@/widgets/types';

interface Phase {
  tag: string;
  kind: 'observe' | 'think' | 'act' | 'verify';
  line: string;
  detail: string;
}

/** One pass of the loop, narrated as terminal output. Step 0 shows the prompt; 1-4 add a phase. */
const PHASES: Phase[] = [
  { tag: 'observe', kind: 'observe', line: 'reading src/auth.test.ts and the failing output…', detail: 'It looks at the situation first — files, errors, its own notes.' },
  { tag: 'think', kind: 'think', line: 'the assertion expects a 401, the handler returns 500.', detail: 'It reasons about the single next step, not the whole plan.' },
  { tag: 'act', kind: 'act', line: 'edit src/auth.ts · map the unauthorized branch to 401', detail: 'It uses a tool — actually changes the world, not just talks.' },
  { tag: 'verify', kind: 'verify', line: 'npm test → 12 passing. goal met, no more tools to call.', detail: 'It checks its own work — and because it checks, it can self-correct.' },
];

const KIND_COLOR: Record<Phase['kind'], string> = {
  observe: 'text-[var(--color-accent-2)]',
  think: 'text-[var(--color-accent-2)]',
  act: 'text-accent',
  verify: 'text-accent',
};

export function AgenticTerminalWidget({ ctx }: WidgetProps) {
  const shown = Math.min(Math.max(ctx.step, 0), PHASES.length); // 0..4
  const current = shown > 0 ? PHASES[shown - 1] : null;
  const looping = shown > 0 && shown < PHASES.length;

  return (
    <div className="grid gap-4 md:grid-cols-[1.35fr_1fr]">
      {/* Terminal */}
      <div className="overflow-hidden rounded-xl border border-border bg-[#0b1116] shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-border/70 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 font-mono text-xs text-fg-subtle">claude — the agentic loop</span>
        </div>
        <div className="space-y-1.5 p-4 font-mono text-[13.5px] leading-relaxed">
          <p className="text-fg-muted">
            <span className="text-accent">$</span> claude
          </p>
          <p className="text-fg">
            <span className="text-fg-subtle">&gt;</span> read the failing test and fix it
          </p>
          {PHASES.slice(0, shown).map((p, i) => (
            <motion.p
              key={p.tag}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: i === shown - 1 ? 1 : 0.55, x: 0 }}
              transition={{ duration: 0.28 }}
              className="flex gap-2"
            >
              <span className={clsx('w-[68px] shrink-0 uppercase tracking-wide', KIND_COLOR[p.kind])}>{p.tag}</span>
              <span className="text-fg-muted">{p.line}</span>
            </motion.p>
          ))}
          {looping && (
            <motion.p className="text-fg-subtle" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4 }}>
              ↻ looping…
            </motion.p>
          )}
          {shown === PHASES.length && <p className="text-accent">✓ done — no tool call this turn</p>}
        </div>
      </div>

      {/* What just happened */}
      <div className="flex flex-col justify-center rounded-xl border border-border bg-surface-2 p-5">
        {current ? (
          <>
            <p className={clsx('font-mono text-xs uppercase tracking-wider', KIND_COLOR[current.kind])}>{current.tag}</p>
            <p className="mt-1.5 text-[18px] leading-snug text-fg">{current.detail}</p>
          </>
        ) : (
          <p className="text-sm text-fg-subtle">
            Press <span className="font-mono text-accent">→</span> to play the loop one phase at a time.
          </p>
        )}
        <div className="mt-4 flex items-center gap-1.5">
          {PHASES.map((p, i) => (
            <span key={p.tag} className={clsx('h-1.5 rounded-full transition-all duration-300', i < shown ? 'w-7 bg-accent' : 'w-3.5 bg-border')} />
          ))}
        </div>
      </div>
    </div>
  );
}
