# Curriculum — Notebook `04 — Platform & API`

Covers: Claude Platform 101, Building with the Claude API.
Source files live in [`../platform-and-api/`](../platform-and-api/).

## Table of contents to upload

| Type | Item |
|---|---|
| File | [00-orientation.md](../platform-and-api/00-orientation.md) |
| File | [01-claude-platform-101.md](../platform-and-api/01-claude-platform-101.md) |
| File | [02-building-with-claude-api.md](../platform-and-api/02-building-with-claude-api.md) |
| YouTube | — none confirmed official |

## Curriculum

Studio currently offers: Audio Overview, Slide deck, Video Overview, Mind
Map, Reports, Flashcards, Quiz, Infographic, Data table. As a visual
learner, lead with Mind Map/Slide deck/Infographic/Video Overview; treat
Audio Overview as an optional, last, commute-time pass.

Before each generation, check only the sources listed in **Sources
checked** in the left-hand Sources panel (uncheck the rest) — this scopes
that specific output to just those documents instead of the whole notebook.
Both real files are long (`01-claude-platform-101.md` alone condenses 13
lessons), so several sessions revisit the same file for a different half —
NotebookLM generates from whatever's checked, not the whole file at once,
so re-reading a specific section before generating still works even
without literally splitting the file.

| Session | Read | Sources checked | Generate |
|---|---|---|---|
| 1 | `00-orientation.md` + `01-claude-platform-101.md` (first half: API basics, model tiers, agent loop, tool use, extended thinking) | All, then Only `01-claude-platform-101.md` | **Mind Map**, then **Slide deck** |
| 2 | `01-claude-platform-101.md` (second half: built-in server tools, Skills, MCP, context management, managed agents) | Only `01-claude-platform-101.md` | **Slide deck** — the four context-management patterns (just-in-time, server-side compaction, prompt caching, memory tool) compare well as one visual set |
| 3 | `02-building-with-claude-api.md` (prompt-eval workflow, XML tags, RAG: chunking, embeddings, BM25) | Only `02-building-with-claude-api.md` | **Slide deck** — the RAG pipeline (chunk → embed → hybrid search) is inherently a flow diagram |
| 4 | `02-building-with-claude-api.md` (images/PDFs, citations, workflows vs. agents, the three workflow patterns) | Only `02-building-with-claude-api.md` | **Infographic** — the Workflows-vs-Agents decision table, plus chaining/routing/parallelization side by side |
| 5 (capstone) | — | All | **Video Overview**, then **Quiz** |
