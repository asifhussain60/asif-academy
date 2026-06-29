import { motion } from 'framer-motion';
import { useDeckControls } from '@/app/DeckControls';
import { RevealGroup } from '@/diagrams/primitives/RevealGroup';
import type { DiagramProps } from '@/diagrams/types';

interface ModelDef {
  key: string;
  name: string;
  tier: string;
  good: string;
}

/** Left → right along a speed-vs-depth spectrum: faster/lighter → deeper/more capable. */
const MODELS: ModelDef[] = [
  { key: 'haiku', name: 'Haiku 4.5', tier: 'Fast & light', good: 'Quick, well-scoped tasks where speed and cost matter most.' },
  { key: 'sonnet', name: 'Sonnet 4.6', tier: 'The daily driver', good: 'The balanced default for most coding and everyday work.' },
  { key: 'opus', name: 'Opus 4.8', tier: 'Deep reasoning', good: 'Hard, multi-step problems and long autonomous runs.' },
  { key: 'fable', name: 'Fable 5', tier: 'Frontier', good: 'The hardest, longest problems: most capable, and priciest.' },
];

const CARD_W = 150;
const CARD_H = 94;
const GAP = 28;
const X0 = 26;
const TOP = 26;
const AXIS_Y = TOP + CARD_H + 26;
const W = X0 * 2 + MODELS.length * CARD_W + (MODELS.length - 1) * GAP; // 736

/**
 * The model lineup as a speed-vs-depth spectrum. Each step lights the next model left→right and
 * shows what it's for, so the presenter can walk the room through one model at a time. Clicking a
 * card (or pressing →) sets the slide step and drives the /present window.
 */
export function ModelLineupDiagram({ step }: DiagramProps) {
  const { goToStep } = useDeckControls();
  const sel = Math.min(Math.max(step, 0), MODELS.length - 1);

  return (
    <svg viewBox={`0 0 ${W} 252`} role="img" aria-label="The Claude model lineup on a speed-versus-depth spectrum" className="w-full h-auto">
      <defs>
        <marker id="cc-lineup-arrow" markerWidth={9} markerHeight={9} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-fg-subtle)" />
        </marker>
      </defs>

      {/* spectrum axis beneath the cards */}
      <line x1={X0} y1={AXIS_Y} x2={W - X0} y2={AXIS_Y} stroke="var(--color-border)" strokeWidth={1.6} markerEnd="url(#cc-lineup-arrow)" />
      <text x={X0} y={AXIS_Y + 20} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-fg-subtle)">
        faster · lighter · cheaper
      </text>
      <text x={W - X0} y={AXIS_Y + 20} textAnchor="end" fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-fg-subtle)">
        deeper · more capable
      </text>

      {MODELS.map((m, i) => {
        const x = X0 + i * (CARD_W + GAP);
        const lit = sel === i;
        return (
          <RevealGroup key={m.key} show={sel >= i} dim={0.25}>
            <g transform={`translate(${x}, ${TOP})`} onClick={() => goToStep(i)} style={{ cursor: 'pointer' }}>
              <motion.rect
                width={CARD_W}
                height={CARD_H}
                rx={14}
                fill={lit ? 'var(--color-accent-soft)' : 'var(--color-surface-2)'}
                animate={{ stroke: lit ? 'var(--color-accent)' : 'var(--color-border)', strokeWidth: lit ? 2.5 : 1.5 }}
                transition={{ duration: 0.25 }}
              />
              {/* connector from the card down to the axis */}
              <line x1={CARD_W / 2} y1={CARD_H} x2={CARD_W / 2} y2={AXIS_Y - TOP} stroke={lit ? 'var(--color-accent)' : 'var(--color-border)'} strokeWidth={lit ? 2 : 1.2} />
              <circle cx={CARD_W / 2} cy={AXIS_Y - TOP} r={lit ? 5 : 3.5} fill={lit ? 'var(--color-accent)' : 'var(--color-border)'} />
              <text x={CARD_W / 2} y={42} textAnchor="middle" fontFamily="var(--font-display)" fontSize={21} fontWeight={600} fill="var(--color-fg)">
                {m.name}
              </text>
              <text x={CARD_W / 2} y={68} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13.5} fill="var(--color-fg-muted)">
                {m.tier}
              </text>
            </g>
          </RevealGroup>
        );
      })}

      {/* "good for" caption for the currently-lit model */}
      <motion.text
        key={MODELS[sel].key}
        x={W / 2}
        y={AXIS_Y + 52}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={15.5}
        fontWeight={600}
        fill="var(--color-accent)"
        initial={{ opacity: 0, y: AXIS_Y + 58 }}
        animate={{ opacity: 1, y: AXIS_Y + 52 }}
        transition={{ duration: 0.3 }}
      >
        {MODELS[sel].good}
      </motion.text>
    </svg>
  );
}
