import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { WidgetProps } from '@/widgets/types';

interface Mechanism {
  id: string;
  name: string;
  tagline: string;
  detail: string;
}

interface Need {
  id: string;
  q: string;
  answer: string; // mechanism id
  why: string;
}

const MECHANISMS: Mechanism[] = [
  { id: 'skill', name: 'Skill', tagline: 'reusable how-to', detail: 'A folder + SKILL.md the agent opens when the task matches.' },
  { id: 'subagent', name: 'Subagent', tagline: 'isolated helper', detail: 'A side task in its own context window that returns a summary.' },
  { id: 'slash', name: 'Slash command', tagline: 'manual trigger', detail: 'A workflow you invoke by name with /command.' },
  { id: 'mcp', name: 'MCP', tagline: 'external tools', detail: 'A standard plug connecting the agent to outside systems.' },
  { id: 'hook', name: 'Hook', tagline: 'lifecycle rule', detail: 'A command that fires automatically at a set moment.' },
];

const NEEDS: Need[] = [
  { id: 'n1', q: 'Connect Claude to Jira / Slack / a database', answer: 'mcp', why: 'External systems are exactly what MCP servers expose as tools.' },
  { id: 'n2', q: 'Auto-format every file right after it is edited', answer: 'hook', why: 'It must run at a fixed lifecycle point (PostToolUse) — that is a hook.' },
  { id: 'n3', q: 'Research a side topic without flooding the main chat', answer: 'subagent', why: 'A subagent runs in isolated context and returns just the summary.' },
  { id: 'n4', q: 'Package a repeatable "review my diff" workflow', answer: 'skill', why: 'A reusable, on-demand procedure the agent loads when relevant is a Skill.' },
];

export function DecisionMatrixWidget({ ctx }: WidgetProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const need = NEEDS.find((n) => n.id === picked) ?? null;
  const litMechanism = need?.answer ?? hovered;

  return (
    <div className="grid gap-5 md:grid-cols-[1.1fr_1fr]">
      {/* Left: the needs */}
      <div className="space-y-2.5">
        <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider">I need to…</p>
        {NEEDS.map((n) => {
          const isPicked = picked === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setPicked(isPicked ? null : n.id)}
              className={clsx(
                'w-full text-left rounded-lg border px-4 py-3 text-[18px] transition-all duration-200',
                isPicked
                  ? 'border-accent bg-accent-soft text-fg shadow-sm'
                  : 'border-border bg-surface-2 text-fg-muted hover:border-fg-subtle hover:text-fg',
              )}
            >
              {n.q}
            </button>
          );
        })}
      </div>

      {/* Right: the mechanisms */}
      <div className="space-y-2.5">
        <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider">…so use</p>
        {MECHANISMS.map((m) => {
          const lit = litMechanism === m.id;
          return (
            <motion.div
              key={m.id}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
              animate={{ scale: lit ? 1.02 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={clsx(
                'rounded-lg border px-4 py-2.5 transition-colors duration-200',
                lit
                  ? 'border-accent bg-accent-soft shadow'
                  : 'border-border bg-surface-2 opacity-70',
              )}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-lg text-fg">{m.name}</span>
                <span className="text-fg-subtle text-xs font-mono">{m.tagline}</span>
              </div>
              {lit && (
                <p className="text-fg-muted mt-1 text-[13px] leading-snug">{m.detail}</p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Explanation strip */}
      <div className="md:col-span-2 min-h-[3.25rem]">
        {need ? (
          <p className="text-fg rounded-lg border border-accent/40 bg-accent-soft px-4 py-3 text-[18px]">
            <span className="font-semibold">Why {MECHANISMS.find((m) => m.id === need.answer)?.name}:</span>{' '}
            {need.why}
          </p>
        ) : (
          <p className="text-fg-subtle px-1 py-3 text-sm">
            Pick a need on the left — the matching mechanism lights up.
            {ctx.isPresenter ? '' : ' Hover the cards on the right to preview each one.'}
          </p>
        )}
      </div>
    </div>
  );
}
