import { motion } from 'framer-motion';
import { useDeckControls } from '@/app/DeckControls';
import { RevealGroup } from '@/diagrams/primitives/RevealGroup';
import type { DiagramProps } from '@/diagrams/types';

interface LayerDef {
  key: string;
  title: string;
  where: string;
}

/** Broadest → most specific. All load together; the closest scope wins on conflict. */
const LAYERS: LayerDef[] = [
  { key: 'enterprise', title: 'Enterprise', where: 'managed by IT' },
  { key: 'user', title: 'User', where: '~/.claude/CLAUDE.md' },
  { key: 'project', title: 'Project', where: './CLAUDE.md (committed)' },
  { key: 'local', title: 'Local', where: 'CLAUDE.local.md (you only)' },
];

const ROW_H = 46;
const ROW_GAP = 12;
const ROW_X = 96;
const ROW_W = 470;
const TOP = 20;

/**
 * "CLAUDE.md & memory": four scopes the agent reads every session, stacked broad → specific.
 * Each step reveals the next layer and slides the "closest scope wins" marker down. They don't
 * replace each other — they stack; the narrower scope just wins a direct conflict. Clicking a
 * layer (or pressing →) sets the slide step.
 */
export function MemoryHierarchyDiagram({ step }: DiagramProps) {
  const { goToStep } = useDeckControls();
  const s = Math.min(Math.max(step, 0), LAYERS.length - 1);

  return (
    <svg viewBox="0 0 620 300" role="img" aria-label="Four CLAUDE.md scopes: enterprise, user, project, local — broad to specific" className="w-full h-auto">
      <defs>
        <marker id="cc-mem-arrow" markerWidth={8} markerHeight={8} refX={5} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-accent-2)" />
        </marker>
      </defs>

      {/* Specificity axis on the left */}
      <text x={28} y={TOP + 8} fontFamily="var(--font-mono)" fontSize={11} fill="var(--color-fg-subtle)">
        broad
      </text>
      <line x1={40} y1={TOP + 18} x2={40} y2={TOP + 4 * (ROW_H + ROW_GAP) - 22} stroke="var(--color-accent-2)" strokeWidth={1.6} markerEnd="url(#cc-mem-arrow)" />
      <text x={20} y={TOP + 4 * (ROW_H + ROW_GAP) - 4} fontFamily="var(--font-mono)" fontSize={11} fill="var(--color-fg-subtle)">
        specific
      </text>

      {LAYERS.map((layer, i) => {
        const y = TOP + i * (ROW_H + ROW_GAP);
        const lit = s === i;
        const inset = i * 14; // each narrower scope steps inward
        return (
          <RevealGroup key={layer.key} show={s >= i} dim={0.22}>
            <g transform={`translate(${ROW_X + inset}, ${y})`} onClick={() => goToStep(i)} style={{ cursor: 'pointer' }}>
              <motion.rect
                width={ROW_W - inset * 2}
                height={ROW_H}
                rx={11}
                fill={lit ? 'var(--color-accent-soft)' : 'var(--color-surface-2)'}
                animate={{ stroke: lit ? 'var(--color-accent)' : 'var(--color-border)', strokeWidth: lit ? 2.5 : 1.5 }}
                transition={{ duration: 0.25 }}
              />
              <text x={18} y={ROW_H / 2 + 1} dominantBaseline="middle" fontFamily="var(--font-display)" fontSize={18} fontWeight={600} fill="var(--color-fg)">
                {layer.title}
              </text>
              <text x={ROW_W - inset * 2 - 18} y={ROW_H / 2 + 1} dominantBaseline="middle" textAnchor="end" fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-fg-subtle)">
                {layer.where}
              </text>
            </g>
          </RevealGroup>
        );
      })}

      {/* Closer-scope-wins caption appears once the stack is built */}
      <RevealGroup show={s >= LAYERS.length - 1} dim={0}>
        <text x={310} y={292} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13.5} fontWeight={600} fill="var(--color-accent)">
          All load together · the closest scope wins a conflict
        </text>
      </RevealGroup>
    </svg>
  );
}
