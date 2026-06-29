import { motion } from 'framer-motion';
import { useDeckControls } from '@/app/DeckControls';
import { RevealGroup } from '@/diagrams/primitives/RevealGroup';
import type { DiagramProps } from '@/diagrams/types';

interface CardDef {
  key: string;
  title: string;
  sub: string;
}

/** What sits on the agent's "desk" at once — revealed one per step as the window fills. */
const CARDS: CardDef[] = [
  { key: 'request', title: 'Your request', sub: 'what you asked for' },
  { key: 'files', title: 'Open files', sub: 'the code it has read' },
  { key: 'memory', title: 'CLAUDE.md', sub: 'its standing memory' },
  { key: 'tools', title: 'Tool output', sub: 'results of what it ran' },
];

const FRAME_X = 40;
const FRAME_Y = 22;
const FRAME_W = 470;
const FRAME_H = 208;
const CARD_X = FRAME_X + 18;
const CARD_W = FRAME_W - 36;
const CARD_H = 38;
const CARD_GAP = 10;
const CARD_TOP = FRAME_Y + 30;

const GAUGE_X = 540;

/**
 * The context window: everything the agent can see at once, inside one finite frame. Each step adds
 * another thing to the "desk" and raises the fill gauge, landing the idea that the window fills up.
 * Clicking a card sets the slide step (drives /present).
 */
export function ContextWindowDiagram({ step }: DiagramProps) {
  const { goToStep } = useDeckControls();
  const sel = Math.min(Math.max(step, 0), CARDS.length - 1);
  const fill = (sel + 1) / CARDS.length;

  return (
    <svg viewBox="0 0 620 280" role="img" aria-label="The context window: a finite frame holding everything the agent can see at once" className="w-full h-auto">
      {/* The finite frame — the context window */}
      <rect x={FRAME_X} y={FRAME_Y} width={FRAME_W} height={FRAME_H} rx={16} fill="var(--color-surface-2)" stroke="var(--color-border)" strokeWidth={1.6} strokeDasharray="7 6" />
      <text x={FRAME_X + 16} y={FRAME_Y - 8} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-fg-subtle)">
        the context window — what it can see at once
      </text>

      {CARDS.map((c, i) => {
        const y = CARD_TOP + i * (CARD_H + CARD_GAP);
        const lit = sel === i;
        return (
          <RevealGroup key={c.key} show={sel >= i} dim={0.18}>
            <g transform={`translate(${CARD_X}, ${y})`} onClick={() => goToStep(i)} style={{ cursor: 'pointer' }}>
              <motion.rect
                width={CARD_W}
                height={CARD_H}
                rx={9}
                fill={lit ? 'var(--color-accent-soft)' : 'var(--color-surface)'}
                animate={{ stroke: lit ? 'var(--color-accent)' : 'var(--color-border)', strokeWidth: lit ? 2.2 : 1.3 }}
                transition={{ duration: 0.25 }}
              />
              <text x={16} y={CARD_H / 2 + 1} dominantBaseline="middle" fontFamily="var(--font-display)" fontSize={16} fontWeight={600} fill="var(--color-fg)">
                {c.title}
              </text>
              <text x={CARD_W - 16} y={CARD_H / 2 + 1} dominantBaseline="middle" textAnchor="end" fontFamily="var(--font-sans)" fontSize={12.5} fill="var(--color-fg-muted)">
                {c.sub}
              </text>
            </g>
          </RevealGroup>
        );
      })}

      {/* fill gauge — shows the window filling up */}
      <text x={GAUGE_X + 21} y={FRAME_Y - 8} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} fill="var(--color-fg-subtle)">
        full
      </text>
      <rect x={GAUGE_X} y={FRAME_Y} width={42} height={FRAME_H} rx={10} fill="var(--color-surface-2)" stroke="var(--color-border)" strokeWidth={1.4} />
      <motion.rect
        x={GAUGE_X + 4}
        width={34}
        rx={7}
        fill="var(--color-accent)"
        initial={false}
        animate={{ height: fill * (FRAME_H - 8), y: FRAME_Y + 4 + (1 - fill) * (FRAME_H - 8) }}
        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
      />

      <text x={310} y={272} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={14} fontWeight={600} fill="var(--color-accent)">
        It all shares one finite frame — so it fills up as work piles on.
      </text>
    </svg>
  );
}
