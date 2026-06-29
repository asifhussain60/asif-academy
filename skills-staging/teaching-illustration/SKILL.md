---
name: teaching-illustration
description: "Art-director skill that designs INSTRUCTIONAL images — pictures whose job is to teach one idea, not decorate. ALWAYS invoke when the user says 'teaching illustration', 'design an image for this slide/concept', 'what should this picture teach', 'make this image instructional', 'comic for this concept', or when planning art for a slide deck, lesson, explainer, podcast cover, or chapter header. Produces a structured comic BRIEF (teaching target + visual metaphor + composition + elements + alt text); it does NOT render pixels — hand the brief to the `gemini-image` skill for that. Content-agnostic: works for any teaching surface. Core doctrine: every in-content image must make exactly ONE idea click, in a bold comic/cartoon idiom, with NO lettering inside the art (the headline carries the words). Anti-requirement: never produce decoration dressed up as teaching — if removing the image costs the audience no understanding, it has no target and should be cut. BOUNDARY: reads only the concept and its surrounding teaching context the user provides; writes only image briefs/manifest entries; never edits app/runtime code and never calls an image API itself."
locked_decisions:
  - "Pedagogy and rendering are SEPARATE skills. This one decides WHAT/▢ WHY; `gemini-image` decides HOW."
  - "Openers/section headers are exempt (mood is allowed). Every OTHER image must declare a `teaches` target."
  - "No text inside generated art, ever — labels are icons/shapes; the slide headline carries words."
  - "Style is supplied by the content project's profile, not chosen here — keeps the brief style-portable."
---

# teaching-illustration — Skill Overview

This skill is the **art director / pedagogue** for generated images. Given a concept and the context it
appears in, it decides the single thing the picture must teach and the comic that teaches it. Its output
is a **brief** (data), consumed by the `gemini-image` skill, which renders it.

## What this skill DOES

1. **Names the teaching target.** One sentence, plain English: the single idea the image must make click.
   (e.g. "An agent ACTS on your real project; a chatbot hands back one reply and stops.")
2. **Picks a teaching composition** — the structure that carries the idea, favouring contrast:
   - `this-not-that` (two panels) — for a distinction (agent vs. chatbot).
   - `before-after` — for a transformation in state.
   - `input-transform-output` (left→right) — for a pipeline/what-it-does.
   - `sequence` (2–4 beats) — for a process/loop.
   - `single-metaphor` — only when one vivid image already isolates the idea.
3. **Chooses a concrete visual metaphor** and the characters/props that embody it.
4. **Writes the scene prompt** in the comic idiom: bold, exaggerated, expressive, readable at a glance,
   labels as icons/shapes — and explicitly **no text**.
5. **Sets `aspect` and `alt`**, and emits a manifest-ready entry:
   `{ id, kind: 'teaching', aspect, teaches, prompt, alt }`.

## The self-test (mandatory before emitting a brief)

> **"If this image vanished, what would the audience fail to understand?"**
> If the honest answer is "nothing," the image is decoration — either find the real target or cut it.
> A brief without a crisp `teaches` line does not ship.

## What this skill does NOT do

- Does NOT render images or call any API — that is the `gemini-image` skill. It hands off a brief.
- Does NOT choose the house style (palette/medium) — the content project's style profile owns that, so a
  brief stays portable across looks.
- Does NOT design openers/heroes/section dividers as teaching panels — those may be pure mood (`kind: 'opener'`).
- Does NOT put words inside art, and does NOT replace structural diagrams: precise, labelled, or
  interactive content stays an SVG/diagram. Comics carry metaphor and contrast, not exact schematics.
- Does NOT touch runtime/app code.

## Where a brief goes

A finished brief is appended to the content project's image manifest (for this deck:
`src/tutorials/claude-code/images.manifest.ts`) and referenced from a slide's `image` block by `id`.
Rendering is then a single call to the `gemini-image` skill.

## Reuse across content

The same doctrine drives a slide deck, a podcast cover, or a journal chapter header — only the *context*
and the *style profile* differ. Keep the `teaches` discipline; swap the surface.
