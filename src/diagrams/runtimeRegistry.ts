import type { ComponentType } from 'react';
import type { DiagramProps } from './types';
import { diagramRegistry } from './registry';

/**
 * Mutable diagram registry that starts with the built-in set and is extended at startup by
 * tutorial-local diagrams declared in `Tutorial.diagrams`. Always use this (not the static
 * `diagramRegistry`) for runtime lookups so tutorial-local diagrams resolve correctly.
 */
export const runtimeDiagramRegistry: Record<string, ComponentType<DiagramProps>> = {
  ...diagramRegistry,
};
