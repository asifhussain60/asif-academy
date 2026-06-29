import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Reveals/dims an SVG group based on `show`. Prop-driven so it animates smoothly
 * forward AND backward (reverses on Back) and survives arrow-spam — framer-motion
 * diffs the target against the current value rather than restarting a keyframe.
 */
export function RevealGroup({
  show,
  children,
  dim = 0.12,
}: {
  show: boolean;
  children: ReactNode;
  dim?: number;
}) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: show ? 1 : dim, scale: show ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      style={{ transformOrigin: 'center' }}
    >
      {children}
    </motion.g>
  );
}
