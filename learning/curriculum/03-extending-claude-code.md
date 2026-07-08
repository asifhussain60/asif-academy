# Curriculum — Notebook `03 — Extending Claude Code`

Covers: Introduction to Agent Skills, Introduction to Subagents,
Introduction to Model Context Protocol, MCP: Advanced Topics.
Source files live in [`../extending-claude-code/`](../extending-claude-code/).

## Table of contents to upload

| Type | Item |
|---|---|
| File | [00-orientation.md](../extending-claude-code/00-orientation.md) |
| File | [01-agent-skills.md](../extending-claude-code/01-agent-skills.md) |
| File | [02-subagents.md](../extending-claude-code/02-subagents.md) |
| File | [03-mcp-introduction.md](../extending-claude-code/03-mcp-introduction.md) |
| File | [04-mcp-advanced.md](../extending-claude-code/04-mcp-advanced.md) |
| YouTube | — none confirmed official |

## Curriculum

Studio currently offers: Audio Overview, Slide deck, Video Overview, Mind
Map, Reports, Flashcards, Quiz, Infographic, Data table. As a visual
learner, lead with Mind Map/Slide deck/Infographic/Video Overview; treat
Audio Overview as an optional, last, commute-time pass.

Before each generation, check only the sources listed in **Sources
checked** in the left-hand Sources panel (uncheck the rest) — this scopes
that specific output to just those documents instead of the whole notebook.

| Session | Read | Sources checked | Generate |
|---|---|---|---|
| 1 | `00-orientation.md` + `01-agent-skills.md` | All, then Only `01-agent-skills.md` | **Mind Map**, then **Slide deck** — Skill anatomy and the priority hierarchy (Enterprise → Personal → Project → Plugins) |
| 2 | `02-subagents.md` | Only `02-subagents.md` | **Slide deck** — the four traits of a reliable subagent, plus the three anti-patterns to avoid |
| 3 | `03-mcp-introduction.md` | Only `03-mcp-introduction.md` | **Infographic** — the Tools/Resources/Prompts "who controls it" table is a perfect compression candidate |
| 4 | `04-mcp-advanced.md` | Only `04-mcp-advanced.md` | **Infographic** — the transport-selection table (stdio vs. StreamableHTTP vs. stateless-HTTP vs. json-response) |
| 5 (capstone) | — | All | **Video Overview**, then **Quiz** |

## Prompts to enter in Studio's "Customise" dialog

**Session 1 — Mind Map**
> Show how Agent Skills, Subagents, and MCP (introduction and advanced) relate as three different ways of extending Claude Code beyond a single conversation.

**Session 1 — Slide deck**
> Create a slide deck on Skill anatomy — the SKILL.md file, its frontmatter fields, progressive disclosure — and the skill priority hierarchy: Enterprise, Personal, Project, Plugins.

**Session 2 — Slide deck**
> Create a slide deck on the four traits that make a subagent reliable — a specific description, a defined output format, an obstacles-encountered section, and deliberately limited tool access — plus the three anti-patterns to avoid.

**Session 3 — Infographic**
> Create an infographic of MCP's three primitives — Tools, Resources, and Prompts — showing who controls each one (the model, the application, or the user) and what each is best used for.

**Session 4 — Infographic**
> Create an infographic comparing MCP transport choices — stdio, StreamableHTTP with both flags false, StreamableHTTP with stateless_http true, and StreamableHTTP with json_response true — and when to choose each.

**Session 5 — Video Overview**
> Recap Agent Skills, Subagents, and MCP (both the introduction and advanced topics) as three complementary ways to extend what Claude Code can do.

**Session 5 — Quiz**
> Quiz me on the skill priority hierarchy, the four traits of a reliable subagent, MCP's three primitives, and choosing the right MCP transport.
