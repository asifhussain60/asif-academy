/**
 * render.ts — the portable rendering engine behind the `gemini-image` skill.
 *
 * Content-agnostic: it knows nothing about any specific deck. A caller hands it a list of image
 * specs + a style profile + an output dir, and it produces files via the Google Generative Language
 * API (gemini-3-pro-image → inline PNG). Style is an INPUT, never hardcoded — so the same engine
 * renders a teaching deck, a podcast cover, or a journal header by swapping the profile.
 *
 * Auth: the Gemini API key in the macOS keychain (service=gemini_api_key, account=$USER), the key
 * documented in podcast-factory/infra/llm-apis/README.md. The value never touches disk or history.
 *
 * Used two ways:
 *   1. Imported: `import { renderImages } from '.../render.ts'` then `await renderImages(config)`.
 *   2. CLI:      `node render.ts --manifest <m.ts> --style <s.ts> --assets <dir> [--only a,b] [--force] [--dry-run]`
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, resolve, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';

// ── Shapes (structural; callers pass plain objects) ─────────────────────────
export type ImageKind = 'opener' | 'teaching';

export interface ImageSpec {
  id: string;
  prompt: string;
  alt?: string;
  aspect?: string;
  kind?: ImageKind;
  teaches?: string;
}

export interface StyleProfile {
  base: string;
  byKind: Record<ImageKind, string>;
  guardrails: string;
}

export interface RenderConfig {
  images: ImageSpec[];
  style: StyleProfile;
  assetsDir: string;
  only?: Set<string> | null;
  force?: boolean;
  dryRun?: boolean;
  model?: string;
}

const DEFAULT_MODEL = 'gemini-3-pro-image';
const DEFAULT_ASPECT = '16:9';

function readKey(): string {
  try {
    const key = execFileSync(
      'security',
      ['find-generic-password', '-s', 'gemini_api_key', '-a', process.env.USER ?? '', '-w'],
      { encoding: 'utf8' },
    ).trim();
    if (!key) throw new Error('empty');
    return key;
  } catch {
    console.error(
      'ERROR: could not read the Gemini key from keychain (service=gemini_api_key).\n' +
        'Set it up with: bash ~/PROJECTS/podcast-factory/infra/llm-apis/bootstrap-llm-apis.sh',
    );
    process.exit(1);
  }
}

/** Compose the full prompt: scene → shared palette → per-kind style → guardrails. */
export function composePrompt(spec: ImageSpec, style: StyleProfile): string {
  const kind: ImageKind = spec.kind ?? 'teaching';
  return `${spec.prompt}.\n\n${style.base} ${style.byKind[kind]} ${style.guardrails}`;
}

interface InlinePart {
  inlineData?: { mimeType?: string; data?: string };
  inline_data?: { mime_type?: string; data?: string };
  text?: string;
}

async function callGemini(key: string, model: string, prompt: string, aspect: string): Promise<Buffer> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: aspect } },
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as {
    candidates?: { content?: { parts?: InlinePart[] } }[];
    error?: { message?: string };
  };
  if (!res.ok || json.error) {
    throw new Error(`API ${res.status}: ${json.error?.message ?? JSON.stringify(json).slice(0, 300)}`);
  }
  for (const p of json.candidates?.[0]?.content?.parts ?? []) {
    const data = p.inlineData?.data ?? p.inline_data?.data;
    if (data) return Buffer.from(data, 'base64');
  }
  throw new Error(`no image part in response: ${JSON.stringify(json).slice(0, 300)}`);
}

/** Render a set of images. Skips existing unless `force`; isolates per-image failures. */
export async function renderImages(cfg: RenderConfig): Promise<{ ok: string[]; failed: string[] }> {
  const model = cfg.model ?? DEFAULT_MODEL;
  mkdirSync(cfg.assetsDir, { recursive: true });

  const targets = cfg.images.filter((img) => (cfg.only ? cfg.only.has(img.id) : true));
  const ok: string[] = [];
  const failed: string[] = [];

  if (!targets.length) {
    console.log('Nothing to render (no specs matched).');
    return { ok, failed };
  }

  const key = cfg.dryRun ? '' : readKey();
  console.log(`Model: ${model} · ${targets.length} image(s)${cfg.dryRun ? ' · DRY RUN' : ''}\n`);

  for (const img of targets) {
    const out = join(cfg.assetsDir, `${img.id}.png`);
    const aspect = img.aspect ?? DEFAULT_ASPECT;
    const kind: ImageKind = img.kind ?? 'teaching';

    // Discipline check: a teaching image with no declared target is probably decoration.
    if (kind === 'teaching' && !img.teaches) {
      console.log(`• ${img.id} — WARN: teaching image with no \`teaches\` target (decoration?). Rendering anyway.`);
    }

    if (!cfg.force && !cfg.dryRun && existsSync(out)) {
      console.log(`• ${img.id} — exists, skipping (use --force to regenerate)`);
      continue;
    }

    const prompt = composePrompt(img, cfg.style);
    if (cfg.dryRun) {
      console.log(`• ${img.id}  [${kind}, ${aspect}]${img.teaches ? `\n  teaches: ${img.teaches}` : ''}\n  ${prompt.replace(/\n+/g, ' ')}\n`);
      continue;
    }

    process.stdout.write(`• ${img.id}  [${kind}, ${aspect}] … `);
    try {
      const png = await callGemini(key, model, prompt, aspect);
      writeFileSync(out, png);
      console.log(`saved ${(png.length / 1024).toFixed(0)} KB → ${img.id}.png`);
      ok.push(img.id);
    } catch (err) {
      console.log('FAILED');
      console.error(`  ${(err as Error).message}`);
      failed.push(img.id);
    }
  }
  return { ok, failed };
}

// ── CLI entry ───────────────────────────────────────────────────────────────
async function importDefault<T>(p: string, name: string): Promise<T> {
  const abs = isAbsolute(p) ? p : resolve(process.cwd(), p);
  const mod = (await import(pathToFileURL(abs).href)) as Record<string, unknown>;
  const val = mod[name] ?? mod.default;
  if (!val) throw new Error(`${p} does not export \`${name}\``);
  return val as T;
}

function flag(argv: string[], name: string): string | undefined {
  const eq = argv.find((a) => a.startsWith(`--${name}=`));
  if (eq) return eq.split('=').slice(1).join('=');
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
}

async function cli() {
  const argv = process.argv.slice(2);
  const manifestPath = flag(argv, 'manifest');
  const stylePath = flag(argv, 'style');
  const assetsDir = flag(argv, 'assets');
  if (!manifestPath || !stylePath || !assetsDir) {
    console.error('Usage: node render.ts --manifest <m.ts> --style <s.ts> --assets <dir> [--only a,b] [--force] [--dry-run] [--model <id>]');
    process.exit(1);
  }
  const onlyRaw = flag(argv, 'only');
  await renderImages({
    images: await importDefault<ImageSpec[]>(manifestPath, 'images'),
    style: await importDefault<StyleProfile>(stylePath, 'imageStyle'),
    assetsDir: isAbsolute(assetsDir) ? assetsDir : resolve(process.cwd(), assetsDir),
    only: onlyRaw ? new Set(onlyRaw.split(',')) : null,
    force: argv.includes('--force'),
    dryRun: argv.includes('--dry-run'),
    model: flag(argv, 'model'),
  });
}

// Run as CLI only when invoked directly (not when imported).
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  cli();
}
