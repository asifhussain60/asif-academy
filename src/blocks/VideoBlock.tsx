import clsx from 'clsx';

/**
 * Extract a YouTube video id from a full URL (`watch?v=…`, `youtu.be/…`, `/embed/…`) or a bare id.
 * Returns null when `src` isn't recognizably YouTube, so the caller can fall back to a raw iframe.
 */
function youTubeId(src: string): string | null {
  // Bare 11-char id (YouTube ids are 11 chars of [A-Za-z0-9_-]).
  if (/^[\w-]{11}$/.test(src)) return src;
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') return url.pathname.slice(1) || null;
    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      if (url.pathname === '/watch') return url.searchParams.get('v');
      const m = url.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)/);
      if (m) return m[1];
    }
  } catch {
    /* not a URL — fall through */
  }
  return null;
}

/**
 * Renders a video as a focal element in the deck's card frame — the same shell as {@link ImageBlock},
 * so a NotebookLM video overview sits on a slide exactly like a comic or infographic does. YouTube
 * links use the privacy-friendly `youtube-nocookie.com` player; any other URL is embedded as-is.
 * Always 16:9 and centered (content → video → content), never pushed into a side column.
 */
export function VideoBlock({ src, title, caption }: { src: string; title: string; caption?: string }) {
  const id = youTubeId(src);
  const embedSrc = id ? `https://www.youtube-nocookie.com/embed/${id}` : src;

  return (
    <figure className={clsx('mx-auto w-full max-w-4xl shrink-0 overflow-hidden rounded-lg border border-border bg-surface-2 shadow-sm')}>
      <div className="relative aspect-video w-full">
        <iframe
          src={embedSrc}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      {caption && (
        <figcaption className="border-t border-border px-3 py-2 text-sm text-fg-subtle">{caption}</figcaption>
      )}
    </figure>
  );
}
