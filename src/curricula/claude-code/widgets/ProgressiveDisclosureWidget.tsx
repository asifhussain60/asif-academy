import { motion } from 'framer-motion';
import type { WidgetProps } from '@/widgets/types';

const TILES = [
  {
    icon: '🌅',
    title: 'Startup',
    body: (
      <>
        <strong>Frontmatter only.</strong> Name + description for every Skill. Fast — it's just the
        index.
      </>
    ),
  },
  {
    icon: '🎯',
    title: 'Task arrives',
    body: (
      <>
        Agent compares the task to every description. <strong>Semantic match</strong> — no exact
        keyword required.
      </>
    ),
  },
  {
    icon: '📖',
    title: 'Body loads',
    body: (
      <>
        Only the matching Skill's body enters context. <strong>Everything else: zero tokens.</strong>
      </>
    ),
  },
];

/**
 * Three-step sequential tile reveal for progressive disclosure.
 * Step 0 → tile 1 lit. Step 1 → tiles 1+2 lit. Step 2 → all three lit.
 * Tiles animate in place; accent border + background indicate the active step.
 */
export function ProgressiveDisclosureWidget({ ctx }: WidgetProps) {
  const s = Math.min(Math.max(ctx.step ?? 0, 0), 2);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px',
        width: '100%',
        padding: '4px 0',
      }}
    >
      {TILES.map((tile, i) => {
        const lit = s >= i;
        return (
          <motion.div
            key={tile.title}
            animate={{
              backgroundColor: lit ? 'var(--color-accent-soft)' : 'var(--color-surface-2)',
              borderColor: lit ? 'var(--color-accent)' : 'var(--color-border)',
              opacity: lit ? 1 : 0.45,
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              border: '1.5px solid var(--color-border)',
              borderRadius: '14px',
              padding: '18px 16px',
            }}
          >
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>{tile.icon}</div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 700,
                color: lit ? 'var(--color-accent)' : 'var(--color-fg)',
                marginBottom: '8px',
                transition: 'color 0.3s',
              }}
            >
              {tile.title}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                lineHeight: 1.55,
                color: 'var(--color-fg-muted)',
              }}
            >
              {tile.body}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
