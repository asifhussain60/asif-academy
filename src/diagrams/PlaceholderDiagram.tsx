import { motion } from 'framer-motion';
import type { DiagramProps } from './types';

/**
 * Styled stand-in for a not-yet-authored diagram. Shows the real frame, theme,
 * and a step-reactive accent so the visual system is visible during Phase A
 * without authoring the final artwork. `params.label` names what will live here.
 */
export function PlaceholderDiagram({ step, params }: DiagramProps) {
  const label = (params?.label as string) ?? 'diagram';
  const dots = [0, 1, 2, 3];
  return (
    <svg
      viewBox="0 0 640 300"
      role="img"
      aria-label={`Placeholder for the ${label} diagram`}
      className="w-full h-auto"
    >
      <rect
        x={8}
        y={8}
        width={624}
        height={284}
        rx={16}
        fill="var(--color-surface-2)"
        stroke="var(--color-border)"
        strokeWidth={1.5}
        strokeDasharray="6 7"
      />
      <text
        x={320}
        y={132}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize={24}
        fontWeight={600}
        fill="var(--color-fg-muted)"
      >
        {label}
      </text>
      <text
        x={320}
        y={160}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={12}
        fill="var(--color-fg-subtle)"
      >
        diagram placeholder · step {step + 1}
      </text>
      <g transform="translate(284, 192)">
        {dots.map((d) => (
          <motion.circle
            key={d}
            cx={d * 24}
            cy={0}
            r={6}
            fill="var(--color-accent)"
            initial={false}
            animate={{ opacity: step >= d ? 1 : 0.2, scale: step === d ? 1.25 : 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </g>
    </svg>
  );
}
