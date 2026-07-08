# Module 1 — Introduction to Agent Skills

## Source note

Rewritten from the real course (6 lessons, via your logged-in session).
Paraphrased in my own words; Anthropic Academy course content, rights
reserved to Anthropic.

## Learning objectives

By the end of this document you should be able to write a working
`SKILL.md` from scratch, explain the skill priority hierarchy, choose
between Skills and Claude Code's other customization tools, and
troubleshoot a skill that isn't triggering.

## What a skill actually is

A skill is a folder containing a `SKILL.md` file — a name and description
in YAML frontmatter, followed by the actual instructions. The
**description is the matching mechanism**: Claude compares your request
against every available skill's description semantically and activates
whichever one overlaps in meaning, then asks you to confirm before loading
the full file into context. The rule of thumb the course keeps returning
to: if you're explaining the same thing to Claude repeatedly, that's a
skill waiting to be written.

```
---
name: pr-description
description: Writes pull request descriptions. Use when creating a PR,
  writing a PR, or when the user asks to summarize changes for a pull
  request.
---

When writing a PR description:
1. Run `git diff main...HEAD` to see all changes on this branch
2. Write a description following this format: ...
```

## Where skills live, and what wins on a name conflict

Two locations, two scopes: **personal** skills in `~/.claude/skills`
follow you across every project (your own commit-message style, your
documentation habits); **project** skills in `.claude/skills` inside a
repository are committed and shared with anyone who clones it (team
coding standards, brand guidelines). If a name collides across sources,
priority resolves in a fixed order: **Enterprise → Personal → Project →
Plugins** — letting an organization enforce a mandatory standard while
individuals still customize freely underneath it. The practical
implication: use specific names ("frontend-review" rather than "review")
to avoid an unintended collision entirely.

## Required and optional frontmatter fields

Only two fields are required — `name` (lowercase, numbers, hyphens only,
max 64 characters, matching the directory name) and `description` (max
1,024 characters, and by far the most important field, since it's what
Claude matches against). Two more are optional but powerful:
`allowed-tools` (restricts which tools Claude can use while this specific
skill is active — e.g. limiting a read-only onboarding skill to `Read,
Grep, Glob, Bash` with no editing) and `model` (pins a specific Claude
model for that skill). A good description does two jobs at once: it says
*what* the skill does and *when* Claude should reach for it — if a skill
isn't triggering reliably, the fix is almost always adding phrases closer
to how you actually talk, not rewriting the instructions themselves.

## Progressive disclosure for larger skills

Skills share your conversation's context window, so a skill's `SKILL.md`
loading in full has a real cost. **Progressive disclosure** is the fix:
keep `SKILL.md` itself under roughly 500 lines, and move detailed
material into subdirectories Claude only reads when actually needed —
`scripts/` (executable code — notably, a script's *output* consumes
tokens, not its source, so a script that does something deterministic and
consistent is more context-efficient than instructing Claude to redo the
logic itself each time), `references/` (documentation loaded only when
the topic comes up), and `assets/` (images, templates, static data). The
mental model the course offers: this turns `SKILL.md` into a table of
contents for the skill rather than the whole document at once.

## Skills versus Claude Code's other customization tools

The course draws four clean distinctions, each along a different axis:

| Tool | Loads | Best for |
|---|---|---|
| `CLAUDE.md` | Every conversation, always | Project-wide standards and hard constraints ("never modify the database schema") |
| **Skills** | On demand, when a request matches | Task-specific expertise that would clutter every conversation if always-on |
| Subagents | Fresh, isolated context, on delegation | Work that should run separately from the main conversation |
| Hooks | On a specific event (a save, a tool call) | Automated side effects — event-driven, not request-driven |
| MCP servers | External tool/data connections | A different category entirely — integrations, not instructions |

None of these compete for the same job — a typical real setup uses several
together: `CLAUDE.md` for what's always true, Skills for expertise that
only sometimes applies, Hooks for what must happen on every save or tool
call, Subagents for isolated delegated work, MCP for reaching outside
tools.

## Skills and subagents: the surprising gap

Subagents **do not automatically inherit your skills** — they start from
a clean, fresh context. Built-in agents (Explorer, Plan, Verify) can't use
skills at all; a **custom** subagent (defined in `.claude/agents`) can,
but only for skills you explicitly list in its own `skills:` frontmatter
field, loaded once at the subagent's start rather than on-demand the way
skills behave in the main conversation. This is deliberate and useful —
different subagents can carry genuinely different expertise (a frontend
reviewer with an accessibility-audit skill, a backend reviewer with a
totally different one) without needing to re-explain either in a prompt
each time.

## Sharing skills at increasing scope

Three distribution paths, matched to how widely a skill should travel:

- **Commit to a repository** (`.claude/skills`) — the simplest path;
  anyone who clones the repo gets it automatically, and updates land on
  everyone's next pull. Best for team- or project-specific standards.
- **Distribute via a plugin** — package one or more skills for
  installation across repositories through a marketplace, when the skill
  is broadly useful beyond your immediate team.
- **Enterprise managed settings** — an admin deploys skills
  organization-wide at the highest priority tier, overriding
  same-named personal/project/plugin skills. This is the right tier for
  anything that genuinely *must* be consistent — compliance, security
  requirements — and can also restrict which plugin marketplaces are
  trusted at all (`strictKnownMarketplaces`).

## Troubleshooting, systematically

The course's own checklist, in the order worth trying:

1. **Run the skills validator first** — catches structural problems
   before you waste time debugging anything else.
2. **Doesn't trigger** → almost always the description. Test real
   phrasings you'd actually use and add whichever ones fail to match.
3. **Doesn't load at all** → check that `SKILL.md` sits inside a *named*
   directory (not the skills root) and is spelled exactly `SKILL.md`;
   `claude --debug` surfaces loading errors directly.
4. **Wrong skill activates** → descriptions are too similar to each
   other; make them more distinct.
5. **Being silently overridden** → check the priority hierarchy for a
   same-named skill above yours; rename rather than fight the hierarchy.
6. **Plugin skills missing** → clear the cache and reinstall before
   assuming the plugin itself is broken.
7. **Runtime failures** → check for missing dependencies (declare them in
   the description), missing execute permission on scripts (`chmod +x`),
   and path separators (forward slashes everywhere, including Windows).

## Reflection / practice prompts

- Write the frontmatter (name + description) for one real task you
  currently re-explain to Claude often. Would it need `allowed-tools`?
- You have a personal skill and your organization has an enterprise skill
  with the same name — which wins, and what's the practical fix if you
  didn't want that outcome?
- Pick a hypothetical multi-file skill (e.g., a codebase-onboarding
  skill). Sketch what belongs in `SKILL.md` itself versus what you'd push
  into `references/` or `scripts/`.
