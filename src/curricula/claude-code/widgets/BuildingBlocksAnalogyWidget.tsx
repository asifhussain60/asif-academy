import { motion } from 'framer-motion';
import type { WidgetProps } from '@/widgets/types';

interface Item {
  term: string;
  role: string;
  analogy: string;
  plain: string;
}

/**
 * Synced to the building-blocks diagram step: shows ONLY the selected piece's analogy + plain
 * difference. The subagent entry deliberately spells out how it differs from the main agent
 * (same machinery, but a delegated helper with its own context that returns a summary).
 */
const ITEMS: Item[] = [
  {
    term: 'Agent',
    role: 'does the work',
    analogy: 'The agent is the chef — the one actually at the stove, doing the cooking.',
    plain: 'The main worker. It runs the loop: reads, edits, runs, and checks its own work.',
  },
  {
    term: 'Skill',
    role: 'knowledge',
    analogy: 'A skill is a recipe card the chef keeps on hand — it holds the how-to, but it never cooks.',
    plain: "Reusable knowledge the agent loads when a task needs it. It informs; it doesn't act.",
  },
  {
    term: 'Subagent',
    role: 'a helper agent',
    analogy: 'A subagent is a prep cook the chef sends to its own station — same kitchen skills, but handed one job, and it brings back just the finished bowl.',
    plain: 'Also an agent — but a helper the main agent spins up for one side-task, in its own clean context, returning just a summary. Same machinery, narrower job.',
  },
];

export function BuildingBlocksAnalogyWidget({ ctx }: WidgetProps) {
  const i = Math.min(Math.max(ctx.step, 0), ITEMS.length - 1);
  const item = ITEMS[i];

  return (
    <div className="rounded-md border border-border border-l-[3px] border-l-[var(--color-accent-2)] bg-surface-2 px-5 py-4">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-accent-2)]">
        <span aria-hidden>☻</span>
        Like this
        <span className="ml-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-[11.5px] font-medium normal-case tracking-normal text-accent">
          {item.term} · {item.role}
        </span>
      </p>
      {/* Keyed (re-mounts on step change) but NOT wrapped in AnimatePresence — a fade-in on each
          step that can't get stuck under arrow-spam, the same robustness RevealGroup relies on. */}
      <motion.div key={item.term} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
        <p className="font-friendly text-[1.4rem] leading-snug text-fg">{item.analogy}</p>
        <p className="mt-2.5 border-t border-border pt-2.5 text-[14px] leading-snug text-fg-muted">{item.plain}</p>
      </motion.div>
    </div>
  );
}
