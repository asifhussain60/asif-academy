import { motion } from 'framer-motion';
import { useDeckControls } from '@/app/DeckControls';
import type { DiagramProps } from '@/diagrams/types';

type GlyphKind = 'observe' | 'think' | 'act';

interface NodeDef {
  x: number;
  key: string;
  title: string;
  sub: string;
  glyph: GlyphKind;
}

// Generous spacing: wide gaps between tiles, a deep loop arc, and room below for its caption.
const NODE_W = 184;
const NODE_H = 120;
const NODE_Y = 24;
const MID = NODE_Y + NODE_H / 2;
const GAP = 44;
const X0 = 24;
const X1 = X0 + NODE_W + GAP; // 252
const X2 = X1 + NODE_W + GAP; // 480

const NODES: NodeDef[] = [
  { x: X0, key: 'observe', title: 'Observe', sub: 'read the situation', glyph: 'observe' },
  { x: X1, key: 'think', title: 'Think', sub: 'pick the next step', glyph: 'think' },
  { x: X2, key: 'act', title: 'Act', sub: 'use a tool', glyph: 'act' },
];

function NodeGlyph({ kind }: { kind: GlyphKind }) {
  const s = 'var(--color-accent-contrast)';
  if (kind === 'observe')
    return (
      <g stroke={s} strokeWidth={1.7} fill="none" strokeLinecap="round">
        <path d="M-7.5 0 Q0 -6 7.5 0 Q0 6 -7.5 0 Z" />
        <circle cx={0} cy={0} r={2.3} fill={s} stroke="none" />
      </g>
    );
  if (kind === 'think') return <path d="M0 -8 L1.8 -1.8 L8 0 L1.8 1.8 L0 8 L-1.8 1.8 L-8 0 L-1.8 -1.8 Z" fill={s} />;
  return <path d="M1.6 -8 L-4.8 1 L0 1 L-1.6 8 L4.8 -1 L0 -1 Z" fill={s} />;
}

function LoopNode({ node, i, selected, onClick }: { node: NodeDef; i: number; selected: boolean; onClick: () => void }) {
  // Outer <g> owns the (x, y) position via the transform ATTRIBUTE; the inner motion.g animates
  // opacity/y, so framer-motion's transform never clobbers the tile's position.
  return (
    <g transform={`translate(${node.x}, ${NODE_Y})`} onClick={onClick} style={{ cursor: 'pointer' }}>
      <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.12, duration: 0.4 }}>
        <motion.rect
          width={NODE_W}
          height={NODE_H}
          rx={16}
          animate={{ stroke: selected ? 'var(--color-accent)' : 'var(--color-border)', strokeWidth: selected ? 2.5 : 1.5 }}
          transition={{ duration: 0.25 }}
          fill="var(--color-surface-2)"
        />
        {selected && <rect width={NODE_W} height={NODE_H} rx={16} fill="var(--color-accent-soft)" />}
        <g transform={`translate(${NODE_W / 2}, 32)`}>
          <circle r={17} fill="var(--color-accent)" />
          <NodeGlyph kind={node.glyph} />
        </g>
        <text x={NODE_W / 2} y={80} textAnchor="middle" fontFamily="var(--font-display)" fontSize={23} fontWeight={600} fill="var(--color-fg)">
          {node.title}
        </text>
        <text x={NODE_W / 2} y={102} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={14} fill="var(--color-fg-muted)">
          {node.sub}
        </text>
      </motion.g>
    </g>
  );
}

/** Step-gated connector: draws in when `show` becomes true, retracts when false. */
function Arrow({ d, show }: { d: string; show: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth={2.8}
      strokeLinecap="round"
      markerEnd="url(#cc-arrowhead)"
      initial={false}
      animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    />
  );
}

/**
 * The agentic loop: Observe → Think → Act, looping until done. Reveals progressively so each beat
 * gets its own moment: the connector arrows appear as you reach Think and Act, and the LOOP-BACK
 * arc appears only at the final step (after Act) — so the presenter can pause and talk about the
 * loop on its own. Clicking a tile (or pressing →) drives the slide step and the /present window.
 */
export function AgenticLoopDiagram({ step }: DiagramProps) {
  const { goToStep } = useDeckControls();
  const selected = Math.min(Math.max(step, 0), 2);
  const showLoop = step >= 3;

  return (
    <svg viewBox="0 0 688 308" role="img" aria-label="The agentic loop: observe, think, act, repeating until done" className="w-full h-auto">
      <defs>
        <marker id="cc-arrowhead" markerWidth={9} markerHeight={9} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {NODES.map((n, i) => (
        <LoopNode key={n.key} node={n} i={i} selected={selected === i} onClick={() => goToStep(i)} />
      ))}

      {/* inter-tile connectors, inset from the tile edges for breathing room */}
      <Arrow d={`M${X0 + NODE_W + 6} ${MID} L${X1 - 6} ${MID}`} show={step >= 1} />
      <Arrow d={`M${X1 + NODE_W + 6} ${MID} L${X2 - 6} ${MID}`} show={step >= 2} />

      {/* loop-back arc — appears only at the final step so it can be spoken to on its own */}
      <Arrow d={`M${X2 + NODE_W / 2} ${NODE_Y + NODE_H + 8} C ${X2 + NODE_W / 2} 268, ${X0 + NODE_W / 2} 268, ${X0 + NODE_W / 2} ${NODE_Y + NODE_H + 8}`} show={showLoop} />
      <motion.text
        x={344}
        y={296}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={14}
        fontWeight={600}
        fill="var(--color-accent)"
        initial={false}
        animate={{ opacity: showLoop ? 1 : 0 }}
        transition={{ duration: 0.3, delay: showLoop ? 0.25 : 0 }}
      >
        …until the goal is met
      </motion.text>
    </svg>
  );
}
