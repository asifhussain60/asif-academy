import { motion } from 'framer-motion';
import { useDeckControls } from '@/app/DeckControls';
import { RevealGroup } from '@/diagrams/primitives/RevealGroup';
import type { DiagramProps } from '@/diagrams/types';

const CAPTIONS = [
  'The agent does the work — the main one, running the loop.',
  'A skill is knowledge it loads — it informs, never acts.',
  'A subagent is an agent too — a helper in its own space.',
];

/**
 * Skill vs. agent vs. subagent, by relationship. The agent is the centre that does the work; a
 * skill is knowledge it loads IN; a subagent is a helper it delegates OUT to. Each step reveals the
 * next piece so the presenter can name them one at a time. Clicking a node sets the slide step.
 */
export function BuildingBlocksDiagram({ step }: DiagramProps) {
  const { goToStep } = useDeckControls();
  const sel = Math.min(Math.max(step, 0), 2);

  return (
    <svg viewBox="0 0 680 256" role="img" aria-label="An agent loads a skill and delegates to a subagent" className="w-full h-auto">
      <defs>
        <marker id="cc-bb-arrow" markerWidth={9} markerHeight={9} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Skill — loaded INTO the agent (arrow points right, toward the agent) */}
      <RevealGroup show={sel >= 1} dim={0.2}>
        <motion.path
          d="M196 96 L262 96"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2.4}
          strokeLinecap="round"
          markerEnd="url(#cc-bb-arrow)"
          initial={false}
          animate={{ pathLength: sel >= 1 ? 1 : 0, opacity: sel >= 1 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <text x={196} y={80} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12.5} fill="var(--color-fg-subtle)">
          loads
        </text>
        <g transform="translate(36, 56)" onClick={() => goToStep(1)} style={{ cursor: 'pointer' }}>
          <motion.rect width={150} height={80} rx={13} fill="var(--color-surface-2)" animate={{ stroke: sel === 1 ? 'var(--color-accent)' : 'var(--color-border)', strokeWidth: sel === 1 ? 2.5 : 1.5 }} transition={{ duration: 0.25 }} />
          {/* folder glyph */}
          <g transform="translate(75, 28)" stroke="var(--color-accent)" strokeWidth={1.8} fill="none" strokeLinejoin="round">
            <path d="M-13 -7 L-3 -7 L0 -4 L13 -4 L13 8 L-13 8 Z" />
          </g>
          <text x={75} y={58} textAnchor="middle" fontFamily="var(--font-display)" fontSize={18} fontWeight={600} fill="var(--color-fg)">
            Skill
          </text>
          <text x={75} y={73} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11.5} fill="var(--color-fg-muted)">
            knowledge
          </text>
        </g>
      </RevealGroup>

      {/* Agent — the centre */}
      <g transform="translate(264, 40)" onClick={() => goToStep(0)} style={{ cursor: 'pointer' }}>
        <motion.rect width={152} height={112} rx={16} fill="var(--color-surface-2)" animate={{ stroke: sel === 0 ? 'var(--color-accent)' : 'var(--color-border)', strokeWidth: sel === 0 ? 2.5 : 1.5 }} transition={{ duration: 0.25 }} />
        {sel === 0 && <rect width={152} height={112} rx={16} fill="var(--color-accent-soft)" />}
        <g transform="translate(76, 38)">
          <circle r={20} fill="var(--color-accent)" />
          {/* loop glyph — the agent runs the loop */}
          <path d="M-8 2 A8 8 0 1 1 -2 8" fill="none" stroke="var(--color-accent-contrast)" strokeWidth={1.9} strokeLinecap="round" />
          <path d="M-2 8 L-6 8 M-2 8 L-2 4" fill="none" stroke="var(--color-accent-contrast)" strokeWidth={1.9} strokeLinecap="round" />
        </g>
        <text x={76} y={82} textAnchor="middle" fontFamily="var(--font-display)" fontSize={21} fontWeight={600} fill="var(--color-fg)">
          Agent
        </text>
        <text x={76} y={101} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12.5} fill="var(--color-fg-muted)">
          does the work
        </text>
      </g>

      {/* Subagent — delegated OUT to (arrow points right, away from the agent) */}
      <RevealGroup show={sel >= 2} dim={0.2}>
        <motion.path
          d="M420 96 L486 96"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2.4}
          strokeLinecap="round"
          markerEnd="url(#cc-bb-arrow)"
          initial={false}
          animate={{ pathLength: sel >= 2 ? 1 : 0, opacity: sel >= 2 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <text x={453} y={80} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12.5} fill="var(--color-fg-subtle)">
          delegates
        </text>
        <g transform="translate(494, 56)" onClick={() => goToStep(2)} style={{ cursor: 'pointer' }}>
          <motion.rect width={150} height={80} rx={13} fill="var(--color-surface-2)" animate={{ stroke: sel === 2 ? 'var(--color-accent)' : 'var(--color-border)', strokeWidth: sel === 2 ? 2.5 : 1.5 }} transition={{ duration: 0.25 }} />
          <g transform="translate(75, 28)">
            <circle r={11} fill="none" stroke="var(--color-accent)" strokeWidth={1.8} />
            <circle cx={0} cy={-2} r={3.4} fill="var(--color-accent)" />
            <path d="M-6 6 Q0 1 6 6" fill="none" stroke="var(--color-accent)" strokeWidth={1.8} strokeLinecap="round" />
          </g>
          <text x={75} y={58} textAnchor="middle" fontFamily="var(--font-display)" fontSize={18} fontWeight={600} fill="var(--color-fg)">
            Subagent
          </text>
          <text x={75} y={73} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11.5} fill="var(--color-fg-muted)">
            a helper agent
          </text>
        </g>
      </RevealGroup>

      <motion.text
        key={sel}
        x={340}
        y={232}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={15}
        fontWeight={600}
        fill="var(--color-accent)"
        initial={{ opacity: 0, y: 238 }}
        animate={{ opacity: 1, y: 232 }}
        transition={{ duration: 0.3 }}
      >
        {CAPTIONS[sel]}
      </motion.text>
    </svg>
  );
}
