import type { ComponentType } from 'react';
import type { SlideCtx } from '@/engine/types';

export interface WidgetProps {
  /** step / totalSteps / isPresenter, synced to slide navigation. */
  ctx: SlideCtx;
  /** Per-slide params from the widget block. */
  params?: Record<string, unknown>;
}

export interface WidgetEntry {
  component: ComponentType<WidgetProps>;
  label: string;
  /** Coarse reveal stages this widget opts into (the global step gates these). */
  steps?: number;
}
