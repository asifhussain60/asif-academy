import { motion } from 'framer-motion';
import { useDeckControls } from '@/app/DeckControls';
import { RevealGroup } from '@/diagrams/primitives/RevealGroup';
import type { DiagramProps } from '@/diagrams/types';

const CX = 110;  // card x
const CY = 14;   // card y
const CW = 420;  // card width
const CH = 224;  // card height
const TAB_H = 30;
const FM_H = 96; // frontmatter zone height (below tab)
const DIV_Y = CY + TAB_H + FM_H;

/**
 * SKILL.md anatomy: two clickable zones — frontmatter (always loads) and body (loads on trigger).
 * Step 0: card visible, zones dim. Step 1: frontmatter lights up. Step 2: body lights up.
 * Clicking a zone drives the step.
 */
export function SkillAnatomyDiagram({ step }: DiagramProps) {
  const { goToStep } = useDeckControls();
  const s = Math.min(Math.max(step, 0), 2);

  const fmActive = s >= 1;
  const bodyActive = s >= 2;

  return (
    <svg
      viewBox="0 0 640 270"
      role="img"
      aria-label="SKILL.md has two zones: frontmatter always loads at startup; body loads only on trigger"
      className="w-full h-auto"
    >
      <defs>
        <clipPath id="sk-card-clip">
          <rect x={CX} y={CY} width={CW} height={CH} rx={14} />
        </clipPath>
      </defs>

      {/* Card background */}
      <rect x={CX} y={CY} width={CW} height={CH} rx={14} fill="var(--color-surface-2)" stroke="var(--color-border)" strokeWidth={1.5} />

      {/* File-name header tab */}
      <rect x={CX} y={CY} width={CW} height={TAB_H} rx={14} fill="var(--color-surface-3, var(--color-surface-2))" clipPath="url(#sk-card-clip)" />
      <rect x={CX} y={CY + 14} width={CW} height={16} fill="var(--color-surface-3, var(--color-surface-2))" />
      <rect x={CX + 16} y={CY + 6} width={90} height={18} rx={5} fill="var(--color-surface-2)" />
      <text x={CX + 61} y={CY + 18} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-fg-muted)">
        SKILL.md
      </text>

      {/* ── Frontmatter zone ── */}
      <g onClick={() => goToStep(1)} style={{ cursor: 'pointer' }}>
        <motion.rect
          x={CX + 1.5}
          y={CY + TAB_H}
          width={CW - 3}
          height={FM_H}
          fill="var(--color-accent-soft)"
          animate={{ opacity: fmActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        {/* frontmatter code lines */}
        <text x={CX + 22} y={CY + TAB_H + 17} fontFamily="var(--font-mono)" fontSize={13} fill="var(--color-fg-subtle)">---</text>
        <text x={CX + 22} y={CY + TAB_H + 36} fontFamily="var(--font-mono)" fontSize={13} fill="var(--color-fg)">
          <tspan fill="var(--color-accent)">name:</tspan>{' '}release-notes
        </text>
        <text x={CX + 22} y={CY + TAB_H + 55} fontFamily="var(--font-mono)" fontSize={13} fill="var(--color-fg)">
          <tspan fill="var(--color-accent)">description:</tspan>{' '}<tspan fill="var(--color-fg-subtle)">When asked to write</tspan>
        </text>
        <text x={CX + 38} y={CY + TAB_H + 72} fontFamily="var(--font-mono)" fontSize={12.5} fill="var(--color-fg-subtle)">
          release notes or a changelog...
        </text>
        <text x={CX + 22} y={CY + TAB_H + 88} fontFamily="var(--font-mono)" fontSize={13} fill="var(--color-fg-subtle)">---</text>
        {/* active border */}
        <motion.rect
          x={CX + 1.5}
          y={CY + TAB_H}
          width={CW - 3}
          height={FM_H}
          fill="none"
          animate={{ stroke: fmActive ? 'var(--color-accent)' : 'transparent', strokeWidth: 2 }}
          transition={{ duration: 0.25 }}
        />
      </g>

      {/* Dashed divider */}
      <line
        x1={CX + 14}
        y1={DIV_Y}
        x2={CX + CW - 14}
        y2={DIV_Y}
        stroke="var(--color-border)"
        strokeWidth={1.2}
        strokeDasharray="5 4"
      />

      {/* ── Body zone ── */}
      <g onClick={() => goToStep(2)} style={{ cursor: 'pointer' }}>
        <motion.rect
          x={CX + 1.5}
          y={DIV_Y}
          width={CW - 3}
          height={CH - TAB_H - FM_H - 1}
          fill="var(--color-accent-soft)"
          animate={{ opacity: bodyActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        {/* body code lines */}
        <text x={CX + 22} y={DIV_Y + 18} fontFamily="var(--font-mono)" fontSize={13} fontWeight={700} fill="var(--color-fg)">
          ## Output format
        </text>
        <text x={CX + 22} y={DIV_Y + 36} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-fg-subtle)">
          - One ## vX.Y.Z header per release
        </text>
        <text x={CX + 22} y={DIV_Y + 52} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-fg-subtle)">
          - Group: Features · Fixes · Breaking changes
        </text>
        <text x={CX + 22} y={DIV_Y + 71} fontFamily="var(--font-mono)" fontSize={13} fontWeight={700} fill="var(--color-fg)">
          ## Tone
        </text>
        <text x={CX + 22} y={DIV_Y + 88} fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-fg-subtle)">
          Plain English. Active voice.
        </text>
        {/* active border */}
        <motion.rect
          x={CX + 1.5}
          y={DIV_Y}
          width={CW - 3}
          height={CH - TAB_H - FM_H - 2}
          fill="none"
          animate={{ stroke: bodyActive ? 'var(--color-accent)' : 'transparent', strokeWidth: 2 }}
          transition={{ duration: 0.25 }}
        />
      </g>

      {/* Outer card border (drawn on top so it clips zones) */}
      <rect x={CX} y={CY} width={CW} height={CH} rx={14} fill="none" stroke="var(--color-border)" strokeWidth={1.5} />

      {/* ── Left callout: "always loads" ── */}
      <RevealGroup show={fmActive} dim={0}>
        <g transform={`translate(${CX - 14}, ${CY + TAB_H + FM_H / 2})`}>
          <motion.rect
            x={-86}
            y={-14}
            width={84}
            height={28}
            rx={8}
            fill="var(--color-accent)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
          />
          <text x={-44} y={1} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-sans)" fontSize={11.5} fontWeight={700} fill="var(--color-accent)">
            loads at startup
          </text>
          <line x1={-2} y1={0} x2={14} y2={0} stroke="var(--color-accent)" strokeWidth={1.5} markerEnd="url(#sk-arrow)" />
        </g>
      </RevealGroup>

      {/* ── Right callout: "loads on trigger" ── */}
      <RevealGroup show={bodyActive} dim={0}>
        <g transform={`translate(${CX + CW + 14}, ${DIV_Y + (CH - TAB_H - FM_H) / 2})`}>
          <motion.rect
            x={2}
            y={-14}
            width={94}
            height={28}
            rx={8}
            fill="var(--color-accent)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
          />
          <text x={49} y={1} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-sans)" fontSize={11.5} fontWeight={700} fill="var(--color-accent)">
            loads on trigger
          </text>
          <line x1={-14} y1={0} x2={2} y2={0} stroke="var(--color-accent)" strokeWidth={1.5} />
        </g>
      </RevealGroup>

      {/* Arrow marker for left callout */}
      <defs>
        <marker id="sk-arrow" markerWidth={7} markerHeight={7} refX={5} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Bottom caption */}
      <RevealGroup show={s >= 2} dim={0}>
        <text
          x={320}
          y={256}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={13.5}
          fontWeight={600}
          fill="var(--color-accent)"
        >
          Click a zone · frontmatter always · body on demand
        </text>
      </RevealGroup>
    </svg>
  );
}
