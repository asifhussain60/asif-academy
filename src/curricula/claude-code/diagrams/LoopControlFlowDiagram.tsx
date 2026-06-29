import { motion } from 'framer-motion';
import { useDeckControls } from '@/app/DeckControls';
import { RevealGroup } from '@/diagrams/primitives/RevealGroup';
import type { DiagramProps } from '@/diagrams/types';

/**
 * "When does it stop?": the loop's single exit condition. Each turn produces EITHER another tool
 * call (→ run it, observe, loop back) OR a final text answer (→ done). The reveal builds the turn,
 * then the decision, then the two outcomes. Clicking a stage (or pressing →) sets the slide step.
 *
 * Layout note: generous margins inside the viewBox give the flow breathing room, and the dotted
 * loop-back routes up and over the top to re-enter "A turn" from above — it crosses nothing.
 *
 * Steps: 0 the turn · 1 the question · 2 the "tool call → loop" path · 3 the "answer → done" path.
 */
export function LoopControlFlowDiagram({ step }: DiagramProps) {
  const { goToStep } = useDeckControls();
  const s = Math.min(Math.max(step, 0), 3);

  return (
    <svg viewBox="0 0 740 380" role="img" aria-label="A turn either emits a tool call and loops, or a final answer and stops" className="w-full h-auto">
      <defs>
        <marker id="cc-flow-arrow" markerWidth={9} markerHeight={9} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-accent)" />
        </marker>
        <marker id="cc-flow-arrow-dim" markerWidth={9} markerHeight={9} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-fg-subtle)" />
        </marker>
      </defs>

      {/* The turn */}
      <g transform="translate(60, 176)" onClick={() => goToStep(0)} style={{ cursor: 'pointer' }}>
        <rect width={150} height={68} rx={14} fill="var(--color-surface-2)" stroke="var(--color-accent)" strokeWidth={s === 0 ? 2.5 : 1.5} />
        <text x={75} y={30} textAnchor="middle" fontFamily="var(--font-display)" fontSize={19} fontWeight={600} fill="var(--color-fg)">
          A turn
        </text>
        <text x={75} y={50} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12.5} fill="var(--color-fg-muted)">
          the model responds
        </text>
      </g>

      {/* Decision diamond */}
      <RevealGroup show={s >= 1} dim={0.2}>
        <g transform="translate(370, 210)" onClick={() => goToStep(1)} style={{ cursor: 'pointer' }}>
          <path
            d="M0 -58 L90 0 L0 58 L-90 0 Z"
            fill="var(--color-surface-2)"
            stroke={s === 1 ? 'var(--color-accent)' : 'var(--color-border)'}
            strokeWidth={s === 1 ? 2.5 : 1.5}
          />
          <text x={0} y={-6} textAnchor="middle" fontFamily="var(--font-display)" fontSize={17} fontWeight={600} fill="var(--color-fg)">
            Did it call
          </text>
          <text x={0} y={15} textAnchor="middle" fontFamily="var(--font-display)" fontSize={17} fontWeight={600} fill="var(--color-fg)">
            a tool?
          </text>
        </g>
        <motion.path
          d="M210 210 L276 210"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2.4}
          markerEnd="url(#cc-flow-arrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4 }}
        />
      </RevealGroup>

      {/* YES → run tool → loop back */}
      <RevealGroup show={s >= 2} dim={0.18}>
        <text x={370} y={116} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fontWeight={700} fill="var(--color-accent)">
          YES — keep going
        </text>
        <g transform="translate(516, 104)">
          <rect width={158} height={64} rx={14} fill="var(--color-surface-2)" stroke="var(--color-accent)" strokeWidth={1.6} />
          <text x={79} y={28} textAnchor="middle" fontFamily="var(--font-display)" fontSize={17} fontWeight={600} fill="var(--color-fg)">
            Run it · observe
          </text>
          <text x={79} y={48} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-muted)">
            then loop back
          </text>
        </g>
        {/* diamond top → up → into the run-it box from its left side */}
        <path d="M370 152 L370 142 Q370 136 378 136 L516 136" fill="none" stroke="var(--color-accent)" strokeWidth={2.2} markerEnd="url(#cc-flow-arrow)" />
        {/* run-it box → up, over the top, down into the turn from above */}
        <path
          d="M550 104 C 550 64, 135 64, 135 176"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2.2}
          strokeDasharray="2 7"
          strokeLinecap="round"
          markerEnd="url(#cc-flow-arrow)"
        />
      </RevealGroup>

      {/* NO → final answer → done */}
      <RevealGroup show={s >= 3} dim={0.18}>
        <text x={370} y={292} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fontWeight={700} fill="var(--color-fg-muted)">
          NO — final text answer
        </text>
        <g transform="translate(540, 276)">
          <rect width={132} height={64} rx={14} fill="var(--color-accent)" />
          <text x={66} y={30} textAnchor="middle" fontFamily="var(--font-display)" fontSize={19} fontWeight={700} fill="var(--color-accent-contrast)">
            Done ✓
          </text>
          <text x={66} y={49} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11.5} fill="var(--color-accent-contrast)" opacity={0.85}>
            no tool = job complete
          </text>
        </g>
        <path d="M370 268 L370 300 Q370 308 380 308 L540 308" fill="none" stroke="var(--color-fg-subtle)" strokeWidth={2} markerEnd="url(#cc-flow-arrow-dim)" />
      </RevealGroup>
    </svg>
  );
}
