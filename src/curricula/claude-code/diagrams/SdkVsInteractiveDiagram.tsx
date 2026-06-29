import type { DiagramProps } from '@/diagrams/types';

/**
 * sdk-1b focal visual: contrasts Claude Code (interactive dev) on the left with the
 * Agent SDK (production pipeline) on the right. Static diagram — no step-reveal needed.
 */
export function SdkVsInteractiveDiagram(_props: DiagramProps) {
  return (
    <svg
      viewBox="0 0 620 170"
      role="img"
      aria-label="Two deployment modes: Claude Code for interactive development on the left, Agent SDK for production pipelines on the right"
      className="w-full h-auto"
    >
      <defs>
        <marker id="sdk-arrow" markerWidth={9} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* ── Left box: Claude Code (interactive) ── */}
      <rect x={14} y={28} width={260} height={114} rx={14}
        fill="var(--color-surface-2)" stroke="var(--color-accent)" strokeWidth={1.8} />
      <text x={144} y={56} textAnchor="middle"
        fontFamily="var(--font-display)" fontSize={15} fontWeight={700} fill="var(--color-fg)">
        Claude Code
      </text>
      <text x={144} y={75} textAnchor="middle"
        fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-muted)">
        Interactive dev
      </text>
      {/* Icons / bullets */}
      <text x={36} y={100} fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-muted)">▸ You at the keyboard</text>
      <text x={36} y={118} fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-muted)">▸ Real-time feedback loop</text>
      <text x={36} y={136} fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-muted)">▸ One-off or exploratory tasks</text>

      {/* ── Divider label ── */}
      <text x={310} y={90} textAnchor="middle"
        fontFamily="var(--font-sans)" fontSize={13} fontWeight={600} fill="var(--color-fg-muted)">
        vs
      </text>

      {/* ── Right box: Agent SDK (production) ── */}
      <rect x={346} y={28} width={260} height={114} rx={14}
        fill="var(--color-surface-2)" stroke="var(--color-accent)" strokeWidth={1.8} strokeDasharray="6 3" />
      <text x={476} y={56} textAnchor="middle"
        fontFamily="var(--font-display)" fontSize={15} fontWeight={700} fill="var(--color-fg)">
        Agent SDK
      </text>
      <text x={476} y={75} textAnchor="middle"
        fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-muted)">
        Production pipeline
      </text>
      <text x={368} y={100} fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-muted)">▸ Your app calls the loop</text>
      <text x={368} y={118} fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-muted)">▸ Runs unattended at scale</text>
      <text x={368} y={136} fontFamily="var(--font-sans)" fontSize={12} fill="var(--color-fg-muted)">▸ Recurring or automated tasks</text>
    </svg>
  );
}
