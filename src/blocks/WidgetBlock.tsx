import { runtimeWidgetRegistry } from '@/widgets/runtimeRegistry';
import type { SlideCtx } from '@/engine/types';

export function WidgetBlock({
  widgetId,
  params,
  ctx,
}: {
  widgetId: string;
  params?: Record<string, unknown>;
  ctx: SlideCtx;
}) {
  const entry = runtimeWidgetRegistry[widgetId];
  if (!entry) {
    return <div className="rounded-lg border border-dashed border-border p-6 text-fg-subtle">unknown widget: {widgetId}</div>;
  }
  const Component = entry.component;
  return <Component ctx={ctx} params={params} />;
}
