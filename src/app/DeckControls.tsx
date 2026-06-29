import { createContext, useContext, type ReactNode } from 'react';

/**
 * Lets in-slide visuals (e.g. a diagram) drive the slide's step. Changing the step navigates,
 * which broadcasts the new position to the open /present window — so clicking a diagram tile
 * updates the presenter's read-aloud script. Defaults to a no-op so visuals render safely
 * outside a deck (previews, tests).
 */
export interface DeckControls {
  goToStep: (step: number) => void;
}

const DeckControlsContext = createContext<DeckControls>({ goToStep: () => {} });

export function DeckControlsProvider({ value, children }: { value: DeckControls; children: ReactNode }) {
  return <DeckControlsContext value={value}>{children}</DeckControlsContext>;
}

export function useDeckControls(): DeckControls {
  return useContext(DeckControlsContext);
}
