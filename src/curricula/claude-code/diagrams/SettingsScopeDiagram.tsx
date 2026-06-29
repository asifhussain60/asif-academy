import { motion } from 'framer-motion';
import type { DiagramProps } from '@/diagrams/types';

interface ScopeLayer {
  label: string;
  file: string;
  note: string;
}

const LAYERS: ScopeLayer[] = [
  { label: 'Enterprise', file: 'admin policy', note: 'Highest precedence — admin-managed' },
  { label: 'Project', file: '.claude/settings.json', note: 'Travels with the repo' },
  { label: 'User', file: '~/.claude/settings.json', note: 'Personal defaults, all projects' },
  { label: 'Global Default', file: 'built-in baseline', note: 'Lowest precedence for allow' },
];

const W = 680;
const ROW_H = 52;
const GAP = 10;
const START_X = 20;
const ROW_W = W - START_X * 2;
const START_Y = 30;

function rowY(i: number) {
  return START_Y + i * (ROW_H + GAP);
}

export function SettingsScopeDiagram({ step }: DiagramProps) {
  const totalH = LAYERS.length * ROW_H + (LAYERS.length - 1) * GAP;
  const denyBannerY = START_Y + totalH + 20;

  return (
    <svg
      viewBox={`0 0 ${W} ${denyBannerY + 34}`}
      role="img"
      aria-label="Four-scope settings hierarchy: Enterprise, Project, User, Global Default — deny at any layer wins everywhere"
      className="w-full h-auto"
    >
      {/* Precedence arrow on the left */}
      <defs>
        <marker id="sp-arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L0,8 L8,4 z" fill="var(--color-fg-muted)" />
        </marker>
      </defs>
      <line
        x1={12}
        y1={START_Y + totalH}
        x2={12}
        y2={START_Y + 4}
        stroke="var(--color-fg-muted)"
        strokeWidth={2}
        markerEnd="url(#sp-arr)"
        opacity={0.5}
      />
      <text
        x={8}
        y={START_Y + totalH + 14}
        fontFamily="var(--font-sans)"
        fontSize={10}
        fill="var(--color-fg-muted)"
        fontWeight={600}
        letterSpacing="0.06em"
        textAnchor="middle"
        transform={`rotate(-90, 8, ${START_Y + totalH / 2})`}
      >
        ALLOW PRECEDENCE ▲
      </text>

      {LAYERS.map((layer, i) => {
        const y = rowY(i);
        const isActive = step > 0;
        const isFaded = step > 0 && i > 0 && step < i + 1;

        return (
          <motion.g
            key={layer.label}
            initial={false}
            animate={{ opacity: isFaded ? 0.4 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <rect
              x={START_X}
              y={y}
              width={ROW_W}
              height={ROW_H}
              rx={10}
              fill="var(--color-surface-2)"
              stroke={isActive && i === 0 ? 'var(--color-accent)' : 'var(--color-border)'}
              strokeWidth={isActive && i === 0 ? 2 : 1.5}
            />
            {/* Layer label */}
            <text
              x={START_X + 18}
              y={y + ROW_H / 2 - 6}
              fontFamily="var(--font-display)"
              fontSize={16}
              fontWeight={700}
              fill="var(--color-fg)"
            >
              {layer.label}
            </text>
            {/* File path */}
            <text
              x={START_X + 18}
              y={y + ROW_H / 2 + 12}
              fontFamily="var(--font-mono)"
              fontSize={12}
              fill="var(--color-fg-muted)"
            >
              {layer.file}
            </text>
            {/* Note on the right */}
            <text
              x={START_X + ROW_W - 18}
              y={y + ROW_H / 2 + 5}
              textAnchor="end"
              fontFamily="var(--font-sans)"
              fontSize={12}
              fill="var(--color-fg-muted)"
            >
              {layer.note}
            </text>
          </motion.g>
        );
      })}

      {/* Deny-wins banner */}
      <motion.g
        initial={false}
        animate={{ opacity: step >= 2 ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
      >
        <rect
          x={START_X + 60}
          y={denyBannerY}
          width={ROW_W - 120}
          height={26}
          rx={6}
          fill="var(--color-accent)"
          opacity={0.15}
        />
        <text
          x={W / 2}
          y={denyBannerY + 17}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={13}
          fontWeight={700}
          fill="var(--color-accent)"
          letterSpacing="0.02em"
        >
          DENY at any layer blocks everywhere below — deny always wins
        </text>
      </motion.g>
    </svg>
  );
}
