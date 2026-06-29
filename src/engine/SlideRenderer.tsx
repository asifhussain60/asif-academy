import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import type { Slide, SlideCtx } from './types';
import { BlockRenderer } from './BlockRenderer';

const BG: Record<string, string> = {
  default: '',
  spotlight: 'bg-spotlight',
  grid: 'bg-dotgrid',
};

const LAYOUT_WRAP: Record<string, string> = {
  // title stays vertically centered (hero); content layouts top-align so they grow downward.
  title: 'items-center justify-center text-center max-w-4xl',
  center: 'max-w-4xl',
  'two-column': 'max-w-6xl',
  stage: 'max-w-5xl',
  'full-bleed': 'max-w-none w-full',
};

export function SlideRenderer({ slide, ctx }: { slide: Slide; ctx: SlideCtx }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top on every navigation — slide change OR step change.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [slide.id, ctx.step]);

  return (
    <div ref={scrollRef} className={clsx('relative flex h-full w-full justify-center overflow-y-auto', BG[slide.background ?? 'default'])}>
      <motion.div
        key={slide.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className={clsx(
          'flex min-h-full w-full flex-col gap-6 px-8 py-10 md:px-14 md:py-14',
          LAYOUT_WRAP[slide.layout] ?? LAYOUT_WRAP.center,
        )}
      >
        {slide.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} ctx={ctx} />
        ))}
      </motion.div>
    </div>
  );
}
