import type { Tutorial } from '@/engine/types';
import { claudeCodeTutorial } from './claude-code/tutorial';
import { validateTutorial } from '@/engine/validate';
import { runtimeDiagramRegistry } from '@/diagrams/runtimeRegistry';
import { runtimeWidgetRegistry } from '@/widgets/runtimeRegistry';

/**
 * Tutorial registry. A brand-new tutorial plugs in by adding its data package folder and ONE
 * line here — the React app is never touched. Each is shape-checked at import so a malformed
 * tutorial fails fast with a clear message instead of a blank slide.
 *
 * Tutorial-local diagrams and widgets declared in `Tutorial.diagrams` / `Tutorial.widgets` are
 * merged into the runtime registries here, before validation, so the validator sees the full set.
 */
export const tutorials: Record<string, Tutorial> = {
  [claudeCodeTutorial.id]: claudeCodeTutorial,
};

export const defaultTutorialId = claudeCodeTutorial.id;

// Merge tutorial-local diagrams and widgets into the runtime registries BEFORE validation runs,
// so the validator's registry checks cover both built-in and tutorial-local IDs.
for (const t of Object.values(tutorials)) {
  if (t.diagrams) Object.assign(runtimeDiagramRegistry, t.diagrams);
  if (t.widgets) Object.assign(runtimeWidgetRegistry, t.widgets);
}

for (const t of Object.values(tutorials)) validateTutorial(t);

export function getTutorial(id: string | undefined): Tutorial | undefined {
  return id ? tutorials[id] : undefined;
}
