import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light';

interface DeckState {
  // UI / presenter (ephemeral, except theme which persists)
  theme: Theme;
  presenter: boolean;
  sidebarOpen: boolean;
  qaOpen: boolean;
  notesOpen: boolean;
  startedAt: number | null;

  // progress (persisted)
  visited: Record<string, true>;

  // actions
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  togglePresenter: () => void;
  toggleSidebar: () => void;
  toggleQa: () => void;
  setQa: (open: boolean) => void;
  toggleNotes: () => void;
  setNotes: (open: boolean) => void;
  markVisited: (key: string) => void;
  startTimer: () => void;
  resetTimer: () => void;
}

export const useDeck = create<DeckState>()(
  persist(
    (set) => ({
      theme: 'dark',
      presenter: false,
      sidebarOpen: false, // collapsed by default so the deck sits narrow for side-by-side presenting
      qaOpen: false,
      notesOpen: false,
      startedAt: null,
      visited: {},

      toggleTheme: () =>
        set((s) => {
          const theme: Theme = s.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', theme);
          return { theme };
        }),
      setTheme: (theme) =>
        set(() => {
          document.documentElement.setAttribute('data-theme', theme);
          return { theme };
        }),
      togglePresenter: () => set((s) => ({ presenter: !s.presenter })),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      toggleQa: () => set((s) => ({ qaOpen: !s.qaOpen })),
      setQa: (qaOpen) => set({ qaOpen }),
      toggleNotes: () => set((s) => ({ notesOpen: !s.notesOpen })),
      setNotes: (notesOpen) => set({ notesOpen }),
      markVisited: (key) => set((s) => (s.visited[key] ? s : { visited: { ...s.visited, [key]: true } })),
      startTimer: () => set((s) => (s.startedAt ? s : { startedAt: Date.now() })),
      resetTimer: () => set({ startedAt: Date.now() }),
    }),
    {
      name: 'asif-academy',
      // Persist ONLY progress + theme. Position lives in the URL; presenter/qa/sidebar are ephemeral.
      partialize: (s) => ({ visited: s.visited, theme: s.theme }),
    },
  ),
);
