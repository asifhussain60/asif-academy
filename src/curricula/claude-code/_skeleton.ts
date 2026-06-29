import type { Block, Slide } from '@/engine/types';
import { claudeCodeWidgets } from './widgets/index';

/**
 * Phase-A skeleton slide. Real title + placeholder blocks + a sample tooltip, sample Q&A, and
 * sample step-indexed talking points — so the full arc/flow (and the presenter sync) is walkable
 * without authoring final content. Phase B replaces the body with real teaching content.
 */
export function stub(
  id: string,
  eyebrow: string,
  title: string,
  opts: {
    diagram?: string;
    widget?: string;
    point?: string;
    estMinutes?: number;
  } = {},
): Slide {
  const widgetSteps = opts.widget ? (claudeCodeWidgets[opts.widget]?.steps ?? 1) : 1;
  const steps = opts.diagram ? 4 : widgetSteps;

  const visual: Block = opts.diagram
    ? { kind: 'diagram', diagramId: opts.diagram, params: { label: opts.diagram } }
    : opts.widget
      ? { kind: 'widget', widgetId: opts.widget, params: { label: claudeCodeWidgets[opts.widget]?.label ?? opts.widget } }
      : { kind: 'callout', tone: 'tip', md: 'Placeholder — final content lands in Phase B.' };

  const prose: Block = {
    kind: 'prose',
    md: opts.point ?? `Plain-language explanation of **${title}** goes here, with a [[sample tooltip|sample]] on a key term.`,
  };

  // Top-down: heading → prose → analogy → the visual full-width below, so the panel can grow
  // as tall as it needs without being boxed into a narrow side column.
  const blocks: Block[] = [
    { kind: 'heading', eyebrow, text: title },
    prose,
    { kind: 'callout', tone: 'analogy', md: 'Everyday analogy lands here in Phase B.' },
    visual,
  ];

  return {
    id,
    layout: 'center',
    steps,
    estMinutes: opts.estMinutes ?? 1.5,
    background: 'default',
    details: {
      sample: {
        title: 'Sample tooltip',
        body: 'This is a hover tooltip. In Phase B it carries the precise definition, a gotcha, and a doc citation — so the slide stays clean while depth is one hover away.',
        analogy: 'Like a footnote that only appears when you point at it.',
        source: { label: 'Claude Code docs', href: 'https://code.claude.com/docs' },
      },
    },
    faqs: [
      {
        q: 'Is this the final wording?',
        a: 'No — this is a Phase-A skeleton. Titles and structure are real; the body is filled with real concepts and examples after approval.',
      },
    ],
    // Conforming `string[][]` scaffold: Phase B replaces the WORDS, never the shape. Each step
    // models the house delivery standard (see the `teaching-script` skill) — open with the room's
    // question in "we/us", answer it, chain into the next step. These SCAFFOLD lines are todos.
    talkingPoints: Array.from({ length: steps }, (_, i) => [
      `SCAFFOLD step ${i + 1}: open with the question the room is asking about "${title}" (in "we/us"), then answer it crisply.`,
      `SCAFFOLD: land the everyday analogy, at most one dry aside, and end on a thread into the next step.`,
    ]),
    blocks,
  };
}

/** A simple section/title slide. */
export function titleSlide(id: string, eyebrow: string, title: string, sub: string): Slide {
  return {
    id,
    layout: 'title',
    background: 'spotlight',
    estMinutes: 0.5,
    talkingPoints: [[
      `SCAFFOLD: open "${title}" with one line that makes the room curious about what's coming, then move on. It's a signpost, not a teaching slide.`,
    ]],
    blocks: [
      { kind: 'heading', eyebrow, text: title, level: 1 },
      { kind: 'prose', md: sub, size: 'lg' },
    ],
    notes: `Section opener: ${title}.`,
  };
}
