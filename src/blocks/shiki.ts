import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import type { CodeLang } from '@/engine/types';

// Fine-grained imports: only the languages/themes the curriculum uses are bundled, and the
// JS regex engine avoids shipping the ~600 kB Oniguruma WASM. This is the "USED_LANGS allowlist".
import bash from '@shikijs/langs/bash';
import ts from '@shikijs/langs/typescript';
import tsx from '@shikijs/langs/tsx';
import json from '@shikijs/langs/json';
import jsonc from '@shikijs/langs/jsonc';
import md from '@shikijs/langs/markdown';
import yaml from '@shikijs/langs/yaml';
import diff from '@shikijs/langs/diff';
import vitesseDark from '@shikijs/themes/vitesse-dark';
import vitesseLight from '@shikijs/themes/vitesse-light';

let highlighterPromise: Promise<HighlighterCore> | null = null;

/** Lazily create + pre-warm a single shared highlighter (lean: only our langs + JS engine). */
export function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [vitesseDark, vitesseLight],
      langs: [bash, ts, tsx, json, jsonc, md, yaml, diff],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
}

const LANG_ALIAS: Partial<Record<CodeLang, string>> = {
  md: 'markdown',
  text: 'text',
};

export function shikiLang(lang: CodeLang): string {
  return LANG_ALIAS[lang] ?? lang;
}

export function shikiTheme(theme: 'dark' | 'light'): string {
  return theme === 'dark' ? 'vitesse-dark' : 'vitesse-light';
}
