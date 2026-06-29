import { PlaceholderWidget } from '@/widgets/PlaceholderWidget';
import type { WidgetEntry } from '@/widgets/types';
import { AgenticTerminalWidget } from './AgenticTerminalWidget';
import { BuildingBlocksAnalogyWidget } from './BuildingBlocksAnalogyWidget';
import { DecisionMatrixWidget } from './DecisionMatrixWidget';
import { SlashPlaygroundWidget } from './SlashPlaygroundWidget';
import { ModuleRoadmapWidget } from './ModuleRoadmapWidget';
import { BuildASkillWidget } from './BuildASkillWidget';
import { ProgressiveDisclosureWidget } from './ProgressiveDisclosureWidget';
import { ModelPickerWidget } from './ModelPickerWidget';

/**
 * Widget entries owned by the claude-code tutorial. Registered into the runtime registry at
 * startup via `Tutorial.widgets` — no engine folder edits needed to add a new tutorial.
 */
export const claudeCodeWidgets: Record<string, WidgetEntry> = {
  'agentic-terminal': { component: AgenticTerminalWidget, label: 'Agentic loop terminal', steps: 5 },
  'decision-matrix': { component: DecisionMatrixWidget, label: 'Decision matrix' },
  'slash-playground': { component: SlashPlaygroundWidget, label: 'Slash command playground' },
  'module-roadmap': { component: ModuleRoadmapWidget, label: 'Build-it-across-modules roadmap', steps: 4 },
  'building-blocks-analogy': { component: BuildingBlocksAnalogyWidget, label: 'Building-blocks analogy (synced)', steps: 3 },
  'progressive-disclosure': { component: ProgressiveDisclosureWidget, label: 'Progressive disclosure tiles', steps: 3 },
  'build-a-skill': { component: BuildASkillWidget, label: 'Label vs trigger — description comparison' },
  'model-picker': { component: ModelPickerWidget, label: 'Model picker — task to model matching' },
  // Phase-B stubs
  'hook-lifecycle': { component: PlaceholderWidget, label: 'Hook lifecycle' },
};
