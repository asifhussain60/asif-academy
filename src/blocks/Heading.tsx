import clsx from 'clsx';
import type { DetailContent } from '@/engine/types';
import { renderInline } from '@/detail/renderInline';

export function Heading({
  text,
  eyebrow: _eyebrow,
  level = 2,
  question,
  details,
}: {
  text: string;
  eyebrow?: string;
  level?: 1 | 2 | 3;
  question?: string;
  details?: Record<string, DetailContent>;
}) {
  const Tag = (`h${level}` as 'h1' | 'h2' | 'h3');

  const headingEl = (
    <Tag
      className={clsx(
        'font-sans font-bold text-fg',
        level === 1 && 'text-3xl md:text-4xl',
        level === 2 && 'text-xl md:text-2xl',
        level === 3 && 'text-lg md:text-xl',
      )}
    >
      {renderInline(text, details)}
    </Tag>
  );

  if (question) {
    return (
      <div className="rounded-xl border border-border bg-surface/40 p-4 text-center shadow-sm">
        <p className="mb-2 font-question text-[2.3rem] leading-tight text-accent-2">{question}</p>
        {headingEl}
      </div>
    );
  }

  return <div>{headingEl}</div>;
}
