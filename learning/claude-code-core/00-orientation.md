# Orientation — Claude Code Mastery (Tier 2)

## What this is

This is the tier that actually makes you a Claude Code expert. It's a
companion learning set for three Anthropic Academy courses, all hosted on
Skilljar:

- **Claude Code 101** — https://anthropic.skilljar.com/claude-code-101
- **Claude Code in Action** — https://anthropic.skilljar.com/claude-code-in-action
- **Introduction to Claude Cowork** — https://anthropic.skilljar.com/introduction-to-claude-cowork

**Honesty note, same as Tier 1:** Skilljar gates the real lesson videos and
text behind free registration. Unlike Claude 101, I could not confirm a
dedicated *official* Anthropic Academy YouTube companion series for these
three courses — searches turned up only third-party walkthroughs, which are
labeled as such wherever used. Register for all three courses for free at
the links above; treat this folder as pre-read structure, not a replacement.

## Why these three, in this order

- **Claude Code 101** first — installation, the core Explore → Plan → Code →
  Commit workflow, and the prompting/approval habits everything else builds
  on.
- **Claude Code in Action** second — the same tool, but deeper: context
  management, custom commands, MCP servers, GitHub integration, hooks. This
  is where "using Claude Code" turns into "using Claude Code well."
- **Introduction to Claude Cowork** third — a different surface (the
  agentic desktop app, not the CLI) that applies the same task-loop thinking
  to non-code work (Chrome, Word, Excel, PowerPoint, Outlook). Useful even
  for engineers, since it's the clearest way to see which habits are
  Claude-wide versus Claude-Code-specific.

## Reading order

| # | File | Covers | Difficulty |
|---|------|--------|------------|
| 00 | `00-orientation.md` (this file) | How to use this tier | — |
| 01 | `01-claude-code-101.md` | Install, Explore→Plan→Code→Commit, prompting, approval modes | Beginner→Intermediate |
| 02 | `02-claude-code-in-action.md` | Context management, custom commands, MCP, GitHub, hooks | Intermediate→Advanced |
| 03 | `03-claude-cowork.md` | Cowork task loop, plugins/skills, file workflows | Intermediate |

## What you'll be able to do after finishing this tier

- Install and run Claude Code in your actual environment (terminal, VS Code,
  or JetBrains) and explain the Explore → Plan → Code → Commit loop to
  someone else.
- Choose the right approval mode (manual approval, auto-accept, Plan Mode)
  for the risk level of a given task.
- Manage context deliberately with `/init`, `CLAUDE.md`, and `@` mentions
  instead of letting a long session drift.
- Extend Claude Code with custom commands, MCP servers, and hooks.
- Recognize when a task calls for Cowork's broader desktop-agent loop instead
  of the CLI.

This tier maps directly onto this path's stated goal. See
[`../curriculum/02-claude-code-mastery.md`](../curriculum/02-claude-code-mastery.md)
for this notebook's table of contents and curriculum, and
[`../NOTEBOOKLM-GUIDE.md`](../NOTEBOOKLM-GUIDE.md) for how to load this
folder into its own NotebookLM notebook.
