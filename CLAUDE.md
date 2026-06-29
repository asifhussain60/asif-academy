# Claude Code, Taught — project guide

An interactive, app-like presentation that teaches Claude Code. A reusable tutorial **engine**
(`src/engine`, `src/blocks`, `src/diagrams`, `src/widgets`, `src/detail`, `src/ui`, `src/presenter`,
`src/app`, `src/theme`) renders **data packages** under `src/curricula/<id>/`. Content is data; a new
curriculum is a new folder + a registry line, with zero engine edits.

## Authoring slides — MANDATORY standard

When creating, splitting, or editing ANY slide or module content, you MUST follow these skills
(they encode every locked specification and override default behavior):

- **`.claude/skills/teaching-slide`** — the slide standard: one idea per slide, full-sentence
  assertion headline, one focal visual (SVG diagram or Gemini comic) on every slide, **18px minimum
  content body text**, plain language + everyday analogy + light humor, depth pushed to hover
  tooltips, interactive diagrams, the *Release Notes Assistant* running example, and the
  framework/data boundary.
- **`.claude/skills/teaching-script`** — `talkingPoints` are a **verbatim, bulleted, read-aloud
  script** shown only in the `/present` window — never stage directions ("press the arrow"). Plus
  `faqs` (≈3 per slide, punchlines bolded).

Load BOTH before authoring. When unsure, mirror the already-conforming **Foundations** slides in
`src/curricula/claude-code/lessons.ts`.

## MANDATORY: Challenger loop after every slide edit (HARD GATE — cannot skip)

After authoring or editing ANY slide — new slide, edited content, diagram change, widget change —
you MUST run the adversarial challenger workflow before the work is considered done:

```
Workflow({ name: 'slide-challenger', args: { slideIds: ['<slide-id-1>', '<slide-id-2>'] } })
```

The workflow challenges each slide with 8 adversarial rules (steps:N alignment, tooltip format,
image block shape, code lang, stage directions, teaching standard, SVG marker direction, voice),
judges findings against the actual source files, applies fixes, and re-challenges — looping until
zero critical/major defects or 4 iterations.

**Do not commit, do not report the slide as done, and do not move to the next slide until the
challenger exits with zero critical/major defects.** If the 4-iteration cap is hit, fix the
remaining issues manually and run once more.

This gate exists because the same class of bug (`steps:N` misalignment, wrong tooltip order,
wrong image field name) has been introduced and then caught by user review twice. The challenger
catches it before it reaches the user.

## Conventions
- Theme is fixed: dark-primary; Fraunces (display) · Inter (body) · JetBrains Mono (code) ·
  Comic Neue (analogies); clay/coral accent. Use semantic tokens (`text-fg`, `bg-surface`, `text-accent`…).
- Gemini comics: declared in `src/curricula/<id>/images.manifest.ts`, generated at build time via
  `npm run gen:images`, committed as PNGs. Slides render a labeled placeholder until the asset lands.
- Verify with `npm run typecheck` (or `tsc -b`) and walk the deck + `/present` before calling done.
