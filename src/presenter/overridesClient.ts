/**
 * Client for the dev-only talking-points write-back (see the `talking-points-writeback` plugin in
 * vite.config.ts). The presenter window reads overrides on mount and posts edits on save / auto-save.
 * In a production build there is no endpoint, so every call fails soft and the deck stays read-only.
 */

export interface OverrideRecord {
  /** The original (authored) bullets, captured the first time a step is edited. */
  before: string[];
  /** The presenter's edited bullets. */
  after: string[];
  updatedAt?: string;
}

/** Flat map keyed by `moduleId/lessonId/slideId/step`. */
export type OverridesMap = Record<string, OverrideRecord>;

const ENDPOINT = '/__present/talking-points';

export function overrideKey(moduleId: string, lessonId: string, slideId: string, step: number): string {
  return `${moduleId}/${lessonId}/${slideId}/${step}`;
}

export async function loadOverrides(): Promise<OverridesMap> {
  try {
    const res = await fetch(ENDPOINT);
    if (!res.ok) return {};
    return (await res.json()) as OverridesMap;
  } catch {
    return {};
  }
}

export interface SaveOverridePayload {
  moduleId: string;
  lessonId: string;
  slideId: string;
  step: number;
  before: string[];
  after: string[];
}

export async function saveOverride(payload: SaveOverridePayload): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
