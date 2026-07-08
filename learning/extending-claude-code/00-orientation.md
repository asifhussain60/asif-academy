# Orientation — Extending Claude Code (Tier 3)

## What this is

This tier covers the features that separate a casual Claude Code user from
an expert one — most people who use Claude Code daily never touch any of
these four courses:

- **Introduction to Agent Skills** —
  https://anthropic.skilljar.com/introduction-to-agent-skills
- **Introduction to Subagents** —
  https://anthropic.skilljar.com/introduction-to-subagents
- **Introduction to Model Context Protocol** —
  https://anthropic.skilljar.com/introduction-to-model-context-protocol
- **Model Context Protocol: Advanced Topics** —
  https://anthropic.skilljar.com/model-context-protocol-advanced-topics

**Honesty note:** built from Anthropic's public engineering blog, public MCP
and Agent Skills documentation, and course-description text — not the gated
Skilljar lesson content. No official companion YouTube videos were confirmed
for any of these four; register at the links above for the full lessons.

## Why this order

Skills and Subagents both extend what a *single* Claude Code session can do
before MCP is even involved, so they come first. MCP then extends what
Claude Code can *connect to*, and Advanced MCP topics build on the Intro
course's three core primitives (Tools, Resources, Prompts) rather than
introducing new ones — so it has to come last.

## Reading order

| # | File | Covers | Difficulty |
|---|------|--------|------------|
| 00 | `00-orientation.md` (this file) | How to use this tier | — |
| 01 | `01-agent-skills.md` | Writing, sharing, and distributing Skills | Intermediate |
| 02 | `02-subagents.md` | Custom subagents via `/agents`, context isolation | Intermediate |
| 03 | `03-mcp-introduction.md` | Building MCP servers/clients, the three primitives | Intermediate→Advanced |
| 04 | `04-mcp-advanced.md` | Advanced MCP implementation patterns | Advanced |

## Prerequisite

This tier assumes you've finished Tier 2 (Claude Code Mastery) — Skills,
Subagents, and MCP all extend the Explore → Plan → Code → Commit workflow
rather than replacing it.

## What you'll be able to do after finishing this tier

- Write a `SKILL.md` from scratch and know when to add scripts, references,
  or assets alongside it.
- Create a custom subagent with `/agents` and explain when isolating context
  into a subagent helps versus when it just adds overhead.
- Explain MCP's three primitives (Tools, Resources, Prompts) and build a
  minimal MCP server or client in Python.

See [`../curriculum/03-extending-claude-code.md`](../curriculum/03-extending-claude-code.md)
for this notebook's table of contents and curriculum, and
[`../NOTEBOOKLM-GUIDE.md`](../NOTEBOOKLM-GUIDE.md) for import instructions.
