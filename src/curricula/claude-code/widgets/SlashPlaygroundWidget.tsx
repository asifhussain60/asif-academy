import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useDeckControls } from '@/app/DeckControls';
import type { WidgetProps } from '@/widgets/types';

interface Command {
  name: string;
  origin: 'built-in' | 'custom';
  summary: string;
  detail: string;
}

const COMMANDS: Command[] = [
  { name: '/model', origin: 'built-in', summary: 'switch the model', detail: 'Pick Haiku, Sonnet, Opus, or Fable for the next turns — speed vs. depth, on demand.' },
  { name: '/context', origin: 'built-in', summary: 'see what is loaded', detail: 'Shows everything currently in the context window — files, memory, tool output — and how much room is left.' },
  { name: '/clear', origin: 'built-in', summary: 'reset the conversation', detail: 'Wipes the running context to start a fresh task without restarting the program.' },
  { name: '/release-notes', origin: 'custom', summary: 'your release-notes Skill', detail: 'A custom command IS a Skill: a folder + SKILL.md you wrote. Invoke it by name to run your packaged workflow.' },
];

export function SlashPlaygroundWidget({ ctx }: WidgetProps) {
  const { goToStep } = useDeckControls();
  // Driven by the slide step so the deck arrow (and /present) walk the commands in order;
  // clicking a command jumps the step too, keeping everything in sync.
  const idx = Math.min(Math.max(ctx.step, 0), COMMANDS.length - 1);
  const active = COMMANDS[idx];
  const picked = active.name;

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
      {/* The prompt + menu */}
      <div className="overflow-hidden rounded-xl border border-border bg-[#0b1116] shadow-sm">
        <div className="border-b border-border/70 px-4 py-2.5 font-mono text-xs text-fg-subtle">type a "/" to see commands</div>
        <div className="p-4">
          <p className="font-mono text-[14px] text-fg">
            <span className="text-fg-subtle">&gt;</span> <span className="text-accent">{picked}</span>
            <motion.span className="text-accent" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.9 }}>
              ▋
            </motion.span>
          </p>
          <div className="mt-3 space-y-1.5">
            {COMMANDS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => goToStep(i)}
                className={clsx(
                  'flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-all duration-200',
                  picked === c.name ? 'border-accent bg-accent-soft' : 'border-border bg-surface-2 hover:border-fg-subtle',
                )}
              >
                <span className="font-mono text-[13.5px] text-fg">{c.name}</span>
                <span className="font-mono text-[11px] text-fg-subtle">{c.summary}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="flex flex-col justify-center rounded-xl border border-border bg-surface-2 p-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg text-accent">{active.name}</span>
          <span
            className={clsx(
              'rounded-full px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wide',
              active.origin === 'custom' ? 'bg-accent-soft text-accent' : 'bg-surface text-fg-subtle',
            )}
          >
            {active.origin}
          </span>
        </div>
        <p className="mt-2 text-[18px] leading-snug text-fg">{active.detail}</p>
        {active.origin === 'custom' && (
          <p className="mt-3 border-t border-border pt-3 text-[13px] leading-snug text-fg-muted">
            The punchline: <span className="text-accent">every custom slash command is a Skill</span> — so the rest of this tutorial is really about writing good ones.
          </p>
        )}
        {!ctx.isPresenter && active.origin === 'built-in' && (
          <p className="mt-3 text-[12.5px] text-fg-subtle">Press → (or click {COMMANDS[3].name}) to see how a custom one differs.</p>
        )}
      </div>
    </div>
  );
}
