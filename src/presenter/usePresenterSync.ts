import { useEffect, useState } from 'react';

export interface PresenterPosition {
  tutorialId: string;
  moduleId: string;
  lessonId: string;
  slideIndex: number;
  step: number;
}

const CHANNEL = 'asif-academy-present';
const LS_KEY = 'asif-academy-present-pos';

/** Broadcast the live position to any open /present window. Same-origin, offline, instant. */
export function broadcastPosition(pos: PresenterPosition): void {
  try {
    if ('BroadcastChannel' in window) {
      const ch = new BroadcastChannel(CHANNEL);
      ch.postMessage(pos);
      ch.close();
    }
    // localStorage fallback (also lets a freshly-opened presenter window read the last position).
    localStorage.setItem(LS_KEY, JSON.stringify(pos));
  } catch {
    /* no-op */
  }
}

/** Subscribe to live position updates (used by the /present window). */
export function usePresenterPosition(): PresenterPosition | null {
  const [pos, setPos] = useState<PresenterPosition | null>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? (JSON.parse(raw) as PresenterPosition) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let ch: BroadcastChannel | null = null;
    if ('BroadcastChannel' in window) {
      ch = new BroadcastChannel(CHANNEL);
      ch.onmessage = (e) => setPos(e.data as PresenterPosition);
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY && e.newValue) setPos(JSON.parse(e.newValue) as PresenterPosition);
    };
    window.addEventListener('storage', onStorage);
    return () => {
      ch?.close();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return pos;
}
