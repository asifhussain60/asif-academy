import type { DiagramProps } from '@/diagrams/types';

/**
 * Label vs. trigger: shows that a vague label description never fires the Skill,
 * while a scenario-style trigger sentence lands every time.
 */
export function SkillTriggerDiagram(_props: DiagramProps) {
  return (
    <svg
      viewBox="0 0 560 150"
      role="img"
      aria-label="A vague label never fires a Skill; a trigger sentence fires it every time"
      className="w-full h-auto"
    >
      <defs>
        <marker id="cc-st-arrow" markerWidth={8} markerHeight={8} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--color-accent)" />
        </marker>
        <marker id="cc-st-dim" markerWidth={8} markerHeight={8} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--color-fg-subtle)" />
        </marker>
      </defs>

      {/* ── Label box (bad) ── */}
      <rect x="10" y="18" width="148" height="110" rx="10" fill="var(--color-surface-2)" stroke="var(--color-fg-subtle)" strokeWidth="1.5" opacity="0.6" />
      <text x="84" y="44" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fontWeight="600" fill="var(--color-fg-subtle)">LABEL (bad)</text>
      <text x="84" y="68" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--color-fg)">release-notes-tool</text>
      <text x="84" y="93" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fill="var(--color-fg-subtle)">no semantic anchor —</text>
      <text x="84" y="110" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fill="var(--color-fg-subtle)">Skill never fires</text>

      {/* dim arrow from label */}
      <line x1="162" y1="73" x2="204" y2="73" stroke="var(--color-fg-subtle)" strokeWidth="1.5" opacity="0.35" markerEnd="url(#cc-st-dim)" />

      {/* ── Trigger box (good) ── */}
      <rect x="208" y="18" width="196" height="110" rx="10" fill="var(--color-surface-2)" stroke="var(--color-accent)" strokeWidth="2" />
      <text x="306" y="44" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fontWeight="600" fill="var(--color-accent)">TRIGGER (good)</text>
      <text x="306" y="66" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11.5" fill="var(--color-fg)">When asked to write</text>
      <text x="306" y="82" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11.5" fill="var(--color-fg)">release notes or a</text>
      <text x="306" y="98" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11.5" fill="var(--color-fg)">changelog...</text>

      {/* accent arrow from trigger */}
      <line x1="408" y1="73" x2="454" y2="73" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#cc-st-arrow)" />

      {/* ── Fires box ── */}
      <rect x="458" y="30" width="90" height="86" rx="10" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="2" />
      <text x="503" y="68" textAnchor="middle" fontFamily="var(--font-display)" fontSize="15" fontWeight="700" fill="var(--color-accent)">Skill</text>
      <text x="503" y="88" textAnchor="middle" fontFamily="var(--font-display)" fontSize="15" fontWeight="700" fill="var(--color-accent)">fires ✓</text>
    </svg>
  );
}
