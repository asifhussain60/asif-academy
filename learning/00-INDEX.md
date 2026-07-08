# Index — Anthropic Academy Learning Path (Claude Code Expert Track)

## What this is

A five-tier, gradual learning path built from Anthropic Academy's free
Skilljar course catalog (https://anthropic.skilljar.com/), designed to be
loaded into Google NotebookLM as five separate notebooks — one per tier —
and aimed at one specific outcome: becoming genuinely proficient with Claude
Code, not just aware of every course that exists.

Every document in every tier is honest about one constraint: Skilljar gates
the actual lesson videos and text behind free registration, and no tool
(this one included) can scrape content behind a login wall. These documents
are a **pre-read and study companion** built from Anthropic's own public
documentation, help-center articles, engineering blog posts, and confirmed
public YouTube videos — never a copy of the paywalled lessons. Register for
every course at the links below; treat this folder as the scaffolding that
makes the real lessons land faster.

## The five tiers

| Tier | Folder | Notebook name | Courses | Status |
|---|---|---|---|---|
| 0 | `fluency-foundations/` | `00 — Fluency Foundations` | AI Fluency: Framework & Foundations, AI Capabilities and Limitations | Built |
| 1 | `claude-101/` | `01 — Claude Core` | Claude 101 | Built |
| 2 | `claude-code-core/` | `02 — Claude Code Mastery` | Claude Code 101, Claude Code in Action, Introduction to Claude Cowork | Built |
| 3 | `extending-claude-code/` | `03 — Extending Claude Code` | Introduction to Agent Skills, Introduction to Subagents, Introduction to MCP, MCP: Advanced Topics | Built |
| 4 | `platform-and-api/` | `04 — Platform & API` | Claude Platform 101, Building with the Claude API | Built |

Each folder has its own `00-orientation.md` with the reading order and
learning objectives for that tier specifically. Read them in tier order
(0 → 4) — each one assumes the vocabulary the previous tier established.

## Deliberately excluded from this path

Skilljar hosts 20 courses total. These are left out, on purpose, because
they don't serve the "Claude Code expert" goal this path is built around:

| Course | Why excluded |
|---|---|
| AI Fluency for educators / students / nonprofits / small businesses / builders (5 courses) | Same Framework & Foundations content, re-skinned per audience — Tier 0 already covers the underlying framework once |
| Claude with Amazon Bedrock | Cloud-deployment track for AWS specifically — only relevant if your org deploys Claude through Bedrock |
| Claude with Google Cloud's Vertex AI | Same as above, for GCP/Vertex |
| Teaching AI Fluency | For instructors teaching the Fluency Framework to others, not for learning it yourself |

If any of these becomes relevant later (e.g., your company standardizes on
Bedrock), the same documentation pattern used in every tier here extends
cleanly — it isn't a structural limitation, just a scope decision.

## How to actually use this path

1. Read tier 0 through tier 4, in order, each tier's own orientation file
   first.
2. Register for the real Skilljar course(s) in whichever tier you're on, and
   go through the actual lessons — these documents are pre-read, not a
   replacement.
3. Load each tier's folder into its own Google NotebookLM notebook. See
   [`NOTEBOOKLM-GUIDE.md`](NOTEBOOKLM-GUIDE.md) for exactly how, and for the
   best order to generate NotebookLM's outputs (Study Guide, Audio Overview,
   FAQ, Mind Map, slide-deck outline) for real retention.
4. Use each tier's reflection/practice prompts as your own check before
   moving to the next tier — not just as reading-comprehension filler.

## Where this lives

This entire path lives on the `learning/claude-101-notebooklm` branch of
this repository (`asif-academy`), separate from the `src/` application code
this repo otherwise contains — it's a personal learning artifact, not part
of the Claude Code, Taught teaching deck itself.
