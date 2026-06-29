import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import type { WidgetProps } from '@/widgets/types';

interface Task {
  id: string;
  label: string;
  model: 'haiku' | 'sonnet' | 'opus';
  icon: string;
  why: string;
}

const TASKS: Task[] = [
  { id: 't1', label: 'Lint 200 files and summarise warnings', model: 'haiku', icon: '⚡', why: 'High-volume, low-stakes — Haiku handles it in milliseconds at minimal cost.' },
  { id: 't2', label: 'Refactor a complex authentication module', model: 'sonnet', icon: '🛠', why: 'Standard coding work — Sonnet has the depth and is the sensible default.' },
  { id: 't3', label: 'Audit the architecture before a production migration', model: 'opus', icon: '🧠', why: 'Correctness is critical, reasoning must be deep — worth paying for Opus.' },
];

const MODEL_LABEL: Record<string, string> = { haiku: 'Haiku', sonnet: 'Sonnet', opus: 'Opus' };

export function ModelPickerWidget(_props: WidgetProps) {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <p className="mb-1 text-[13px] font-mono text-fg-subtle">Pick a task — see which model fits and why.</p>
      {TASKS.map((t) => {
        const isActive = picked === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setPicked(isActive ? null : t.id)}
            className={clsx(
              'w-full rounded-lg border px-4 py-2.5 text-left transition-colors',
              isActive
                ? 'border-accent/60 bg-accent-soft'
                : 'border-border bg-surface-2 hover:border-accent/40',
            )}
          >
            <div className="flex items-center justify-between">
              <span className={clsx('text-[15px]', isActive ? 'text-fg' : 'text-fg-muted')}>{t.label}</span>
              <span className={clsx('ml-3 shrink-0 text-[13px] font-mono', isActive ? 'text-accent' : 'text-fg-subtle')}>
                {t.icon} {MODEL_LABEL[t.model]}
              </span>
            </div>
            <AnimatePresence>
              {isActive && (
                <motion.p
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden text-[13px] leading-relaxed text-fg-muted"
                >
                  {t.why}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
