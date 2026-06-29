import { createContext, useContext, type ReactNode } from 'react';
import type { Tutorial } from '@/engine/types';

const TutorialContext = createContext<Tutorial | null>(null);

export function TutorialProvider({ tutorial, children }: { tutorial: Tutorial; children: ReactNode }) {
  return <TutorialContext value={tutorial}>{children}</TutorialContext>;
}

export function useTutorial(): Tutorial {
  const t = useContext(TutorialContext);
  if (!t) throw new Error('useTutorial must be used within a TutorialProvider');
  return t;
}
