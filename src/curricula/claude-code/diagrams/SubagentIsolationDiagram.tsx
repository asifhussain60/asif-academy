import { motion } from 'framer-motion';
import { useDeckControls } from '@/app/DeckControls';
import { RevealGroup } from '@/diagrams/primitives/RevealGroup';
import type { DiagramProps } from '@/diagrams/types';

const BOX_W = 168;
const BOX_H = 152;
const MAIN_X = 28;
const MAIN_Y = 52;
const SUB_X = 444;
const SUB_Y = 52;
const MID_Y = MAIN_Y + BOX_H / 2;

/**
 * Subagent isolation: main agent dispatches a subagent into its own clean context window,
 * then only the summary comes back. Four steps: main agent visible → subagent spawned →
 * subagent working → summary returns.
 */
export function SubagentIsolationDiagram({ step }: DiagramProps) {
  const { goToStep } = useDeckControls();
  const s = Math.min(Math.max(step, 0), 3);

  return (
    <svg
      viewBox="0 0 640 260"
      role="img"
      aria-label="Main agent dispatches a subagent with a fresh context window; only the summary returns"
      className="w-full h-auto"
    >
      <defs>
        <marker id="sa-arrow-fwd" markerWidth={9} markerHeight={9} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--color-accent)" />
        </marker>
        <marker id="sa-arrow-back" markerWidth={9} markerHeight={9} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--color-accent-2, var(--color-accent))" />
        </marker>
      </defs>

      {/* ── Main agent box ── */}
      <g onClick={() => goToStep(0)} style={{ cursor: 'pointer' }}>
        <motion.rect
          x={MAIN_X}
          y={MAIN_Y}
          width={BOX_W}
          height={BOX_H}
          rx={14}
          fill="var(--color-surface-2)"
          animate={{ stroke: s === 0 ? 'var(--color-accent)' : 'var(--color-border)', strokeWidth: s === 0 ? 2.5 : 1.5 }}
          transition={{ duration: 0.25 }}
        />
        <text x={MAIN_X + BOX_W / 2} y={MAIN_Y + 26} textAnchor="middle" fontFamily="var(--font-display)" fontSize={17} fontWeight={700} fill="var(--color-fg)">
          Main agent
        </text>
        {/* Busy context scribbles */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={MAIN_X + 14}
            y={MAIN_Y + 44 + i * 16}
            width={[80, 110, 60, 95, 70, 50][i]}
            height={8}
            rx={3}
            fill="var(--color-border)"
            opacity={0.7}
          />
        ))}
        <text x={MAIN_X + BOX_W / 2} y={MAIN_Y + BOX_H - 10} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11.5} fill="var(--color-fg-muted)">
          context: busy
        </text>
      </g>

      {/* ── Dispatch arrow (step 1) ── */}
      <RevealGroup show={s >= 1} dim={0}>
        <motion.path
          d={`M ${MAIN_X + BOX_W + 4} ${MID_Y - 18} L ${SUB_X - 4} ${MID_Y - 18}`}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2.2}
          strokeLinecap="round"
          markerEnd="url(#sa-arrow-fwd)"
          initial={false}
          animate={{ pathLength: s >= 1 ? 1 : 0, opacity: s >= 1 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <text x={320} y={MID_Y - 26} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-subtle)">
          task + prompt
        </text>
      </RevealGroup>

      {/* ── Summary arrow back (step 3) ── */}
      <RevealGroup show={s >= 3} dim={0}>
        <motion.path
          d={`M ${SUB_X - 4} ${MID_Y + 18} L ${MAIN_X + BOX_W + 4} ${MID_Y + 18}`}
          fill="none"
          stroke="var(--color-accent-2, var(--color-accent))"
          strokeWidth={2.2}
          strokeLinecap="round"
          markerEnd="url(#sa-arrow-back)"
          initial={false}
          animate={{ pathLength: s >= 3 ? 1 : 0, opacity: s >= 3 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <text x={320} y={MID_Y + 34} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12} fontWeight={600} fill="var(--color-accent-2, var(--color-accent))">
          summary only
        </text>
      </RevealGroup>

      {/* ── Subagent box (step 1) ── */}
      <RevealGroup show={s >= 1} dim={0}>
        <g onClick={() => goToStep(2)} style={{ cursor: 'pointer' }}>
          <motion.rect
            x={SUB_X}
            y={SUB_Y}
            width={BOX_W}
            height={BOX_H}
            rx={14}
            fill="var(--color-surface-2)"
            animate={{ stroke: s === 2 ? 'var(--color-accent)' : 'var(--color-border)', strokeWidth: s === 2 ? 2.5 : 1.5 }}
            transition={{ duration: 0.25 }}
          />
          <text x={SUB_X + BOX_W / 2} y={SUB_Y + 26} textAnchor="middle" fontFamily="var(--font-display)" fontSize={17} fontWeight={700} fill="var(--color-fg)">
            Subagent
          </text>

          {/* Fresh context (mostly empty, with just the task) */}
          <rect x={SUB_X + 14} y={SUB_Y + 44} width={60} height={8} rx={3} fill="var(--color-accent)" opacity={0.4} />
          <text x={SUB_X + 80} y={SUB_Y + 51} dominantBaseline="middle" fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-fg-muted)">task</text>

          {/* Working indicator (step 2) */}
          {s === 2 && (
            <>
              <rect x={SUB_X + 14} y={SUB_Y + 64} width={96} height={8} rx={3} fill="var(--color-border)" opacity={0.6} />
              <rect x={SUB_X + 14} y={SUB_Y + 80} width={70} height={8} rx={3} fill="var(--color-border)" opacity={0.6} />
              <rect x={SUB_X + 14} y={SUB_Y + 96} width={112} height={8} rx={3} fill="var(--color-border)" opacity={0.5} />
              <text x={SUB_X + BOX_W / 2} y={SUB_Y + BOX_H - 18} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11.5} fill="var(--color-accent)">
                working...
              </text>
            </>
          )}

          <text x={SUB_X + BOX_W / 2} y={SUB_Y + BOX_H - 10} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11.5} fill="var(--color-fg-muted)">
            {s < 2 ? 'fresh context' : s === 2 ? '' : 'done'}
          </text>
        </g>
      </RevealGroup>

      {/* ── Bottom caption ── */}
      <RevealGroup show={s >= 3} dim={0}>
        <text
          x={320}
          y={246}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={13.5}
          fontWeight={600}
          fill="var(--color-accent)"
        >
          All the intermediate noise stays in the subagent · only the answer crosses back
        </text>
      </RevealGroup>

      {/* Step 0 caption */}
      {s === 0 && (
        <text x={320} y={246} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13.5} fill="var(--color-fg-subtle)">
          The main agent's context is already full — side work would make it worse
        </text>
      )}
    </svg>
  );
}
