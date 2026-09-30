import { motion } from 'framer-motion';
import type { DiagramProps } from '@/diagrams/types';

const W = 680;
const COL_W = 300;
const COL_H = 150;
const GAP = 40;
const START_X = 20;
const START_Y = 24;
const RIGHT_X = START_X + COL_W + GAP;
const BANNER_Y = START_Y + COL_H + 26;

/**
 * Allow-vs-deny focal visual: two lanes (green "runs silently" allow lane and a
 * red locked "never runs" deny door) with a banner asserting deny always wins.
 * Step 0 spotlights allow, step 1 spotlights deny, step >= 2 asserts precedence.
 */
export function AllowVsDenyDiagram({ step }: DiagramProps) {
  const allowActive = step === 0 || step >= 2;
  const denyActive = step >= 1;

  return (
    <svg
      viewBox={`0 0 ${W} ${BANNER_Y + 40}`}
      role="img"
      aria-label="Allow lane runs silently; deny door never opens; deny always beats allow"
      className="w-full h-auto"
    >
      {/* ALLOW lane */}
      <motion.g
        initial={false}
        animate={{ opacity: allowActive ? 1 : 0.5 }}
        transition={{ duration: 0.35 }}
      >
        <rect
          x={START_X}
          y={START_Y}
          width={COL_W}
          height={COL_H}
          rx={12}
          fill="var(--color-surface-2)"
          stroke={allowActive ? 'var(--color-success, #34d399)' : 'var(--color-border)'}
          strokeWidth={allowActive ? 2.5 : 1.5}
        />
        <text
          x={START_X + 20}
          y={START_Y + 34}
          fontFamily="var(--font-display)"
          fontSize={20}
          fontWeight={700}
          fill="var(--color-fg)"
        >
          ✅ allow
        </text>
        <text
          x={START_X + 20}
          y={START_Y + 62}
          fontFamily="var(--font-sans)"
          fontSize={14}
          fill="var(--color-fg-muted)"
        >
          Runs silently — no stopping to ask.
        </text>
        <text
          x={START_X + 20}
          y={START_Y + 100}
          fontFamily="var(--font-mono)"
          fontSize={13}
          fill="var(--color-fg)"
        >
          Write:src/**
        </text>
        <text
          x={START_X + 20}
          y={START_Y + 122}
          fontFamily="var(--font-mono)"
          fontSize={13}
          fill="var(--color-fg)"
        >
          Bash:npm test
        </text>
      </motion.g>

      {/* DENY door */}
      <motion.g
        initial={false}
        animate={{ opacity: denyActive ? 1 : 0.5 }}
        transition={{ duration: 0.35 }}
      >
        <rect
          x={RIGHT_X}
          y={START_Y}
          width={COL_W}
          height={COL_H}
          rx={12}
          fill="var(--color-surface-2)"
          stroke={denyActive ? 'var(--color-accent)' : 'var(--color-border)'}
          strokeWidth={denyActive ? 2.5 : 1.5}
        />
        <text
          x={RIGHT_X + 20}
          y={START_Y + 34}
          fontFamily="var(--font-display)"
          fontSize={20}
          fontWeight={700}
          fill="var(--color-fg)"
        >
          🚫 deny
        </text>
        <text
          x={RIGHT_X + 20}
          y={START_Y + 62}
          fontFamily="var(--font-sans)"
          fontSize={14}
          fill="var(--color-fg-muted)"
        >
          A fire door — never runs, no key overrides.
        </text>
        <text
          x={RIGHT_X + 20}
          y={START_Y + 100}
          fontFamily="var(--font-mono)"
          fontSize={13}
          fill="var(--color-fg)"
        >
          Bash:npm run deploy
        </text>
        <text
          x={RIGHT_X + 20}
          y={START_Y + 122}
          fontFamily="var(--font-mono)"
          fontSize={13}
          fill="var(--color-fg)"
        >
          Write:.env*
        </text>
      </motion.g>

      {/* Deny-wins banner */}
      <motion.g
        initial={false}
        animate={{ opacity: step >= 2 ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
      >
        <rect
          x={START_X + 80}
          y={BANNER_Y}
          width={W - START_X * 2 - 160}
          height={28}
          rx={6}
          fill="var(--color-accent)"
          opacity={0.15}
        />
        <text
          x={W / 2}
          y={BANNER_Y + 18}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={13}
          fontWeight={700}
          fill="var(--color-accent)"
          letterSpacing="0.02em"
        >
          Deny always beats allow — the order never flips
        </text>
      </motion.g>
    </svg>
  );
}
