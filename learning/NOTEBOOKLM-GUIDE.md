# How to Load This Path Into Google NotebookLM

This guide is shared across all five tiers — read it once, apply it to
every tier's notebook, rather than re-reading a per-tier copy. See the
[`curriculum/`](curriculum/) folder for each notebook's specific table of
contents and session-by-session curriculum.

## Why five notebooks, not one

NotebookLM has no folders — every notebook you create sits in one flat
list. It also caps sources per notebook (50 on the free Standard plan, 100
on Plus, 300 on Pro, 600 on Ultra), and answer quality drops as a notebook's
sources drift across unrelated topics. Five notebooks — one per tier — keep
each one topically tight (roughly 6–10 sources each, nowhere near any plan's
cap) and let you generate a focused Study Guide or Audio Overview per tier
instead of one that's trying to cover everything at once.

## Step 1 — Create the five notebooks, named to sort in order

Since there are no folders, use numeric prefixes so the notebooks stay in
reading order in NotebookLM's list:

- `00 — Fluency Foundations`
- `01 — Claude Core`
- `02 — Claude Code Mastery`
- `03 — Extending Claude Code`
- `04 — Platform & API`

## Step 2 — Add sources to each notebook

For each tier, add three kinds of source:

1. **The local markdown files** from that tier's folder — use "Upload" and
   select every file in the folder (the numbered `.md` files, in order).
2. **The public Skilljar course page(s)** for that tier — use "Website" as
   the source type and paste the course URL directly (e.g.
   `https://anthropic.skilljar.com/claude-code-101`). NotebookLM scrapes the
   public syllabus text automatically; you don't need to copy anything by
   hand. This works because the syllabus page itself isn't behind the
   login wall — only the lesson videos and text are.
3. **Confirmed public YouTube videos**, where they exist — use "YouTube" as
   the source type and paste the video URL directly; NotebookLM imports the
   transcript automatically. Only Tier 1 (Claude 101) has a confirmed full
   official Anthropic Academy companion series; the other tiers' orientation
   files say so explicitly rather than guessing at links that may not exist.

## Step 3 — Add your own notes as you go (the highest-value source)

Because the real lesson content is gated, your own notes from actually
doing each Skilljar course are the one source in each notebook with the
actual course content in it. After each real lesson, add a note in
NotebookLM directly (the built-in Notes panel) or drop a short markdown file
into the notebook — either way, it becomes something you can quiz yourself
against later.

## Step 4 — Generate outputs in this order, not slide decks first

Asking NotebookLM for a slide deck as the very first thing you do tends to
produce a shallow outline, because the model hasn't been prompted to reason
through the material yet. Better order, per tier:

1. **Study Guide** — establishes vocabulary and key concepts first.
2. **Audio Overview (Deep Dive)** — a passive review pass, good for a
   commute or a second exposure to the same material.
3. **FAQ / Briefing doc** — turns the material into a spaced-repetition
   review format.
4. **Mind Map** — shows how the tier's concepts connect to each other,
   useful right before moving to the next tier.
5. **Slide-deck outline** — only now, once NotebookLM has already reasoned
   through the Study Guide, Audio Overview, and Mind Map for this tier, ask
   it to draft a slide-deck outline from the same sources.

## Step 5 — Move to the next notebook only after a self-check

Each tier's documents end with reflection/practice prompts. Answer them
from memory before opening the next tier's notebook — if you can't, that's
a sign to revisit the Study Guide or Audio Overview for the current tier
rather than pushing forward.

## A note on source-cap headroom

This design keeps every notebook at roughly 6–10 sources against a cap of
50–600 depending on plan — there's substantial room to keep adding your own
notes, follow-up questions, or extra reference material to any tier's
notebook as you go, without ever approaching the limit.
