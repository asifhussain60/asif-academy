import { motion } from 'framer-motion';
import { useDeckControls } from '@/app/DeckControls';
import type { DiagramProps } from '@/diagrams/types';

interface Mode {
  key: string;
  label: string;
  sub: string;
  kbd: string;
  /** Which slide step activates this row's highlight */
  activeStep: number;
}

const MODES: Mode[] = [
  { key: 'ask',    label: 'Ask permissions',    sub: 'Stops before every tool call to ask you',        kbd: '1', activeStep: 1 },
  { key: 'accept', label: 'Accept edits',        sub: 'File writes auto-accepted; commands still ask',  kbd: '2', activeStep: 1 },
  { key: 'plan',   label: 'Plan mode',           sub: 'Read-only exploration — no writes until approved', kbd: '3', activeStep: 2 },
  { key: 'auto',   label: 'Auto mode',           sub: 'Runs fully without stopping — best for real work', kbd: '4', activeStep: 3 },
  { key: 'bypass', label: 'Bypass permissions',  sub: 'Skips all permission checks — use with care',   kbd: '5', activeStep: 3 },
];

const BOX_W = 480;
const BOX_H = 54;
const GAP = 12;
const START_X = (700 - BOX_W) / 2; // 110
const START_Y = 48;
const BAR_X = START_X - 24;
const BAR_W = 8;
const TOTAL_H = MODES.length * BOX_H + (MODES.length - 1) * GAP;

function rowY(i: number) {
  return START_Y + i * (BOX_H + GAP);
}

/** Maps a mode key to the step its click should navigate to. */
function clickStep(key: string): number {
  const m = MODES.find(m => m.key === key);
  return m?.activeStep ?? 0;
}

export function PermissionModesDiagram({ step }: DiagramProps) {
  const { goToStep } = useDeckControls();

  return (
    <svg
      viewBox="0 0 700 410"
      role="img"
      aria-label="Permission modes: five levels from Ask permissions (most cautious) to Bypass permissions (most autonomous)"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="pm-spectrum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="var(--color-fg-muted)"  stopOpacity={0.5} />
          <stop offset="50%"  stopColor="var(--color-accent)"    stopOpacity={0.6} />
          <stop offset="100%" stopColor="var(--color-accent)"    stopOpacity={1}   />
        </linearGradient>
      </defs>

      {/* Spectrum bar on the left */}
      <rect
        x={BAR_X}
        y={START_Y}
        width={BAR_W}
        height={TOTAL_H}
        rx={4}
        fill="url(#pm-spectrum)"
      />

      {/* "Cautious" label at top of bar */}
      <text
        x={BAR_X + BAR_W / 2}
        y={START_Y - 10}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={12}
        fill="var(--color-fg-muted)"
        fontWeight={600}
        letterSpacing="0.04em"
      >
        CAUTIOUS
      </text>

      {/* "Autonomous" label at bottom of bar */}
      <text
        x={BAR_X + BAR_W / 2}
        y={START_Y + TOTAL_H + 18}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={12}
        fill="var(--color-accent)"
        fontWeight={600}
        letterSpacing="0.04em"
      >
        AUTONOMOUS
      </text>

      {/* Mode rows */}
      {MODES.map((m, i) => {
        const y = rowY(i);
        const isActive = step >= m.activeStep && step > 0;
        const isAutoMode = m.key === 'auto';
        const isBypass = m.key === 'bypass';
        const fillColor = isBypass && isActive
          ? 'var(--color-accent)'
          : isAutoMode && isActive
            ? 'var(--color-accent-soft)'
            : 'var(--color-surface-2)';
        const borderColor = isActive ? 'var(--color-accent)' : 'var(--color-border)';
        const borderW = isActive ? 2 : 1.5;
        const labelColor = isBypass && isActive ? 'var(--color-accent-contrast)' : 'var(--color-fg)';
        const subColor = isBypass && isActive ? 'var(--color-accent-contrast)' : 'var(--color-fg-muted)';

        return (
          <g
            key={m.key}
            onClick={() => goToStep(clickStep(m.key))}
            style={{ cursor: 'pointer' }}
          >
            <motion.rect
              x={START_X}
              y={y}
              width={BOX_W}
              height={BOX_H}
              rx={12}
              fill={fillColor}
              stroke={borderColor}
              strokeWidth={borderW}
              initial={false}
              animate={{ opacity: step === 0 ? 0.45 : isActive ? 1 : 0.35 }}
              transition={{ duration: 0.3 }}
            />

            {/* Keyboard shortcut badge */}
            <motion.g
              initial={false}
              animate={{ opacity: step === 0 ? 0.45 : isActive ? 1 : 0.35 }}
              transition={{ duration: 0.3 }}
            >
              <rect
                x={START_X + 12}
                y={y + (BOX_H - 26) / 2}
                width={26}
                height={26}
                rx={6}
                fill={isActive ? 'var(--color-accent)' : 'var(--color-border)'}
                opacity={isBypass && isActive ? 0.3 : 1}
              />
              <text
                x={START_X + 25}
                y={y + BOX_H / 2 + 5}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={13}
                fontWeight={700}
                fill={isActive && !isBypass ? 'var(--color-accent-contrast)' : 'var(--color-fg)'}
              >
                {m.kbd}
              </text>

              {/* Mode name */}
              <text
                x={START_X + 50}
                y={y + BOX_H / 2 - 5}
                fontFamily="var(--font-display)"
                fontSize={17}
                fontWeight={700}
                fill={labelColor}
              >
                {m.label}
              </text>

              {/* Sub-line */}
              <text
                x={START_X + 50}
                y={y + BOX_H / 2 + 13}
                fontFamily="var(--font-sans)"
                fontSize={13}
                fill={subColor}
              >
                {m.sub}
              </text>
            </motion.g>

            {/* "✓ current" badge for Auto mode (step 3) */}
            {isAutoMode && step >= 3 && (
              <motion.text
                x={START_X + BOX_W - 16}
                y={y + BOX_H / 2 + 6}
                textAnchor="end"
                fontFamily="var(--font-sans)"
                fontSize={12}
                fontWeight={700}
                fill="var(--color-accent)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                ✓ default
              </motion.text>
            )}
          </g>
        );
      })}

      {/* Bottom caption */}
      <text
        x={350}
        y={394}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={13}
        fill="var(--color-fg-muted)"
      >
        Switch modes anytime with the <tspan fontFamily="var(--font-mono)" fontWeight={700} fill="var(--color-fg)">Mode</tspan> picker or keyboard shortcuts 1–5
      </text>
    </svg>
  );
}
