import type { ReactNode } from 'react';
import type { DetailContent } from '@/engine/types';
import { DetailMark } from './DetailMark';

/**
 * Lightweight inline renderer for slide prose. Supports a small, deliberate subset:
 *   **bold**            → <strong>
 *   `code`              → <code>
 *   [[label|key]]       → a DetailMark whose hover/click reveals slide.details[key]
 *   [[term]]            → DetailMark using `term` as both label and details key
 * Anything else is plain text. Intentionally not a full markdown engine — content is data, and
 * the rich stuff lives in blocks/widgets, not in prose strings.
 */
// Order matters: **bold** must precede *italic* so it isn't split into two emphases.
const TOKEN = /(\[\[[^\]]+\]\]|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;

export function renderInline(
  text: string,
  details?: Record<string, DetailContent>,
): ReactNode[] {
  const out: ReactNode[] = [];
  const parts = text.split(TOKEN);
  parts.forEach((part, i) => {
    if (!part) return;
    if (part.startsWith('[[') && part.endsWith(']]')) {
      const inner = part.slice(2, -2);
      const [label, key] = inner.includes('|') ? inner.split('|') : [inner, inner];
      const detail = details?.[key.trim()];
      out.push(
        detail ? (
          <DetailMark key={i} label={label.trim()} detail={detail} />
        ) : (
          <span key={i}>{label.trim()}</span>
        ),
      );
    } else if (part.startsWith('**') && part.endsWith('**')) {
      out.push(<strong key={i}>{part.slice(2, -2)}</strong>);
    } else if (part.startsWith('*') && part.endsWith('*')) {
      out.push(<em key={i}>{part.slice(1, -1)}</em>);
    } else if (part.startsWith('`') && part.endsWith('`')) {
      out.push(
        <code key={i} className="font-mono text-[0.9em] text-accent bg-accent-soft rounded px-1 py-0.5">
          {part.slice(1, -1)}
        </code>,
      );
    } else {
      out.push(<span key={i}>{part}</span>);
    }
  });
  return out;
}
