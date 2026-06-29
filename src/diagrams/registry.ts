import type { ComponentType } from 'react';
import type { DiagramProps } from './types';

/**
 * Built-in diagram registry: components shared across tutorials (currently empty — none exist yet).
 * Tutorial-specific diagrams live in `src/curricula/<id>/diagrams/` and are registered at startup
 * via `Tutorial.diagrams`, which the runtime registry merges in before any slide renders.
 *
 * Add shared, cross-tutorial diagram components here as the library grows.
 */
export const diagramRegistry: Record<string, ComponentType<DiagramProps>> = {};
