import type { DiagramProps } from '@/diagrams/types';

/**
 * Plan mode flow: Explore → Plan → Approve → Execute.
 * Static (step-independent) — pm-1 is a single-step slide.
 */
export function PlanModeFlowDiagram(_props: DiagramProps) {
  const steps = [
    { id: 'explore', label: 'Explore', sub: 'Read-only scan' },
    { id: 'plan', label: 'Plan', sub: 'Step-by-step proposal' },
    { id: 'approve', label: 'Approve', sub: 'You review & green-light' },
    { id: 'execute', label: 'Execute', sub: 'Claude edits files' },
  ];

  const nodeW = 130;
  const nodeH = 60;
  const gap = 44;
  const totalW = steps.length * nodeW + (steps.length - 1) * gap;
  const startX = (740 - totalW) / 2;
  const cy = 140;

  return (
    <svg viewBox="0 0 740 280" role="img" aria-label="Plan mode flow: Explore → Plan → Approve → Execute" className="w-full h-auto">
      <defs>
        <marker id="pm-arrow" markerWidth={9} markerHeight={9} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {steps.map((s, i) => {
        const x = startX + i * (nodeW + gap);
        const isApprove = s.id === 'approve';
        return (
          <g key={s.id}>
            {/* connector arrow */}
            {i > 0 && (
              <line
                x1={startX + (i - 1) * (nodeW + gap) + nodeW}
                y1={cy + nodeH / 2}
                x2={x}
                y2={cy + nodeH / 2}
                stroke="var(--color-accent)"
                strokeWidth={2.2}
                markerEnd="url(#pm-arrow)"
              />
            )}
            {/* node box */}
            <rect
              x={x}
              y={cy}
              width={nodeW}
              height={nodeH}
              rx={12}
              fill={isApprove ? 'var(--color-accent)' : 'var(--color-surface-2)'}
              stroke={isApprove ? 'none' : 'var(--color-border)'}
              strokeWidth={1.5}
            />
            <text
              x={x + nodeW / 2}
              y={cy + 24}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize={17}
              fontWeight={700}
              fill={isApprove ? 'var(--color-accent-contrast)' : 'var(--color-fg)'}
            >
              {s.label}
            </text>
            <text
              x={x + nodeW / 2}
              y={cy + 44}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontSize={11.5}
              fill={isApprove ? 'var(--color-accent-contrast)' : 'var(--color-fg-muted)'}
              opacity={isApprove ? 0.9 : 1}
            >
              {s.sub}
            </text>
          </g>
        );
      })}

      {/* bottom label */}
      <text
        x={370}
        y={248}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize={13}
        fill="var(--color-fg-muted)"
      >
        Nothing is written until <tspan fontWeight={700} fill="var(--color-fg)">Approve</tspan>
      </text>
    </svg>
  );
}
