---
name: teaching-script
description: >
  Author the `talkingPoints` (presenter script) and `faqs` for any slide in this teaching deck.
  Use whenever creating or editing a slide's talking points / presenter notes. Guarantees the
  presenter window shows a verbatim, bulleted, read-aloud script — never stage directions.
---

# Teaching-script authoring standard

The `/present` window shows `slide.talkingPoints` to the presenter while they speak. It is the
**script they read aloud**, not a memo to themselves. This skill keeps every slide's script
consistent so it never drifts back to instruction-prose.

## The one rule

**Write what the presenter SAYS to the audience — verbatim.** If a line could be spoken out loud
to a room and make sense, it belongs. If it's an instruction to the presenter, it does not.

| ✅ Read-aloud (do this) | ❌ Stage direction (never) |
|---|---|
| "The one word that matters here is *agent*." | "Start by emphasizing the word agent." |
| "A chatbot reads you the recipe; an agent cooks dinner." | "Land the cooking analogy here." |
| "Watch what happens when the test fails…" | "Press the arrow to advance the diagram." |

Never reference the UI ("press →", "click the tile", "step the diagram") — advancing is the
presenter's muscle memory; the script is only words.

### No descriptive labels — start with the spoken words
Also strip any phrase that *describes* the line instead of being it, and any meta-reference to the
slide/diagram/module. A bullet is **ONLY and EXACTLY** what is said aloud — it should begin with the
sentence itself.

| ❌ Wrong (descriptive label) | ✅ Correct (exactly what's read aloud) |
|---|---|
| "Simplest possible definition: Claude Code is an AI agent…" | "Claude Code is an AI agent…" |
| "The one word that matters **on this whole slide** is agent." | "The one word that matters here is agent." |
| "Quick myth-bust: people assume…" | "People assume…" |
| "Here's the punchline **of the whole module**: it re-runs the tests." | "Here's the payoff: it re-runs the tests." |

Banned openers: `… definition:`, `Key idea:`, `Quick myth-bust:`, `The punchline:`, and any
"on this slide / in this diagram / of this module" meta. Natural spoken transitions
("People assume…", "The biggest misconception is…", "Here's the payoff:") are fine.

## Make it engaging — lead with the question (the delivery standard)

A script that only *states* facts is flat. A script that **asks the question the room is already
thinking, lets it hang for a beat, then answers it** pulls people in. This is the spine of every
script in this deck — synthesized from how strong keynote/TED speakers actually hold a room.

### The core move: pose → pay off, and chain it
- **Open each step with the audience's question**, in their own words, then answer it crisply.
  - ✅ "So what's the very first thing it does? Not what most of us would guess. It doesn't guess."
  - ❌ "Phase one, Observe. It reads the file first." (states; never asks)
- **Chain the steps.** Each answer ends on a thread that becomes the *next* step's question, so the
  script pulls forward instead of restarting. ("…so it loops back." → next step: "And what finally
  makes it stop?")
- **Pay off every open loop.** If you pose a teaser ("hold that thought"), you must circle back and
  close it. Never leave a question hanging. A **forward-reference** — a line that promises a later
  idea ("the model we pick matters most right here") — is only allowed when its payoff lands inside
  the **same module** (ideally the next slide or lesson), or is a deliberate cross-module setup the
  curriculum guarantees (the running example's "next module we add X"). An unpaid promise is a defect.

### Say "us" / "we", not "you"
- **Default to "we / us / let's."** It puts the presenter in the same boat as the room — a shared
  journey, never a lecture. "How many of *us* have shipped the fix that broke two other things?"
- **Own the pain and the mistakes with "we"** — "you" there sounds accusing. ✅ "We've all rushed a
  commit message at 6pm." ❌ "You write bad commit messages."
- **Switch to "you" only at the moment of power or payoff**, where it lands as a gift, not a command:
  "Here's the one habit that keeps **you** in control: you read the diff before it lands."

### Free the imagination
- **"Imagine if… / Picture this…"** hands the room the director's chair — they build the idea in
  their own heads. "Imagine opening Monday's worst ticket and the fix is already staged and tested."
- **Concrete sensory specifics**, not abstractions: "a forty-deep ticket queue," "the red CI badge,"
  "coffee still hot" beat "improved productivity." Specific is vivid; vivid sticks.

### The spoken-rhythm toolkit (reach for these; don't overuse)
- **Rule of three** — three beats read as a whole, memorable pattern: "It reads, it proposes, it waits."
- **Contrast / "not X, but Y"** — the friction makes the point land: "Not autopilot. A co-pilot."
- **Long, long, SHORT** — drop a three-word sentence after a longer one; the rhythm change *is* the
  emphasis: "…without switching windows once. That's the whole pitch."
- **Callback** — late in a module, reach back to the opening line or image for a sense of closure.
- **End on a strong, forward word** — engineer the last few words so the room leaves feeling capable.

### Professional, not goofy
One **dry, well-timed aside** per slide is the ceiling — aim for "huh, clever," not "ha-ha." Earn the
reaction; never announce it. Avoid hype words ("game-changer," "revolutionary"), tired clichés ("at
the end of the day," "take it to the next level"), and talking down ("simply," "as you obviously
know"). Never leave jargon unglossed — define it on first use or bridge it with a metaphor.

## Shape: `string[][]` — `[step][bullet]`

Always author `talkingPoints` as an array of **steps**, each a list of short **bullets**:

```ts
talkingPoints: [
  // step 0 — spoken while the first reveal is on screen
  ['First thing it does is look around…', 'Reads your files, your notes, what it just ran.'],
  // step 1
  ['Then it thinks — just the next step, not the whole plan.'],
]
```

- A **single-step** slide is still `[[ ... ]]` (one step, several bullets).
- Bullet count per step: **2–5**. Each bullet is **one spoken beat** — a sentence or two, ≤ ~30 words.
- The presenter advances steps with → ; each step's bullets appear together, in sync with the slide.

## Voice

- **First person plural.** Default to "we / us / let's" (see *Make it engaging* above); switch to "you" only at a power/payoff beat.
- **Plain language.** No jargon without an everyday **analogy** (desk, chess move, recipe, onboarding doc, sticky notes).
- **Light humor** — one wry aside per slide is plenty ("…that's sort of the whole point of the thing we're here to learn"). Never goofy, never at the learner's expense.
- **Bold the keywords** with `**…**` — they render as colored highlights so the presenter's eye catches the beat.
- Inline `[[term|key]]` may reference `slide.details` for a tooltip, same as prose.

## FAQs (`slide.faqs`)

Real questions an audience asks, with a tight spoken answer. **Bold the punchline** of each answer.
3 per slide is the sweet spot.

## Checklist before you commit a slide

- [ ] `talkingPoints` is `string[][]` (steps → bullets), 2–5 bullets per step.
- [ ] Every bullet is something said **out loud** — zero UI/stage directions.
- [ ] Each step **opens with the audience's question**, then answers it; steps chain forward.
- [ ] **"We/us" by default**; "you" only at a power/payoff beat.
- [ ] At least one imagination or rhythm device (imagine-if / rule of three / contrast / callback) where it fits.
- [ ] One analogy and at most one bit of humor.
- [ ] Keywords bolded; jargon defined or analogized.
- [ ] `faqs` present (≈3), punchlines bolded.
