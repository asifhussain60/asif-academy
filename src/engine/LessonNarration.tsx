import type { Slide } from './types';
import { renderInline } from '@/detail/renderInline';
import { toSteps } from './talkingPoints';

/**
 * Self-study narration, rendered inline beneath a slide's blocks in `learn` mode. It surfaces the
 * same authored `talkingPoints` the presenter would read aloud — so a solo reader gets the full
 * explanation on the page instead of having to open the side panel or the `/present` window.
 *
 * It shows the **current step's** bullets (clamped, like the side panel), so the narration tracks
 * progressively-revealed diagrams/code as the reader advances with ←/→. Renders nothing when a slide
 * has no talking points, so title/opener slides stay clean.
 */
export function LessonNarration({ slide, step }: { slide: Slide; step: number }) {
  const steps = toSteps(slide.talkingPoints);
  if (steps.length === 0) return null;

  const bullets = steps[Math.min(step, steps.length - 1)] ?? [];
  if (bullets.length === 0) return null;

  return (
    <section className="mt-2 shrink-0 border-t border-border/60 pt-6">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">In depth</p>
      <div className="cc-hl space-y-3 text-lg leading-relaxed text-fg">
        {bullets.map((b, i) => (
          <p key={i}>{renderInline(b, slide.details)}</p>
        ))}
      </div>
    </section>
  );
}
