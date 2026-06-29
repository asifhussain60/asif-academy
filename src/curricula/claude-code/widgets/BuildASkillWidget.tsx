import { motion } from 'framer-motion';
import type { WidgetProps } from '@/widgets/types';

const EXAMPLES = [
  {
    label: '❌ Label (never fires)',
    description: 'release-notes-tool',
    verdict: 'Too vague. The agent can\'t match "write the changelog" against a category name.',
    tone: 'bad' as const,
  },
  {
    label: '✅ Trigger sentence (fires every time)',
    description: 'When asked to write release notes or a changelog from a set of merged pull requests.',
    verdict: 'The agent sees "write the changelog" and this sentence lights up — semantic match.',
    tone: 'good' as const,
  },
];

function SkillCard({
  example,
  delay,
}: {
  example: (typeof EXAMPLES)[number];
  delay: number;
}) {
  const isBad = example.tone === 'bad';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      style={{
        borderRadius: '12px',
        border: `1.5px solid ${isBad ? 'var(--color-border)' : 'var(--color-accent)'}`,
        background: isBad ? 'var(--color-surface-2)' : 'var(--color-accent-soft)',
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* Label chip */}
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: isBad ? 'var(--color-fg-muted)' : 'var(--color-accent)',
        }}
      >
        {example.label}
      </div>

      {/* Mock SKILL.md frontmatter */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          lineHeight: 1.6,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '10px 14px',
          color: 'var(--color-fg-muted)',
        }}
      >
        <span style={{ color: 'var(--color-fg-muted)' }}>---</span>
        <br />
        <span style={{ color: 'var(--color-fg-muted)' }}>name: </span>
        <span style={{ color: 'var(--color-fg)' }}>release-notes</span>
        <br />
        <span style={{ color: 'var(--color-fg-muted)' }}>description: </span>
        <span
          style={{
            color: isBad ? 'var(--color-fg-muted)' : 'var(--color-accent)',
            fontWeight: isBad ? 400 : 600,
          }}
        >
          {example.description}
        </span>
        <br />
        <span style={{ color: 'var(--color-fg-muted)' }}>---</span>
      </div>

      {/* Verdict */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          lineHeight: 1.55,
          color: isBad ? 'var(--color-fg-muted)' : 'var(--color-fg)',
          margin: 0,
        }}
      >
        {example.verdict}
      </p>
    </motion.div>
  );
}

/**
 * Side-by-side label-vs-trigger comparison, rendered as mini SKILL.md frontmatter cards.
 * Single-state widget — no steps needed; the comparison is always fully visible.
 */
export function BuildASkillWidget(_props: WidgetProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '14px',
        width: '100%',
      }}
    >
      {EXAMPLES.map((ex, i) => (
        <SkillCard key={ex.tone} example={ex} delay={i * 0.1} />
      ))}
    </div>
  );
}
