import type { WidgetEntry } from './types';

/**
 * Built-in widget registry: entries shared across tutorials (currently empty — none exist yet).
 * Tutorial-specific widgets live in `src/curricula/<id>/widgets/` and are registered at startup
 * via `Tutorial.widgets`, which the runtime registry merges in before any slide renders.
 *
 * Add shared, cross-tutorial widget entries here as the library grows.
 */
export const widgetRegistry: Record<string, WidgetEntry> = {};
