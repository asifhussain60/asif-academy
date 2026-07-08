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

## Prompts to enter in Studio's "Customise" dialog

Sessions 1–4 all draw from just two files, so the Customise prompt is what
actually separates "first half" from "second half" — say explicitly what
to leave out, not just what to cover, or NotebookLM will pull from the
whole file regardless of which half you just read.

**Session 1 — Mind Map**
> Show how Claude Platform 101 and Building with the Claude API relate — platform fundamentals versus the deeper techniques built on top of them.

**Session 1 — Slide deck**
> Create a slide deck covering only: making a first API call with messages.create, choosing between the Fable, Opus, Sonnet, and Haiku model tiers, the agent loop (send messages, check stop_reason, run tools, loop), and the mechanics of defining and using tools. Do not cover Skills, MCP, context management, or managed agents.

**Session 2 — Slide deck**
> Create a slide deck covering only: Anthropic's built-in server tools (web search, code execution, web fetch), Skills on the API, MCP and how it differs from tools and Skills, and the four context-management patterns — just-in-time context, server-side compaction, prompt caching, the memory tool — plus managed agents. Do not cover the first API call, model tiers, or the basic agent loop.

**Session 3 — Slide deck**
> Create a slide deck covering only: the prompt-evaluation workflow, structuring prompts with XML tags, and the RAG pipeline — chunking strategies, embeddings and semantic search, then BM25 and hybrid search. Do not cover images, PDFs, citations, or workflow patterns.

**Session 4 — Infographic**
> Create an infographic covering only: workflows versus agents as an architectural choice, and the three workflow patterns — chaining, routing, parallelization — compared side by side. Do not cover RAG, chunking, images, or citations.

**Session 5 — Video Overview**
> Recap the full arc from Claude Platform 101 through Building with the Claude API — API basics, the agent loop, context management, RAG, and workflow patterns.

**Session 5 — Quiz**
> Quiz me on model tier selection, the agent loop, the four context-management patterns, RAG chunking strategies, and choosing between a workflow and an agent.
