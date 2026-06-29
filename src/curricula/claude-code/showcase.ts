import type { Lesson } from '@/engine/types';

/**
 * Welcome / tutorial-opener lesson. (The old dense "every pattern" showcase slide was removed —
 * the real teaching now lives in the atomic Foundations slides.)
 */
export const welcomeShowcase: Lesson = {
  id: 'welcome-showcase',
  title: 'Welcome',
  blurb: 'The tutorial opener.',
  estMinutes: 1,
  slides: [
    {
      id: 'welcome',
      layout: 'title',
      background: 'spotlight',
      estMinutes: 0.5,
      talkingPoints: [
        [
          'Quick show of hands to start. How many of us have asked an AI to write some code, gotten back something that looked perfect, then lost twenty minutes fixing it by hand?',
          'Keep that hand up a second. That gap, between getting an *answer* and getting the *thing done*, is exactly what we close together today.',
          'This is **Claude Code**: the AI that does the work instead of just talking about it. In about **35 minutes** we go from how it thinks all the way to writing our own skills and agents.',
          'So don’t bother taking notes. Automating exactly that kind of busywork is pretty much the whole reason we’re here.',
        ],
      ],
      notes: 'Section opener: the tutorial title.',
      blocks: [
        { kind: 'heading', eyebrow: 'An interactive tutorial', text: 'Claude Code, Taught', level: 1 },
        { kind: 'prose', size: 'lg', md: 'From the agentic loop to building real skills & agents — in about 35 minutes.' },
        { kind: 'spacer', size: 'sm' },
        { kind: 'image', src: 'welcome-hero', size: 'lg', alt: 'A friendly terminal acting as a helpful coding assistant' },
      ],
    },
  ],
};
