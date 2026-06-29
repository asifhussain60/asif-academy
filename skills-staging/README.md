# skills-staging/

Authoring home for reusable skills, following the same convention as `podcast-factory/skills-staging`
and `journal/skills-staging`: one folder per skill, each with a `SKILL.md`. Author here, then promote to
`~/.claude/skills/<name>/` (global) or mirror into another project's `skills-staging/` when ready.

## The teaching-image set

Two skills with a clean seam between **what** and **how** — that separation is what makes them repeatable,
extensible, and regression-safe.

| Skill | Role | Decides | Calls an API? |
|---|---|---|---|
| `teaching-illustration` | Art director / pedagogue | The one idea each image must teach + the comic that teaches it (a brief) | No |
| `gemini-image` | Renderer / technician | How to turn a brief + a style profile into a finished file via Gemini | Yes |

### How they compose

```
concept + context
      │  teaching-illustration  (designs the brief: teaches + composition + prompt + aspect + alt)
      ▼
image manifest entry  ──►  gemini-image  (manifest + style profile → assets/<id>.png)
      ▼
slide `image` block references the id
```

### The extensibility seam

Style lives with the **content**, not the renderer. Each project supplies a profile of shape
`{ base, byKind: { opener, teaching }, guardrails }` (this deck: `src/tutorials/claude-code/image-style.ts`).
Swap the profile → same skills produce a watercolor journal or a podcast cover. No engine edits.

### Doctrine (non-negotiable)

- Openers/heroes may be pure mood. **Every other image declares a `teaches` target or it is cut.**
- **No text inside generated art** — the slide headline carries words; labels are icons/shapes.
- Precise/labelled/interactive content stays an **SVG diagram or widget**; comics carry metaphor & contrast.

### Promotion path

These are written content-agnostic. To make them global: copy `gemini-image/` and `teaching-illustration/`
into `~/.claude/skills/`. The deck keeps a thin wrapper (`scripts/gen-images.ts`) that owns its paths and
calls the engine, so promotion does not change the deck's `npm run gen:images`.
