# Index — Anthropic Academy Learning Path (Claude Code Expert Track)

## What this is

A five-tier learning path covering Anthropic Academy's Claude and Claude
Code curriculum, built for import into Google NotebookLM as five separate
notebooks — one per tier — aimed at one outcome: becoming genuinely
proficient with Claude Code.

Every document is built from the **real lesson content** of the course it
covers (pulled through an authenticated browser session against each
enrolled course), paraphrased in my own words with attribution and
license notes preserved — not a copy of the source, and not a guess at
what the syllabus implies. One course (Building with the Claude API, 85
lessons) is a deliberately sampled subset rather than exhaustive — flagged
directly in its own document.

## The five tiers

| Tier | Folder | Notebook name | Courses |
|---|---|---|---|
| 0 | `fluency-foundations/` | `00 — Fluency Foundations` | AI Fluency: Framework & Foundations, AI Capabilities and Limitations |
| 1 | `claude-101/` | `01 — Claude Core` | Claude 101 |
| 2 | `claude-code-core/` | `02 — Claude Code Mastery` | Claude Code 101, Claude Code in Action, Introduction to Claude Cowork |
| 3 | `extending-claude-code/` | `03 — Extending Claude Code` | Introduction to Agent Skills, Introduction to Subagents, Introduction to MCP, MCP: Advanced Topics |
| 4 | `platform-and-api/` | `04 — Platform & API` | Claude Platform 101, Building with the Claude API |

## Files to upload per notebook

Website sources are deliberately left off this table — the public
Skilljar page only ever shows the syllabus (gated content isn't reachable
by NotebookLM's scraper either), and every document below was already
built from the real lesson content, so uploading the syllabus page again
adds nothing. Only `01 — Claude Core` has confirmed official YouTube
companions worth adding alongside the files.

| Notebook | Local files | YouTube |
|---|---|---|
| `00 — Fluency Foundations` | [00-orientation.md](fluency-foundations/00-orientation.md)<br>[01-ai-fluency-framework.md](fluency-foundations/01-ai-fluency-framework.md)<br>[02-ai-capabilities-and-limitations.md](fluency-foundations/02-ai-capabilities-and-limitations.md) | — |
| `01 — Claude Core` | [00-orientation.md](claude-101/00-orientation.md)<br>[01-meet-claude.md](claude-101/01-meet-claude.md)<br>[02-organizing-work.md](claude-101/02-organizing-work.md)<br>[03-expanding-reach.md](claude-101/03-expanding-reach.md)<br>[04-putting-it-together.md](claude-101/04-putting-it-together.md)<br>[05-glossary-and-cheatsheet.md](claude-101/05-glossary-and-cheatsheet.md) | https://www.youtube.com/watch?v=VwGk1OhZB8o<br>https://www.youtube.com/watch?v=DyRo8Jj9W-U<br>https://www.youtube.com/watch?v=-1y8Dn4JpFA<br>https://www.youtube.com/watch?v=rXUgmVe6Mt8<br>https://www.youtube.com/watch?v=Oeveq9ShqHY<br>https://www.youtube.com/watch?v=3_fEvjHLGyA |
| `02 — Claude Code Mastery` | [00-orientation.md](claude-code-core/00-orientation.md)<br>[01-claude-code-101.md](claude-code-core/01-claude-code-101.md)<br>[02-claude-code-in-action.md](claude-code-core/02-claude-code-in-action.md)<br>[03-claude-cowork.md](claude-code-core/03-claude-cowork.md) | — |
| `03 — Extending Claude Code` | [00-orientation.md](extending-claude-code/00-orientation.md)<br>[01-agent-skills.md](extending-claude-code/01-agent-skills.md)<br>[02-subagents.md](extending-claude-code/02-subagents.md)<br>[03-mcp-introduction.md](extending-claude-code/03-mcp-introduction.md)<br>[04-mcp-advanced.md](extending-claude-code/04-mcp-advanced.md) | — |
| `04 — Platform & API` | [00-orientation.md](platform-and-api/00-orientation.md)<br>[01-claude-platform-101.md](platform-and-api/01-claude-platform-101.md)<br>[02-building-with-claude-api.md](platform-and-api/02-building-with-claude-api.md) | — |

## Deliberately excluded from this path

Skilljar hosts 20 courses total. These are left out, on purpose, because
they don't serve the "Claude Code expert" goal this path is built around:

| Course | Why excluded |
|---|---|
| AI Fluency for educators / students / nonprofits / small businesses / builders (5 courses) | Same Framework & Foundations content, re-skinned per audience — Tier 0 already covers the underlying framework once |
| Claude with Amazon Bedrock | Cloud-deployment track for AWS specifically — only relevant if your org deploys Claude through Bedrock |
| Claude with Google Cloud's Vertex AI | Same as above, for GCP/Vertex |
| Teaching AI Fluency | For instructors teaching the Fluency Framework to others, not for learning it yourself |

## How to generate learning material in Studio — visual-learner order

NotebookLM's Studio panel currently offers: **Audio Overview, Slide deck,
Video Overview, Mind Map, Reports, Flashcards, Quiz, Infographic, Data
table.** Since you're a visual learner, the order below leads with the
visual outputs and treats audio as a secondary reinforcement pass, not the
primary one:

1. **Mind Map first, before reading anything closely.** Generate it the
   moment a notebook's sources are uploaded. It shows how the tier's
   concepts connect to each other before you've read a single document —
   a map to orient by, not a summary to skip the reading with.
2. **Slide deck per document (or small cluster of related documents),
   read alongside it.** This is the core visual-learning unit in this
   plan — one slide deck per module keeps each one focused instead of
   diluted across the whole notebook.
3. **Infographic for whichever single document in that notebook is
   densest with tables, comparisons, or decision rules.** Called out
   specifically per notebook below — these compress a reference table
   into something you can keep visually pinned instead of re-reading.
4. **Video Overview as the capstone**, once every document and its slide
   deck has been read — a full visual recap of the whole notebook in
   motion.
5. **Quiz and Flashcards after the Video Overview**, as a retention check
   — not a substitute for having generated the slide decks first.
6. **Audio Overview is optional, generate it last** — genuinely useful for
   a commute-time re-listen, but not where a visual learner should start.

The per-notebook curricula below apply this order concretely, session by
session.

## Curriculum: `00 — Fluency Foundations`

| Session | Read | Generate in Studio |
|---|---|---|
| 1 | `00-orientation.md` | **Mind Map** — see how the 4Ds and the 4 machine properties relate before reading either in depth |
| 2 | `01-ai-fluency-framework.md` | **Slide deck** — one slide per D (Delegation, Description, Discernment, Diligence) |
| 3 | `02-ai-capabilities-and-limitations.md` | **Infographic** — the four-property capability↔limitation continuum table is the densest, most reference-worthy content in this whole tier |
| 4 (capstone) | — | **Video Overview**, then **Quiz** |

## Curriculum: `01 — Claude Core`

| Session | Read | Generate in Studio |
|---|---|---|
| 1 | `00-orientation.md` + `01-meet-claude.md` | **Mind Map** for the whole notebook, then a **Slide deck** for Chat/Cowork/Code and the prompting framework |
| 2 | `02-organizing-work.md` | **Slide deck** — Projects vs. Artifacts vs. Skills |
| 3 | `03-expanding-reach.md` | **Slide deck** — Connectors, Enterprise Search, Research mode |
| 4 | `04-putting-it-together.md` — watch the 6 YouTube videos in this session too | **Slide deck** — role-based use cases |
| 5 | `05-glossary-and-cheatsheet.md` | **Infographic** — this file *is* a cheatsheet already; turning it visual is the highest-leverage single output in this tier |
| 6 (capstone) | — | **Video Overview**, then **Flashcards** for the glossary terms, then **Quiz** |

## Curriculum: `02 — Claude Code Mastery`

| Session | Read | Generate in Studio |
|---|---|---|
| 1 | `00-orientation.md` + `01-claude-code-101.md` | **Mind Map**, then **Slide deck** — the Explore→Plan→Code→Commit loop is naturally visual |
| 2 | `02-claude-code-in-action.md` | **Slide deck** for context management/custom commands/MCP/GitHub, then **Infographic** for the hooks event-type table (PreToolUse/PostToolUse/Notification/Stop/etc.) |
| 3 | `03-claude-cowork.md` | **Slide deck** for the four "make it yours" building blocks, then **Infographic** for the Chat vs. Cowork vs. Code comparison table |
| 4 (capstone) | — | **Video Overview**, then **Flashcards** for slash-commands/keyboard shortcuts, then **Quiz** |

## Curriculum: `03 — Extending Claude Code`

| Session | Read | Generate in Studio |
|---|---|---|
| 1 | `00-orientation.md` + `01-agent-skills.md` | **Mind Map**, then **Slide deck** — Skill anatomy and the priority hierarchy |
| 2 | `02-subagents.md` | **Slide deck** — the four traits of a reliable subagent |
| 3 | `03-mcp-introduction.md` | **Infographic** — the Tools/Resources/Prompts "who controls it" table is a perfect compression candidate |
| 4 | `04-mcp-advanced.md` | **Infographic** — stdio vs. StreamableHTTP vs. stateless-HTTP tradeoffs |
| 5 (capstone) | — | **Video Overview**, then **Quiz** |

## Curriculum: `04 — Platform & API`

| Session | Read | Generate in Studio |
|---|---|---|
| 1 | `00-orientation.md` + `01-claude-platform-101.md` (first half: API basics, model tiers, agent loop, tool use) | **Mind Map**, then **Slide deck** |
| 2 | `01-claude-platform-101.md` (second half: Skills, MCP, context management, managed agents) | **Slide deck** — the four context-management patterns compare well as one visual set |
| 3 | `02-building-with-claude-api.md` (RAG section: chunking, embeddings, BM25) | **Slide deck** — the RAG pipeline is inherently a flow diagram |
| 4 | `02-building-with-claude-api.md` (workflow patterns: chaining, routing, parallelization) | **Infographic** — workflows-vs-agents decision table, plus the three workflow patterns side by side |
| 5 (capstone) | — | **Video Overview**, then **Quiz** |

## Where this lives

This entire path lives on the `learning/claude-101-notebooklm` branch of
this repository (`asif-academy`), separate from the `src/` application code
this repo otherwise contains — it's a personal learning artifact, not part
of the Claude Code, Taught teaching deck itself.
