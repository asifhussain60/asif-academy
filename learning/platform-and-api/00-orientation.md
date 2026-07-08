# Orientation — Platform & API (Tier 4)

## What this is

The last tier — for building tools *around* Claude Code rather than using
Claude Code itself. Covers two Anthropic Academy courses:

- **Claude Platform 101** —
  https://anthropic.skilljar.com/claude-platform-101
- **Building with the Claude API** —
  https://anthropic.skilljar.com/claude-with-the-anthropic-api

**Honesty note:** built from Anthropic's public course-description text
(including the detailed public syllabus copy for Claude Platform 101) —
not the gated Skilljar lesson content itself. Register for both at the
links above.

## Is this tier for you?

This is genuinely optional for "becoming a Claude Code expert" in the daily-
use sense — Tiers 1–3 cover that. This tier is for a different, narrower
goal: building your *own* agents, integrations, or tools on top of the
Claude API, rather than using Claude Code as Anthropic ships it. If your
work is using Claude Code well, not building on the API, you can treat this
tier as optional further reading rather than a required step.

## Reading order

| # | File | Covers | Difficulty |
|---|------|--------|------------|
| 00 | `00-orientation.md` (this file) | How to use this tier | — |
| 01 | `01-claude-platform-101.md` | API fundamentals, agent loops, built-in tools, managed agents | Advanced |
| 02 | `02-building-with-claude-api.md` | Full-spectrum API usage: prompting, vision, PDFs, citations, tool use | Advanced |

## What you'll be able to do after finishing this tier

- Send a raw API request, read the response, and choose the right model
  (Opus, Sonnet, Haiku) for a given cost/latency/quality trade-off.
- Explain what an agent loop is and when to run your own versus using
  Anthropic's managed, sandboxed agent.
- Describe how Anthropic's built-in tools, Skills, and MCP servers each
  extend an agent built directly on the API — the same three extension
  points from Tier 3, seen from the API side instead of the Claude Code
  side.

See [`../00-INDEX.md`](../00-INDEX.md) for the full roadmap and
[`../NOTEBOOKLM-GUIDE.md`](../NOTEBOOKLM-GUIDE.md) for import instructions.
