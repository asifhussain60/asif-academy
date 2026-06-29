import { useEffect, useState } from 'react';
import clsx from 'clsx';
import type { ThemedToken } from 'shiki';
import type { CodeLang } from '@/engine/types';
import { useDeck } from '@/app/store';
import { getHighlighter, shikiLang, shikiTheme } from './shiki';

interface Props {
  lang: CodeLang;
  code: string;
  filename?: string;
  highlight?: number[];
  /** revealSteps[step] = 1-based line numbers visible at that step (cumulative by convention). */
  revealSteps?: number[][];
  step?: number;
}

export function CodeBlock({ lang, code, filename, highlight = [], revealSteps, step = 0 }: Props) {
  const theme = useDeck((s) => s.theme);
  const [lines, setLines] = useState<ThemedToken[][] | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    getHighlighter().then((hl) => {
      if (!alive) return;
      const { tokens } = hl.codeToTokens(code, {
        lang: shikiLang(lang),
        theme: shikiTheme(theme),
      });
      setLines(tokens);
    });
    return () => {
      alive = false;
    };
  }, [code, lang, theme]);

  const revealed = revealSteps?.[Math.min(step, revealSteps.length - 1)];
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };

  return (
    <div className="group relative shrink-0 overflow-hidden rounded-lg border border-border bg-surface-2 shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <span className="font-mono text-[11px] text-fg-subtle">{filename ?? lang}</span>
        <button
          onClick={copy}
          className="font-mono text-[11px] text-fg-subtle opacity-0 transition group-hover:opacity-100 hover:text-accent"
        >
          {copied ? 'copied ✓' : 'copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-3.5 text-[13.5px] leading-[1.6]">
        <code className="font-mono">
          {lines === null
            ? code.split('\n').map((l, i) => <div key={i}>{l || ' '}</div>)
            : lines.map((tokens, i) => {
                const lineNo = i + 1;
                const isHi = highlight.includes(lineNo);
                const isHidden = revealed ? !revealed.includes(lineNo) : false;
                return (
                  <div
                    key={i}
                    className={clsx(
                      '-mx-3.5 px-3.5 transition-opacity duration-300',
                      isHi && 'bg-accent-soft',
                      isHidden && 'opacity-25',
                    )}
                  >
                    {tokens.length === 0 ? (
                      ' '
                    ) : (
                      tokens.map((t, j) => (
                        <span key={j} style={{ color: t.color }}>
                          {t.content}
                        </span>
                      ))
                    )}
                  </div>
                );
              })}
        </code>
      </pre>
    </div>
  );
}
