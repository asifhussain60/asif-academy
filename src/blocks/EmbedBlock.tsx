import clsx from 'clsx';

/** Aspect ratio → CSS `aspect-ratio` value. `a4` is a portrait document page. */
const ASPECT: Record<string, string> = {
  '16:9': '16 / 9',
  '4:3': '4 / 3',
  a4: '1 / 1.414',
};

/**
 * Embeds an external resource (a NotebookLM slide-deck PDF, a report, any iframe-able URL) as a
 * focal element in the deck's card frame — mirroring {@link ImageBlock}. The iframe is sized by
 * `aspect` and capped in height so a tall document never blows past the slide. In-iframe PDF
 * rendering varies by browser, so an always-present "Open in new tab" link is the reliable fallback.
 */
export function EmbedBlock({
  src,
  title,
  caption,
  aspect = '16:9',
}: {
  src: string;
  title: string;
  caption?: string;
  aspect?: '16:9' | '4:3' | 'a4';
}) {
  return (
    <figure className={clsx('mx-auto w-full max-w-4xl shrink-0 overflow-hidden rounded-lg border border-border bg-surface-2 shadow-sm')}>
      <div className="w-full" style={{ aspectRatio: ASPECT[aspect] ?? ASPECT['16:9'], maxHeight: '62vh' }}>
        <iframe src={src} title={title} className="h-full w-full" loading="lazy" />
      </div>
      <figcaption className="flex items-center justify-between gap-3 border-t border-border px-3 py-2 text-sm text-fg-subtle">
        <span>{caption}</span>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 whitespace-nowrap font-mono text-xs text-accent hover:underline"
        >
          Open in new tab ↗
        </a>
      </figcaption>
    </figure>
  );
}
