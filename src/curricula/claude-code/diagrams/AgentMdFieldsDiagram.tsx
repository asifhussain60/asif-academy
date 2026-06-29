import type { DiagramProps } from '@/diagrams/types';

/**
 * Static diagram showing the three AGENT.md fields (description, model, tools)
 * pointing into a central AGENT.md node. Used on slide sc-1.
 */
export function AgentMdFieldsDiagram(_props: DiagramProps) {
  return (
    <svg
      viewBox="0 0 560 160"
      role="img"
      aria-label="AGENT.md has three key fields: description (when to spawn), model (right-size the cost), and tools (least privilege)"
      className="w-full h-auto"
    >
      <defs>
        <marker id="amd-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Center: AGENT.md */}
      <rect x={200} y={50} width={160} height={60} rx={12} fill="var(--color-surface-2)" stroke="var(--color-accent)" strokeWidth={2} />
      <text x={280} y={77} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fontWeight={700} fill="var(--color-fg)">AGENT.md</text>
      <text x={280} y={97} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11} fill="var(--color-fg-muted)">.claude/agents/</text>

      {/* Left-top: description */}
      <rect x={20} y={18} width={140} height={48} rx={9} fill="var(--color-surface-3, var(--color-surface-2))" stroke="var(--color-border)" strokeWidth={1.5} />
      <text x={90} y={38} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fontWeight={600} fill="var(--color-accent)">description</text>
      <text x={90} y={55} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={10.5} fill="var(--color-fg-muted)">when to spawn</text>
      <line x1={160} y1={42} x2={198} y2={68} stroke="var(--color-accent)" strokeWidth={1.5} markerEnd="url(#amd-arr)" />

      {/* Left-bottom: model */}
      <rect x={20} y={94} width={140} height={48} rx={9} fill="var(--color-surface-3, var(--color-surface-2))" stroke="var(--color-border)" strokeWidth={1.5} />
      <text x={90} y={114} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fontWeight={600} fill="var(--color-accent)">model</text>
      <text x={90} y={131} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={10.5} fill="var(--color-fg-muted)">right-size the cost</text>
      <line x1={160} y1={118} x2={198} y2={98} stroke="var(--color-accent)" strokeWidth={1.5} markerEnd="url(#amd-arr)" />

      {/* Right: tools */}
      <rect x={400} y={56} width={140} height={48} rx={9} fill="var(--color-surface-3, var(--color-surface-2))" stroke="var(--color-border)" strokeWidth={1.5} />
      <text x={470} y={76} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fontWeight={600} fill="var(--color-accent)">tools</text>
      <text x={470} y={93} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={10.5} fill="var(--color-fg-muted)">least privilege</text>
      <line x1={360} y1={80} x2={398} y2={80} stroke="var(--color-accent)" strokeWidth={1.5} markerEnd="url(#amd-arr)" />
    </svg>
  );
}
