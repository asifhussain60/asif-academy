import { useEffect } from 'react';

export interface KeyHandlers {
  next: () => void;
  back: () => void;
  nextSlide: () => void; // PageDown — always advances a whole slide
  prevSlide: () => void; // PageUp
  toggleFullscreen: () => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  toggleQa: () => void;
  toggleNotes: () => void;
  openPresenter: () => void;
  toggleOverlay: () => void;
  escape: () => void;
  /** When true, ←/→/Space are yielded to a focused widget (PageDn/PageUp still advance). */
  captureKeys: boolean;
}

const TYPING = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

export function useDeckKeyboard(h: KeyHandlers): void {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (TYPING.has(target.tagName) || target.isContentEditable)) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          if (h.captureKeys) return;
          e.preventDefault();
          h.next();
          break;
        case 'ArrowLeft':
          if (h.captureKeys) return;
          e.preventDefault();
          h.back();
          break;
        case 'PageDown':
          e.preventDefault();
          h.nextSlide();
          break;
        case 'PageUp':
          e.preventDefault();
          h.prevSlide();
          break;
        case 'f':
        case 'F':
          h.toggleFullscreen();
          break;
        case 't':
        case 'T':
          h.toggleTheme();
          break;
        case 'o':
        case 'O':
          h.toggleSidebar();
          break;
        case 'q':
        case 'Q':
          h.toggleQa();
          break;
        case 's':
        case 'S':
          h.toggleNotes();
          break;
        case 'p':
          h.openPresenter();
          break;
        case 'P':
          h.toggleOverlay();
          break;
        case 'Escape':
          h.escape();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [h]);
}
