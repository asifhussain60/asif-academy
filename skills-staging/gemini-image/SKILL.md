---
name: gemini-image
description: "Renderer skill that turns image briefs into finished PNGs via the Google Gemini image API (gemini-3-pro-image). ALWAYS invoke when the user says 'generate the images', 'render this image/brief', 'run gen:images', 'make the art', 'regenerate the illustration', or after the `teaching-illustration` skill has produced briefs to render. Content-agnostic engine: it takes a list of image specs + a STYLE PROFILE + an output dir and produces files — style is an input, never hardcoded, so the same engine serves a teaching deck, podcast covers, or journal headers. Reads the Gemini key from the macOS keychain (service=gemini_api_key, account=$USER) — the same key documented in podcast-factory/infra/llm-apis/README.md; the value never touches disk, repo, or shell history. Handles batch, skip-existing, --force regenerate, per-image error isolation, and a no-spend --dry-run. Anti-requirement: it does NOT decide what an image should depict or teach — that is the `teaching-illustration` skill. Spends a few cents per image on the user's Google billing; CONFIRM before a first real run. BOUNDARY: writes only image files into the caller's assets dir; never edits app/runtime code; never stores or prints the API key."
locked_decisions:
  - "Engine is content-agnostic. Style profile is an INPUT (per project), not baked into the engine."
  - "Key source = macOS keychain service=gemini_api_key (podcast-factory/infra/llm-apis). Never written to disk."
  - "Model default = gemini-3-pro-image (generateContent → inline PNG). Override with --model."
  - "Skip existing by default; --force to overwrite. Per-image failures are isolated, never abort the batch."
  - "No text in art is enforced by the STYLE profile's guardrails, supplied by the caller."
---

# gemini-image — Skill Overview

This skill is the **renderer / technician**. It knows nothing about pedagogy or any specific deck: hand it
specs + a style profile + an output dir and it produces files. The engine lives at
`scripts/render.ts` and is used either by import or by CLI.

## What this skill DOES

1. **Reads the key** from keychain at runtime (`security find-generic-password -s gemini_api_key -a $USER -w`).
2. **Composes each prompt**: `scene → shared palette → per-kind style → guardrails`, pulling the style from
   the caller's profile (`{ base, byKind: { opener, teaching }, guardrails }`).
3. **Calls Gemini** (`gemini-3-pro-image:generateContent`, `responseModalities:['IMAGE']`, `imageConfig.aspectRatio`)
   and extracts the inline PNG.
4. **Writes** `<assetsDir>/<id>.png`, skipping any that exist unless `--force`.
5. **Isolates failures** per image (reports and continues) and supports `--dry-run` (prints prompts, spends nothing).

## Usage

```bash
# CLI (any project): point it at a manifest + a style module + an output dir
node scripts/render.ts \
  --manifest <path to a module exporting `images`> \
  --style    <path to a module exporting `imageStyle`> \
  --assets   <output dir> \
  [--only a,b] [--force] [--dry-run] [--model <id>]
```

```ts
// Imported (a project wrapper that owns its paths — see this deck's scripts/gen-images.ts)
import { renderImages } from '.../gemini-image/scripts/render.ts';
await renderImages({ images, style: imageStyle, assetsDir, only, force, dryRun });
```

This deck wires it as `npm run gen:images` → a thin wrapper that supplies the deck's image list, style
profile, and assets dir, then calls the engine.

## What this skill does NOT do

- Does NOT decide what to depict or what an image teaches — that is the `teaching-illustration` skill.
- Does NOT hardcode a house style — the caller supplies the style profile, keeping the engine reusable.
- Does NOT store, log, echo, or commit the API key.
- Does NOT edit application or runtime code; it only writes image files into the caller's assets dir.
- Does NOT retry a hard API error endlessly or abort the whole batch on one failure.

## Cost & safety

A few cents per image on the user's Google billing (well under the documented $10/month cap). Because a real
run spends money, CONFIRM the briefs first (the `--dry-run` output is the review surface), then render.

## Reuse across content

To render a different kind of content: write a manifest (`export const images`) and a style profile
(`export const imageStyle` with `base` / `byKind` / `guardrails`), then call the engine with those paths.
No engine edits. That is the seam that makes this repeatable, extensible, and scalable.
