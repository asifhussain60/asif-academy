import type { WidgetEntry } from './types';
import { widgetRegistry } from './registry';

/**
 * Mutable widget registry that starts with the built-in set and is extended at startup by
 * tutorial-local widgets declared in `Tutorial.widgets`. Always use this (not the static
 * `widgetRegistry`) for runtime lookups so tutorial-local widgets resolve correctly.
 */
export const runtimeWidgetRegistry: Record<string, WidgetEntry> = {
  ...widgetRegistry,
};
