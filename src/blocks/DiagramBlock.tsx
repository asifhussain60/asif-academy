import { runtimeDiagramRegistry } from '@/diagrams/runtimeRegistry';

export function DiagramBlock({
  diagramId,
  params,
  caption,
  step,
}: {
  diagramId: string;
  params?: Record<string, unknown>;
  caption?: string;
  step: number;
}) {
  const Component = runtimeDiagramRegistry[diagramId];
  if (!Component) {
    return <div className="rounded-lg border border-dashed border-border p-6 text-fg-subtle">unknown diagram: {diagramId}</div>;
  }
  return (
    <figure className="shrink-0 rounded-xl border border-border bg-surface/40 p-4 shadow-sm">
      <Component step={step} params={params} />
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-sm text-fg-subtle">{caption}</figcaption>
      )}
    </figure>
  );
}
