import type { DiagramProps } from '@/diagrams/types';

/**
 * mem-2 focal visual: shows merged PRs flowing into the Release Notes Assistant,
 * which outputs a clean changelog. Static diagram — no step-reveal needed.
 */
export function AssistantPipelineDiagram(_props: DiagramProps) {
  return (
    <svg
      viewBox="0 0 580 130"
      role="img"
      aria-label="Merged pull requests feed into the Release Notes Assistant, which outputs a clean changelog"
      className="w-full h-auto"
    >
      <defs>
        <marker id="pipeline-arrow" markerWidth={9} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Merged PRs box */}
      <rect x={10} y={30} width={148} height={68} rx={12} fill="var(--color-surface-2)" stroke="var(--color-accent)" strokeWidth={1.6} />
      <text x={84} y={57} textAnchor="middle" fontFamily="var(--font-display)" fontSize={14} fontWeight={600} fill="var(--color-fg)">
        Merged PRs
      </text>
      <text x={84} y={76} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-muted)">
        this week
      </text>

      {/* Arrow 1 */}
      <line x1={158} y1={64} x2={196} y2={64} stroke="var(--color-accent)" strokeWidth={2} markerEnd="url(#pipeline-arrow)" />

      {/* Release Notes Assistant box (focal) */}
      <rect x={196} y={18} width={188} height={92} rx={14} fill="var(--color-surface-2)" stroke="var(--color-accent)" strokeWidth={2.5} />
      <text x={290} y={48} textAnchor="middle" fontFamily="var(--font-display)" fontSize={14} fontWeight={700} fill="var(--color-fg)">
        Release Notes
      </text>
      <text x={290} y={66} textAnchor="middle" fontFamily="var(--font-display)" fontSize={14} fontWeight={700} fill="var(--color-fg)">
        Assistant
      </text>
      <text x={290} y={88} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11} fill="var(--color-fg-muted)">
        CLAUDE.md · Skill · Subagent
      </text>

      {/* Arrow 2 */}
      <line x1={384} y1={64} x2={422} y2={64} stroke="var(--color-accent)" strokeWidth={2} markerEnd="url(#pipeline-arrow)" />

      {/* Changelog box */}
      <rect x={422} y={30} width={148} height={68} rx={12} fill="var(--color-surface-2)" stroke="var(--color-accent)" strokeWidth={1.6} />
      <text x={496} y={57} textAnchor="middle" fontFamily="var(--font-display)" fontSize={14} fontWeight={600} fill="var(--color-fg)">
        Changelog
      </text>
      <text x={496} y={76} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-muted)">
        clean &amp; readable
      </text>
    </svg>
  );
}
