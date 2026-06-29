/**
 * gen-images.ts — generate THIS deck's illustrations.
 *
 * A thin wrapper: it owns the deck's paths (image list, style profile, output dir) and delegates
 * all rendering to the portable engine in the `gemini-image` skill. The skill is the single source
 * of truth for how images are produced; this file only says *which* images and *what style*.
 *
 * Usage:
 *   node scripts/gen-images.ts                 # render any missing image
 *   node scripts/gen-images.ts --force         # regenerate all
 *   node scripts/gen-images.ts --only what-is-cc,release-notes-assistant
 *   node scripts/gen-images.ts --dry-run       # print composed prompts, call nothing
 */
import { resolve } from 'node:path';
import { renderImages } from '../skills-staging/gemini-image/scripts/render.ts';
import { images } from '../src/curricula/claude-code/images.manifest.ts';
import { imageStyle } from '../src/curricula/claude-code/image-style.ts';

const argv = process.argv.slice(2);
const onlyArg = argv.find((a) => a.startsWith('--only'));
const onlyRaw = onlyArg?.includes('=') ? onlyArg.split('=')[1] : argv[argv.indexOf('--only') + 1];

await renderImages({
  images,
  style: imageStyle,
  assetsDir: resolve(import.meta.dirname, '..', 'src', 'curricula', 'claude-code', 'assets'),
  only: onlyArg ? new Set(onlyRaw.split(',')) : null,
  force: argv.includes('--force'),
  dryRun: argv.includes('--dry-run'),
});
