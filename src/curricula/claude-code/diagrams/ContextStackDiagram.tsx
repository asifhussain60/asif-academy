import { motion } from 'framer-motion';
import { useDeckControls } from '@/app/DeckControls';
import { RevealGroup } from '@/diagrams/primitives/RevealGroup';
import type { DiagramProps } from '@/diagrams/types';

type SurfaceKind = 'cli' | 'ide' | 'desktop' | 'web';

interface SurfaceDef {
  key: SurfaceKind;
  title: string;
  sub: string;
}

const CARD_W = 150;
const CARD_H = 96;
const CARD_Y = 168;
const GAP = 22;
const TOTAL_W = 4 * CARD_W + 3 * GAP; // 666
const X0 = (680 - TOTAL_W) / 2; // 7

const SURFACES: SurfaceDef[] = [
  { key: 'cli', title: 'Terminal', sub: 'the CLI' },
  { key: 'ide', title: 'IDE', sub: 'VS Code · JetBrains' },
  { key: 'desktop', title: 'Desktop', sub: 'Mac · Windows' },
  { key: 'web', title: 'Web', sub: 'claude.ai/code' },
];

function cardX(i: number) {
  return X0 + i * (CARD_W + GAP);
}

function SurfaceGlyph({ kind }: { kind: SurfaceKind }) {
  const s = 'var(--color-accent)';
  if (kind === 'cli')
    return (
      <g stroke={s} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-7 -5 L-1 0 L-7 5" />
        <path d="M1 5 L7 5" />
      </g>
    );
  if (kind === 'ide')
    return (
      <g stroke={s} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-3 -6 L-9 0 L-3 6" />
        <path d="M3 -6 L9 0 L3 6" />
      </g>
    );
  if (kind === 'desktop')
    return (
      <g stroke={s} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x={-9} y={-7} width={18} height={13} rx={2} />
        <path d="M-4 10 L4 10" />
        <path d="M0 6 L0 10" />
      </g>
    );
  return (
    <g stroke={s} strokeWidth={1.6} fill="none">
      <circle cx={0} cy={0} r={9} />
      <ellipse cx={0} cy={0} rx={3.6} ry={9} />
      <path d="M-9 0 L9 0" />
    </g>
  );
}

function SurfaceCard({ def, i, lit, onClick }: { def: SurfaceDef; i: number; lit: boolean; onClick: () => void }) {
  const x = cardX(i);
  return (
    <g transform={`translate(${x}, ${CARD_Y})`} onClick={onClick} style={{ cursor: 'pointer' }}>
      <motion.rect
        width={CARD_W}
        height={CARD_H}
        rx={14}
        fill="var(--color-surface-2)"
        animate={{ stroke: lit ? 'var(--color-accent)' : 'var(--color-border)', strokeWidth: lit ? 2.5 : 1.5 }}
        transition={{ duration: 0.25 }}
      />
      {lit && <rect width={CARD_W} height={CARD_H} rx={14} fill="var(--color-accent-soft)" />}
      <g transform={`translate(${CARD_W / 2}, 30)`}>
        <SurfaceGlyph kind={def.key} />
      </g>
      <text x={CARD_W / 2} y={62} textAnchor="middle" fontFamily="var(--font-display)" fontSize={19} fontWeight={600} fill="var(--color-fg)">
        {def.title}
      </text>
      <text x={CARD_W / 2} y={82} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11.5} fill="var(--color-fg-subtle)">
        {def.sub}
      </text>
    </g>
  );
}

/**
 * "Where it runs": one agent core, four surfaces. Each step lights a surface and draws its
 * connector down from the shared core — driving home that it is the *same* agent everywhere,
 * not four different products. Clicking a surface (or pressing →) sets the slide step.
 */
export function ContextStackDiagram({ step }: DiagramProps) {
  const { goToStep } = useDeckControls();
  const selected = Math.min(Math.max(step, 0), SURFACES.length - 1);
  const coreCx = 340;
  const coreBottom = 96;

  return (
    <svg viewBox="0 0 680 290" role="img" aria-label="One agent, four surfaces: terminal, IDE, desktop, and web" className="w-full h-auto">
      {/* Core: the same agent */}
      <g transform="translate(240, 26)">
        <rect width={200} height={70} rx={16} fill="var(--color-accent)" />
        <text x={100} y={31} textAnchor="middle" fontFamily="var(--font-display)" fontSize={20} fontWeight={600} fill="var(--color-accent-contrast)">
          The same agent
        </text>
        <text x={100} y={51} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12.5} fill="var(--color-accent-contrast)" opacity={0.85}>
          one model · one loop
        </text>
      </g>

      {/* Connectors + cards, revealed per step */}
      {SURFACES.map((def, i) => {
        const x = cardX(i) + CARD_W / 2;
        const show = selected >= i;
        return (
          <RevealGroup key={def.key} show={show} dim={0.22}>
            <path
              d={`M${coreCx} ${coreBottom} C ${coreCx} 140, ${x} 130, ${x} ${CARD_Y}`}
              fill="none"
              stroke={selected === i ? 'var(--color-accent)' : 'var(--color-border)'}
              strokeWidth={selected === i ? 2.4 : 1.5}
            />
            <SurfaceCard def={def} i={i} lit={selected === i} onClick={() => goToStep(i)} />
          </RevealGroup>
        );
      })}
    </svg>
  );
}
