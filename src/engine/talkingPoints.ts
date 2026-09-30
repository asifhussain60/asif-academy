/**
 * Shared talking-points normalizer. `talkingPoints` accepts three authored shapes (see the `Slide`
 * type): a single string, one paragraph per step (`string[]`), or the preferred [step][bullet]
 * (`string[][]`). Both the in-deck learn-mode narration and the presenter-side panel need the same
 * normalized [step][bullet] form, so it lives here to keep the two from drifting.
 */
export function toSteps(tp: string | string[] | string[][] | undefined): string[][] {
  if (!tp) return [];
  if (typeof tp === 'string') return [[tp]];
  if (tp.length === 0) return [];
  if (Array.isArray(tp[0])) return tp as string[][];
  return (tp as string[]).map((s) => [s]);
}
