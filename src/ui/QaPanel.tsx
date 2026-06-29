import { AnimatePresence, motion } from 'framer-motion';
import type { Faq } from '@/engine/types';
import { renderInline } from '@/detail/renderInline';

/** Audience-facing anticipated Q&A — toggled on the slide (distinct from the private talking points). */
export function QaPanel({ faqs, open }: { faqs: Faq[] | undefined; open: boolean }) {
  return (
    <AnimatePresence>
      {open && faqs && faqs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="absolute right-4 top-4 bottom-4 z-30 w-[22rem] max-w-[80vw] overflow-y-auto rounded-xl border border-border bg-surface/95 p-4 shadow-xl backdrop-blur"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">Likely questions</p>
          <ul className="space-y-3.5">
            {faqs.map((f, i) => (
              <li key={i}>
                <p className="text-[15px] font-semibold text-fg">{f.q}</p>
                <p className="cc-hl mt-1 text-[14px] leading-relaxed text-fg-muted">{renderInline(f.a)}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
