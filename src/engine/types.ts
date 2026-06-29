import type { ComponentType, ReactNode } from 'react';
import type { DiagramProps } from '@/diagrams/types';
import type { WidgetEntry } from '@/widgets/types';

/** Slide layout shells. */
export type Layout = 'title' | 'center' | 'two-column' | 'stage' | 'full-bleed';

/** Background treatment for a slide. */
export type Background = 'default' | 'spotlight' | 'grid';

export type CodeLang =
  | 'bash'
  | 'ts'
  | 'tsx'
  | 'json'
  | 'jsonc'
  | 'md'
  | 'yaml'
  | 'diff'
  | 'text';

/**
 * Rich content that a DetailMark reveals on hover (tooltip) / click (popover).
 * Authored once per slide in `details`, referenced inline by key.
 */
export interface DetailContent {
  /** Short bold lead shown at the top of the tooltip/popover. */
  title: string;
  /** Optional glyph/emoji shown in the tooltip header (defaults to a spark). */
  icon?: string;
  /** Plain-language explanation (supports the same lightweight inline markdown as prose). */
  body: string;
  /** Optional scannable bullets (bold key terms with **…**); rendered as a color-coded list. */
  points?: string[];
  /** Optional everyday analogy, rendered with a distinct accent. */
  analogy?: string;
  /** Optional tiny code sample inside the detail. */
  code?: { lang: CodeLang; code: string };
  /** Optional source citation, e.g. a docs URL or label. */
  source?: { label: string; href?: string };
}

/** Anticipated audience question + its answer. */
export interface Faq {
  q: string;
  a: string;
}

/** Discriminated union of all renderable blocks. */
export type Block =
  | { kind: 'heading'; text: string; eyebrow?: string; level?: 1 | 2 | 3; question?: string }
  | { kind: 'prose'; md: string; size?: 'sm' | 'base' | 'lg' }
  | { kind: 'callout'; tone: 'tip' | 'warn' | 'key' | 'analogy'; md: string; label?: string }
  | {
      kind: 'code';
      lang: CodeLang;
      code: string;
      filename?: string;
      /** Lines highlighted at all times (1-based). */
      highlight?: number[];
      /** Lines revealed per step: revealSteps[step] = array of 1-based line numbers. */
      revealSteps?: number[][];
    }
  | { kind: 'image'; src: string; alt: string; caption?: string; size?: 'sm' | 'md' | 'lg' | 'full' }
  | { kind: 'two-column'; left: Block[]; right: Block[]; ratio?: [number, number] }
  | { kind: 'diagram'; diagramId: string; params?: Record<string, unknown>; caption?: string }
  | { kind: 'widget'; widgetId: string; params?: Record<string, unknown> }
  | { kind: 'list'; items: string[]; ordered?: boolean; marker?: 'check' | 'arrow' | 'dot' }
  | { kind: 'tiles'; tiles: TileDef[]; columns?: number }
  | { kind: 'spacer'; size?: 'sm' | 'md' | 'lg' }
  | { kind: 'custom'; render: (ctx: SlideCtx) => ReactNode };

/** A definition/comparison card rendered inside a `tiles` block. */
export interface TileDef {
  title: string;
  /** Short body (supports inline **bold** / `code` / [[detail]] markup). */
  body: string;
  icon?: string;
  /** accent = highlighted (the "good"/key option); muted = de-emphasized contrast. */
  tone?: 'default' | 'accent' | 'muted';
}

/** Context passed to step-aware blocks, diagrams, and widgets. */
export interface SlideCtx {
  /** Current sub-step within the slide (0-based). */
  step: number;
  /** Total sub-steps for this slide. */
  totalSteps: number;
  /** Whether the presenter overlay is active. */
  isPresenter: boolean;
  /** Per-slide detail map, for inline DetailMark resolution. */
  details?: Record<string, DetailContent>;
}

export interface Slide {
  /** Unique within its lesson; appears in the URL step index. */
  id: string;
  layout: Layout;
  blocks: Block[];
  /** Number of sub-steps; default 1. Drives synced reveal of diagrams/code/widgets. */
  steps?: number;
  /** Speaker notes (lightweight markdown). */
  notes?: string;
  /** Inline-detail map referenced by DetailMark tokens in prose/heading/callout text. */
  details?: Record<string, DetailContent>;
  /** Anticipated audience Q&A, shown via the on-slide toggle + mirrored to the presenter view. */
  faqs?: Faq[];
  /**
   * Private presenter talking points — the **verbatim read-aloud script**, shown ONLY in the
   * /present window. NOT stage directions ("press the arrow"): write what the presenter actually
   * says. Authoring standard: see `.claude/skills/teaching-script`.
   *
   * Shapes (all supported):
   *  - `string[][]` — PREFERRED. [step][bullet]: each step is a list of short spoken bullets,
   *    rendered as clearly separated bullet points and advanced in sync with the slide step.
   *  - `string[]`   — legacy: one paragraph per step (rendered as a single bullet).
   *  - `string`     — legacy: one paragraph for the whole slide.
   */
  talkingPoints?: string | string[] | string[][];
  /** When true, ←/→/Space are yielded to a focused widget; PageDn/PageUp/buttons still advance. */
  captureKeys?: boolean;
  background?: Background;
  /** Rough minutes budgeted for this slide (summed for pacing). */
  estMinutes?: number;
}

export interface Lesson {
  id: string;
  title: string;
  /** One-line intent shown in the sidebar tooltip. */
  blurb?: string;
  estMinutes?: number;
  slides: Slide[];
}

export interface Module {
  id: string;
  title: string;
  blurb: string;
  /** Ordered lesson ids, resolved against the lesson map. */
  lessonIds: string[];
}

/**
 * What an image is FOR. Drives which style preset the renderer applies and whether it must
 * carry a teaching target.
 *  - 'opener'  : a mood / section-opener illustration (the hero). Aesthetic, exempt from teaching.
 *  - 'teaching': an in-content comic that must make exactly one idea click. Requires `teaches`.
 */
export type ImageKind = 'opener' | 'teaching';

/** One curated, build-time-generated image. */
export interface ImageEntry {
  /** Stable id; also the asset filename stem (`<id>.png`) and how a block references it. */
  id: string;
  /** Generation prompt (the house-style prefix is added by the pipeline, not stored here). */
  prompt: string;
  /** Accessible alt text. */
  alt: string;
  /** Aspect ratio for generation, e.g. '16:9', '4:3', '1:1'. Defaults to '16:9'. */
  aspect?: string;
  /** What the image is for; selects the render style preset. Defaults to 'teaching'. */
  kind?: ImageKind;
  /**
   * The single idea a teaching image must land (one sentence, plain English). Authored by the
   * `teaching-illustration` skill; documents intent and is the self-test for "does this earn its slot?"
   * Omitted for 'opener' images.
   */
  teaches?: string;
}

export type ImageManifest = ImageEntry[];

/** Optional per-tutorial theme overrides (applied as inline CSS vars on the deck root). */
export interface ThemeTokens {
  accent: string;
  accent2: string;
  fontDisplay: string;
  fontSans: string;
  fontMono: string;
}

/**
 * A self-contained tutorial DATA package. The framework renders any Tutorial; a brand-new tutorial
 * is authored as data only (this object + its assets) and registered — zero engine edits.
 *
 * Tutorial-local diagrams and widgets are declared here and merged into the runtime registries at
 * startup by `src/curricula/index.ts`. This keeps engine folders free of tutorial-specific
 * components: adding a new tutorial never requires touching `src/diagrams/` or `src/widgets/`.
 */
export interface Tutorial {
  /** URL + storage namespace, e.g. 'claude-code'. */
  id: string;
  title: string;
  blurb?: string;
  modules: Module[];
  lessons: Record<string, Lesson>;
  /** Build-time image manifest (generated by the gemini-image skill into ./assets). */
  images?: ImageManifest;
  /** Tutorial-scoped asset map: id → resolved URL (via import.meta.glob in the package). */
  assets?: Record<string, string>;
  /** Optional theme overrides; defaults to the house theme. */
  theme?: Partial<ThemeTokens>;
  /**
   * Tutorial-local diagram components, keyed by the id used in `{ kind: 'diagram', diagramId }` blocks.
   * Merged into the runtime diagram registry at startup. IDs must be globally unique across tutorials.
   */
  diagrams?: Record<string, ComponentType<DiagramProps>>;
  /**
   * Tutorial-local widget entries, keyed by the id used in `{ kind: 'widget', widgetId }` blocks.
   * Merged into the runtime widget registry at startup. IDs must be globally unique across tutorials.
   */
  widgets?: Record<string, WidgetEntry>;
}
