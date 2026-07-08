# Module 1 — Claude Code 101

## Source note

Rewritten from the real course (12 lessons, via your logged-in session,
1/13 already marked started on your account). Paraphrased in my own words;
Anthropic Academy course content, rights reserved to Anthropic.

## Learning objectives

By the end of this document you should be able to explain what makes
Claude Code an *agent* rather than a chat tool, install it in your
preferred environment, and run the Explore → Plan → Code → Commit workflow
end to end.

## What separates Claude Code from Claude.ai

Claude Code has direct access to your files, your terminal, and your whole
codebase — instead of copy-pasting code back and forth with a chat window,
it goes in and does the work itself. The course's core definition: an **AI
Agent** is software that interacts with its environment and takes actions
toward a goal, built on a large language model operating in a loop in real
time, with access to tools, external services, or other agents. Concretely,
Claude Code can read and explain your codebase, edit files across a whole
project (refactor a function and update every reference to it), run
terminal commands and use their output to decide what to do next, and
search the web for documentation it needs.

Three concepts govern using it well: the **context window** (working
memory — large, but not infinite, which is why it searches strategically
rather than loading your whole codebase at once), **permission-asking by
default** (you're in control of how hands-on or hands-off you want to be),
and the plain fact that **it can make mistakes** — misreading intent,
introducing a bug, or over-engineering a fix — which is why staying in the
loop matters.

## The agentic loop

Underneath every interaction: you send a prompt, Claude gathers context
and gets back either text or a tool call to execute, it takes action
(editing a file, running a command), then verifies whether the result
actually achieves the goal — looping back to try again if not, or stopping
to wait for your next prompt if so. You can add context, interrupt, or
redirect at any point in that loop.

**Tools** are what let Claude Code *do* things instead of only producing
text — a file-reading tool, a web-search tool, and others — with Claude
deciding when a tool is needed and how to use what it returns.
**Permissions** come in three modes: default (asks before every edit or
command), auto-accept (edits proceed automatically, commands still need
approval), and Plan Mode (read-only tools only, compiles a full plan
before any work starts). All of this is configurable in settings, and the
course is direct about the risk of skipping permissions broadly: a mistake
becomes much harder to catch before it happens.

## Installing Claude Code

Available in five places, each suited to a different way of working:

- **Terminal** — the one-line install command (curl on macOS/Linux/WSL,
  PowerShell or CMD on Windows); features ship here first.
- **VS Code** — install the official Anthropic extension, near-identical
  experience to the terminal, can be opened as its own tab.
- **JetBrains** — install via the JetBrains Marketplace plugin.
- **Claude Desktop** — a "Code" toggle alongside chat, good for letting
  Claude run in the background while you do other things.
- **Web** (claude.ai/code) — works against a connected GitHub repository,
  good for working remotely without a local environment.

Whichever directory you run `claude` from becomes the project it can see
and act on, including subfolders.

## Writing your first prompt, and the two modes worth knowing early

`Shift+Tab` cycles between **Approval mode** (permission asked every time)
and **Auto-accept mode** (file edits proceed automatically, commands still
confirmed) — neither is "correct," it's a matter of how closely you want
to watch. **Plan Mode** (also via `Shift+Tab`) is worth calling out
specifically: Claude uses only read-only tools to research your codebase
and your request, asks clarifying questions, and returns a full plan
*before* touching anything — the course's own example is asking for a
dark-mode toggle and having Claude propose the approach, contrast colors
included, before writing a line of code.

## The Explore → Plan → Code → Commit workflow

The course's central claim: skipping straight to "write the code" is the
single most common way people get worse results from Claude Code than
they should.

- **Explore & Plan** — done together via Plan Mode: Claude reads relevant
  files and researches the approach without editing anything. This is the
  cheapest point to course-correct, since no code has been written yet —
  and you can also run an "explore" pass without Plan Mode active if you
  just want a codebase summary with no changes intended.
- **Code** — once you approve the plan, Claude works through it (auto-
  accept or step-by-step, your choice). Three habits that make this phase
  smoother: state an explicit success criterion up front, add relevant
  tools (e.g., the Claude in Chrome extension if you're validating a web
  UI directly), and hand Claude a real test suite it can validate against
  rather than working un-checked.
- **Commit** — after you've verified the changes yourself, run a fresh
  subagent as a code reviewer first (a genuinely separate context, without
  the main session's built-up bias toward its own work), then have Claude
  draft the commit message in your style.

## Managing context deliberately

Context is consumed by every file read, every command run, every message
sent — and it's finite. When you hit the limit, Claude Code **compacts**
automatically (summarizing and discarding what it judges non-essential,
which can lose detail). You control this directly: `/compact` to
manually free space while keeping a working memory of what you were doing
(use mid-feature, when you still need continuity); `/clear` to wipe the
slate completely (use when starting a genuinely new feature, so the old
conversation doesn't bias the new one); `/context` to see a breakdown of
what's actually consuming your window right now.

Three habits save context directly: **be specific** (a vague prompt
actually costs *more* context long-run, since Claude has to explore and
reason more to compensate); **manage MCP servers** (every connected server
loads its tool definitions into context whether you use them or not —
disable what's irrelevant to the current project, or prefer a Skill, which
only loads fully once judged relevant); and **use subagents** for anything
where you only need the answer, not the journey — a subagent explores in
its own separate context and returns just a summary.

## Persistent project memory: CLAUDE.md

Without one, Claude Code re-explores your codebase from a blank slate
every session, sometimes making assumptions you then have to correct. A
`CLAUDE.md` file at your project root is read automatically every session —
an onboarding script covering your stack, your commands (dev server,
tests, lint), and your code-style conventions, appended to every prompt
automatically. It should be committed to version control so your whole
team benefits, and there's a two-level hierarchy: **project-level**
(shared, root of the repo) and **user-level** (personal preferences,
applies across all your own projects).

Two practical habits: when you catch yourself correcting Claude on the
same thing repeatedly, explicitly ask it to save that rule to memory
rather than repeating the correction forever; and consider starting a
*new* project without a `CLAUDE.md` at all initially, so you can see where
you actually keep course-correcting — then run `/init` once you know what
belongs in it, rather than guessing up front.

## Subagents

A subagent runs a delegated task — "explore this codebase for me" — in its
own, completely separate context window, then returns just a summary to
the main session, keeping the main context free of exploration noise.
Create one with `/agents` → "Create new agent," which walks through scope,
purpose, tool access, and (cosmetically) a color. Subagents can carry
their own persistent memory across sessions, and can have specific Skills
preloaded — though note a Skill preloaded into a subagent loads in full
immediately, unlike the progressive-disclosure behavior Skills normally
get in the main conversation. (The full *Introduction to Subagents* course
goes deeper — see Tier 3 of this path.)

## Skills (brief — full course is Tier 3)

This lesson is mostly video in the real course; the one line of text worth
keeping is the pointer itself: go deeper with the dedicated *Introduction
to Agent Skills* course, covered in full in Tier 3 of this learning path.

## MCP — connecting external tools and data

**Model Context Protocol (MCP)** is the open standard letting Claude Code
reach things outside your codebase — a project-management tool like
Linear, a docs server like Context7 for up-to-date dependency
documentation, and more — the same "tools give agents the ability to act"
idea from earlier in the course, now extended past your local files.

Add a server with `claude mcp add`; servers are either **HTTP** (remote,
hosted by the provider) or **stdio** (a local process). Manage what's
connected with `/mcp` inside a session. Scope determines who gets a
server: **local** (just you, this project), **user** (you, every
project), or **project** (a checked-in `.mcp.json` — your whole team gets
the same servers automatically). The context-cost warning repeats from
earlier: every connected server's tool definitions sit in context whether
used or not — prefer a CLI equivalent when one exists (more
context-efficient than a persistent tool definition), consider a Skill
instead where that fits better, and know that Claude Code auto-switches to
an on-demand tool-search mode if MCP tools exceed roughly 10% of the
context window (less reliable than having only what you need connected).

## Hooks — deterministic control

The distinguishing feature of a hook versus everything else in this
course: **hooks always run**. Telling Claude in `CLAUDE.md` to run a
formatter after every edit works most of the time; a hook makes it happen
every time, no exceptions — useful for auto-formatting, compliance
logging, blocking dangerous operations (writes to production config, `rm
-rf`, commits to `main`), and completion notifications.

Configured in `settings.json` (or via `/hooks`) against specific
lifecycle events — `PreToolUse`, `PostToolUse`, `UserPromptSubmit`,
`Stop`, `Notification`. A `PreToolUse` hook can actually block an action:
exit code 0 proceeds normally, exit code 2 blocks the action and feeds
your stderr message back to Claude as the reason (so it can adjust), any
other code surfaces as a non-blocking error to you. Project-level hooks
in `.claude/settings.json` are checked into the repo so the whole team
gets them; use the `CLAUDE_PROJECT_DIR` environment variable so
hook scripts resolve correctly regardless of Claude's current working
directory. The course's own rule of thumb: if something must happen every
time without fail, it belongs in a hook, not a prompt.

## Reflection / practice prompts

- Install Claude Code in the one environment you're most likely to
  actually use, and run one small, real task through the full Explore →
  Plan → Code → Commit loop.
- Pick a real repo you work in. What five lines would you put in its
  `CLAUDE.md` today, based on corrections you've had to make to an AI
  tool before?
- Name one thing in your own workflow that currently relies on you (or
  Claude) remembering to do it every time — is that a hook candidate?
