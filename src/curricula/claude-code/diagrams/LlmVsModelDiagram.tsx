import { motion } from 'framer-motion';
import { useDeckControls } from '@/app/DeckControls';
import { RevealGroup } from '@/diagrams/primitives/RevealGroup';
import type { DiagramProps } from '@/diagrams/types';

/** The four named versions you can pick — the "models". */
const VERSIONS = ['Haiku 4.5', 'Sonnet 4.6', 'Opus 4.8', 'Fable 5'];

const CHIP_W = 250;
const CHIP_H = 40;
const CHIP_GAP = 12;
const CHIP_X = 400;
const CHIP_TOP = 32;

/**
 * LLM vs. a model: the LLM is the underlying engine (the kind of brain); a "model" is a specific,
 * named version of it that you pick. Step 0 shows the engine alone; step 1 branches it into the
 * named versions. Clicking the engine or the versions sets the slide step (drives /present).
 */
export function LlmVsModelDiagram({ step }: DiagramProps) {
  const { goToStep } = useDeckControls();
  const showVersions = step >= 1;

  return (
    <svg viewBox="0 0 700 264" role="img" aria-label="An LLM is the engine; a model is a specific named version of it" className="w-full h-auto">
      <defs>
        <marker id="cc-lvm-arrow" markerWidth={9} markerHeight={9} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* The LLM — the engine / category */}
      <g transform="translate(40, 64)" onClick={() => goToStep(0)} style={{ cursor: 'pointer' }}>
        <motion.rect
          width={220}
          height={132}
          rx={18}
          fill="var(--color-surface-2)"
          animate={{ stroke: !showVersions ? 'var(--color-accent)' : 'var(--color-border)', strokeWidth: !showVersions ? 2.5 : 1.5 }}
          transition={{ duration: 0.25 }}
        />
        <g transform="translate(110, 44)">
          <circle r={22} fill="var(--color-accent)" />
          {/* a simple "engine/brain" glyph */}
          <path d="M-9 0 Q-9 -10 0 -10 Q9 -10 9 0 Q9 10 0 10 Q-9 10 -9 0 Z M0 -10 L0 10 M-9 0 L9 0" fill="none" stroke="var(--color-accent-contrast)" strokeWidth={1.7} strokeLinecap="round" />
        </g>
        <text x={110} y={92} textAnchor="middle" fontFamily="var(--font-display)" fontSize={28} fontWeight={600} fill="var(--color-fg)">
          LLM
        </text>
        <text x={110} y={114} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13.5} fill="var(--color-fg-muted)">
          the underlying engine
        </text>
      </g>

      {/* Branch into the named versions */}
      {VERSIONS.map((v, i) => {
        const y = CHIP_TOP + i * (CHIP_H + CHIP_GAP);
        const midY = y + CHIP_H / 2;
        return (
          <RevealGroup key={v} show={showVersions} dim={0}>
            <motion.path
              d={`M268 130 C 330 130, 330 ${midY}, ${CHIP_X - 6} ${midY}`}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={2}
              strokeLinecap="round"
              markerEnd="url(#cc-lvm-arrow)"
              initial={false}
              animate={{ pathLength: showVersions ? 1 : 0, opacity: showVersions ? 1 : 0 }}
              transition={{ duration: 0.4, delay: showVersions ? 0.05 + i * 0.06 : 0 }}
            />
            <g transform={`translate(${CHIP_X}, ${y})`} onClick={() => goToStep(1)} style={{ cursor: 'pointer' }}>
              <rect width={CHIP_W} height={CHIP_H} rx={10} fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth={1.5} />
              <text x={16} y={CHIP_H / 2 + 1} dominantBaseline="middle" fontFamily="var(--font-display)" fontSize={17} fontWeight={600} fill="var(--color-fg)">
                {v}
              </text>
              <text x={CHIP_W - 16} y={CHIP_H / 2 + 1} dominantBaseline="middle" textAnchor="end" fontFamily="var(--font-mono)" fontSize={11.5} fill="var(--color-fg-subtle)">
                a model
              </text>
            </g>
          </RevealGroup>
        );
      })}

      <text x={150} y={232} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={13.5} fontWeight={600} fill={!showVersions ? 'var(--color-accent)' : 'var(--color-fg-subtle)'}>
        one kind of engine
      </text>
      <motion.text
        x={525}
        y={232}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={13.5}
        fontWeight={600}
        fill="var(--color-accent)"
        initial={false}
        animate={{ opacity: showVersions ? 1 : 0 }}
        transition={{ duration: 0.3, delay: showVersions ? 0.3 : 0 }}
      >
        many versions you can pick
      </motion.text>
    </svg>
  );
}
