---
name: teaching-slide
description: >
  The authoritative standard for authoring ANY slide in this teaching deck. Load it whenever
  creating, splitting, or editing slides for a module (content, layout, visuals, readability,
  interactivity). Encodes every locked specification so module slide generation stays consistent.
  Pairs with the `teaching-script` skill (talking points) — load both when authoring.
---

# Teaching-slide authoring standard (LOCKED)

This is the contract for every slide. New module slides MUST satisfy it. When in doubt, copy the
already-conforming Foundations slides in `src/curricula/claude-code/lessons.ts`.

## 1. One idea per slide (non-negotiable)
- Each slide teaches **exactly one** thing. Two ideas → two slides.
- Headline is a **full-sentence assertion** (the takeaway), not a topic label.
  - ✅ "It's an agent — not a chatbot."  ❌ "Claude Code overview."
- The slide carries the headline + a short lead + **one dominant visual** + a few cues. Everything
  else (the detail, the elaboration) lives in `talkingPoints`, never as a wall of text on screen.

## 2. Every slide has a visual
- One focal visual per slide: an **SVG diagram** (`diagram` block, from the registry) — interactive
  where it helps — **or** a **Gemini comic** (`image` block, declared in `images.manifest.ts`).
- Diagrams fill their panel (no dead space). Comics: `kind: 'opener'` (mood/hero) vs
  `kind: 'teaching'` (must land ONE idea, carries a `teaches:` target).
- **After adding an image to `images.manifest.ts`, Claude Code MUST generate it immediately** by
  running `node scripts/gen-images.ts --only <id>` via Bash. Never tell Asif to run it manually —
  the Gemini key is already in the macOS keychain and the script reads it automatically. Only
  delegate to Asif if the Bash call fails with an auth error.

## 2b. Image placement (LOCKED)
- **Images are centered between content, never pushed to a side column.** The reading order is
  **content → image → content**: headline + lead above, the focal image centered, supporting cues
  (tiles/list/callout) below. Do **not** put an `image` inside a `two-column` as a side panel.
- Keep the image a focal element, not a full-bleed band: set `size` (`sm`/`md`/`lg`; default `full`)
  so the content beneath stays in view. `md` suits most teaching comics. The block always centers
  itself (`mx-auto`).
- A side-by-side comparison still uses `tiles` (or a diagram); the illustrating comic sits centered
  above or below it, not beside it.

## 2a. SVG diagram standard (LOCKED)
Diagrams are React components in `src/diagrams/`, registered in `registry.ts`, taking `{ step }`.

- **Breathing room.** Never crowd. ViewBox carries margin on all sides; nodes are spaced with a
  generous gap (≈40px+), connectors are **inset from node edges** (start/end a few px off the box),
  and labels/captions sit clear of arcs and edges — nothing touching. When in doubt, enlarge the
  viewBox rather than pack tighter. (Reference: `AgenticLoopDiagram.tsx`.)
- **One beat per reveal.** Gate each element to a `step` so the presenter can speak to it alone.
  Connectors/arcs **animate in** when their step is reached (`pathLength` 0→1) and the final/looping
  element gets its **own last step** — e.g. the loop-back arc appears only at the step *after* the
  last node, never with it. Don't reveal the whole diagram at once.
- **Interactive + synced.** Clickable nodes call `useDeckControls().goToStep(i)` so a click
  highlights the node AND drives the slide step (which updates `/present`). Position lives on an
  outer `<g transform>`; animate opacity/pathLength on an **inner** element so framer-motion's
  transform never clobbers the node's position.
- **Style.** Use theme tokens only (`var(--color-accent)`, `--color-surface-2`, `--color-border`,
  `--color-fg`, `--color-fg-muted`). Node titles in `var(--font-display)`; labels ≥ 14px. One
  shared arrowhead `<marker>`. Animations fade/draw, ≤ ~0.45s — no spin/bounce.

## 3. Readability (it's screen-shared to a room)
- **Content body text: 18px minimum.** Never smaller for anything the audience reads.
- Headlines large (Fraunces display). Eyebrow/captions/labels ≥ 14px. Nothing readable under 14px.
- **Color-code key concepts**: wrap the key phrase in `**bold**` — it renders as a clay highlight.
  Use sparingly (the keywords, not whole sentences).

## 4. Plain language + analogy + a little humor
- Before any jargon, give a one-line plain definition and an **everyday analogy** (desk, chess move,
  recipe, onboarding doc, sticky notes). Non-technical viewers must follow.
- One bit of **clever-but-elegant humor** per slide is plenty. Never goofy, never at the learner.
- For "X vs Y" contrasts use the **`tiles` block** (e.g. Chat vs Agent): the weaker option
  `tone:'muted'`, the key option `tone:'accent'`.

## 5. Depth on demand (don't crowd the slide)
- Put precise definitions, gotchas, and citations in **tooltips**: inline `[[label|key]]` →
  `slide.details[key]` (`{title, icon?, body, points?, analogy?, source?}`). Hover opens it; click
  pins it. Keep detail bodies scannable (bullets, bold key terms).

## 6. Interactivity
- Prefer interactive diagrams: clickable tiles that drive the slide **step** (via `useDeckControls`)
  so they highlight AND sync the `/present` window. Progressive reveal uses `slide.steps`.
- Animations: fade/appear only, ≤ ~0.35s. No spin/bounce.

## 7. Talking points + Q&A (presenter)
- `talkingPoints`: a **read-aloud, bulleted** script — see the **`teaching-script`** skill. Never
  stage directions. The standard is **engaging delivery**: each step **opens with the audience's
  question** and answers it, the steps **chain**, the voice is **"we/us"** not "you", and it reaches
  for imagination ("imagine if…") and spoken rhythm (rule of three, contrast). Flat assertion-prose
  is a defect.
- `faqs`: ~3 anticipated audience questions, tight answers, punchline **bolded**. Shown as an
  accordion in `/present`.

## 8. Continuity
- Thread the **running example** (the *Release Notes Assistant*) — each module adds one capability
  to that same project, so ideas accumulate.
- End a module with a "what you can now do" recap tied back to the running example.

## 9. Where things live (don't break the boundary)
- Content is **data** under `src/curricula/<id>/` (curriculum, lessons, showcase, images manifest,
  assets). Author there only — **never edit** `engine/`, `blocks/`, `diagrams/`, `widgets/`, `ui/`,
  `theme/` to add content. (Add a new diagram/widget to the framework only when a genuinely new
  visual is needed, then reference it by id.)
- Theme is fixed: dark-primary; Fraunces (display) · Inter (body) · JetBrains Mono (code) ·
  Comic Neue (analogies); clay/coral accent. Use semantic tokens (`text-fg`, `bg-surface`, etc.).

## Available block kinds
`heading` · `prose` (sm/base/lg) · `callout` (tip/warn/key/analogy) · `code` (Shiki + reveal) ·
`image` · `two-column` · `diagram` · `widget` · `list` (check/arrow/dot) · `tiles` · `spacer` ·
`custom`.

## Per-slide checklist (run before committing a slide)
- [ ] Exactly one idea; headline is a full-sentence assertion.
- [ ] **One** focal visual (diagram or comic); panel filled, not empty. Add a visual only where it
      earns its place — don't bolt on a second to fill space, and don't leave a concept slide visual-less.
- [ ] `talkingPoints` open with the audience's question and chain; voice is "we/us" (see `teaching-script`).
- [ ] Content body ≥ 18px; key phrases bolded for highlight; nothing < 14px.
- [ ] Plain definition + one analogy; ≤ one bit of humor; jargon defined.
- [ ] Depth pushed to tooltips (`details`) — slide isn't a wall of text.
- [ ] `talkingPoints` = bulleted read-aloud script (`teaching-script`), no stage directions.
- [ ] `faqs` present (≈3), punchlines bolded.
- [ ] Authored under `src/curricula/<id>/` only; `tsc -b` clean.

## MANDATORY: Run the challenger loop after every slide (LOCKED)

After authoring or editing ANY slide — new or existing — you MUST run the adversarial challenger
workflow on it before the work is done. This is not optional. Do not declare a slide finished
until the challenger reports zero critical/major defects.

**How to run it:**

```
Workflow({ name: 'slide-challenger', args: { slideIds: ['<slide-id>'] } })
```

Replace `<slide-id>` with the id of the slide you just authored or edited (e.g. `'sk-1'`).
For multiple slides edited in one pass: `args: { slideIds: ['sk-1', 'pd-1', 'ci-1'] }`.
To check all slides (e.g. after a broad refactor): omit `args` entirely.

**Loop behavior:** The workflow challenges, judges, fixes, and re-challenges in a loop until
zero critical/major defects remain or 4 iterations are exhausted. If it exits at the cap with
remaining defects, read the `finalVerify` output and fix manually before declaring done.

**The eight rules it enforces** (context: challenger has caused bugs to surface twice already):
1. `steps:N` alignment — talkingPoints arrays, diagram max step index, widget steps must all equal N.
2. Tooltip format — `[[display|key]]` order, display text FIRST.
3. Image block — `src` field not `imageId`.
4. CodeLang — `'md'` not `'markdown'`.
5. No stage directions in talkingPoints.
6. Teaching standard — one idea, sentence headline, one visual, 3 faqs.
7. SVG marker direction — back-arrow uses same shape as fwd, `refX=6`.
8. Voice — "we/us" default, "you" only at power beats.
