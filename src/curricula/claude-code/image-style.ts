import type { ImageKind } from '@/engine/types';

/**
 * The deck's visual system for generated art — the "house style" the renderer (`gemini-image`
 * skill) appends to every prompt so the whole set reads as one designed family. Style lives HERE,
 * with the content, not in the renderer: another project (podcast covers, journal chapters) supplies
 * its own profile of the same shape and reuses the identical engine. That separation is what makes
 * the image skills repeatable across very different looks.
 */
export interface ImageStyleProfile {
  /** Palette / medium clauses shared by every image, regardless of kind. */
  base: string;
  /** Per-kind style clause — selected by an image's `kind`. */
  byKind: Record<ImageKind, string>;
  /** Hard guardrails appended last (e.g. no lettering). */
  guardrails: string;
}

export const imageStyle: ImageStyleProfile = {
  base:
    'Cohesive warm palette: clay-coral (#c96442) and amber (#b5832f) accents that sit naturally on ' +
    'the deck’s deep charcoal-navy ground (#0d1318). Friendly, premium, modern.',
  byKind: {
    // Mood / section openers: cinematic and atmospheric (the hero).
    opener:
      'Cinematic, softly-lit editorial illustration with gentle depth, rim lighting, and a calm ' +
      'late-evening atmosphere.',
    // In-content teaching comics: must read instantly and carry one idea.
    teaching:
      'Bold flat cartoon / comic style: thick clean outlines, simple exaggerated shapes, expressive ' +
      'friendly characters, strong figure-ground contrast, minimal background clutter, and an obvious ' +
      'left-to-right or panel-to-panel reading order so the single teaching point lands at a glance.',
  },
  guardrails:
    'Absolutely no text, words, letters, numbers, captions, speech bubbles with writing, watermarks, ' +
    'or logos anywhere in the image — labels are conveyed by simple icons and shapes only.',
};
