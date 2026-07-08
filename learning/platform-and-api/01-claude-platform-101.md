# Module 1 — Claude Platform 101

## Source note

Rewritten from the real course (13 lessons, via your logged-in session).
Paraphrased in my own words; Anthropic Academy course content, rights
reserved to Anthropic.

## Learning objectives

By the end of this document you should be able to make a real API call,
choose a model tier deliberately, run a full agent loop with tools, use
Anthropic's built-in server tools, and know when to hand the whole loop to
a managed agent instead of running it yourself.

## Your first API call

Every call goes through `messages.create` with three things: a **model**,
a **max_tokens** cap, and a list of **messages** (`user`/`assistant`
roles). A `system` parameter shapes persona directly (e.g., "You are a
terse senior code reviewer"). The response's `content` is **an array of
blocks**, not a plain string — usually just one `text` block for a simple
reply, but Claude can return multiple blocks (text, tool calls, thinking),
so real code always loops and checks each block's `type` rather than
assuming a single string. Store the API key in `.env.local`, never
hardcoded — that's how keys end up leaked on GitHub. The exact same
`messages.create` shape is the engine behind a real product feature (a
summarize endpoint, say) — just wrapped in a route handler instead of a
standalone script.

## Choosing the right model

Four tiers, from a `model` parameter: **Fable** (sits above Opus, highest
capability and cost — reserve for the hardest problems, worth its premium
only when the extra capability actually pays for itself), **Opus** (most
capable of the three core families, but slowest and most expensive — deep
reasoning, complex multi-step coding, nuanced writing), **Sonnet** (the
production sweet spot — balanced intelligence, speed, and cost), and
**Haiku** (fastest, cheapest, optimized for high-volume low-complexity
work — classification, extraction, routing).

The course's practical method: build a small **evaluation** first — 20-30
representative examples from your actual workload, scored against what
"good" means for that task — then work *up* the tiers: try Haiku first,
step up to Sonnet only if quality doesn't hold, reach for Opus only when
the task genuinely needs it. `response.usage` reports input/output token
counts directly — what your bill is actually calculated on. In
production, different tasks inside the *same* endpoint often route to
different models entirely (a document pipeline might classify every file
with Haiku, draft client updates with Sonnet, and reserve Opus only for
the RFP responses) — one queue, several models, picked per task rather
than one model for everything.

## The agent loop, concretely

An **agent** is Claude running both sides of a messaging loop without a
human in the middle: receive a task, pick a tool, execute, decide what's
next, repeat until done. The loop itself is simple and worth memorizing
verbatim:

1. Send messages to Claude with `tools` available.
2. If `stop_reason` is `end_turn`, Claude is finished — print the text
   and stop.
3. If `stop_reason` is `tool_use`, run whichever tool(s) Claude
   requested, push both Claude's response *and* your tool results back
   into `messages`, and loop again.

That's the entire pattern everything else in this course builds on — the
only things that change between a toy demo and a production compliance
agent are which real tools get called and what happens to the output
(streamed to a UI, written to a database), not the shape of the loop
itself.

## Tool use — the mechanics

A **tool** is a JSON schema (`name`, `description`, `input_schema`) you
define; Claude decides *when* to call it, but **your code executes it,
never Claude directly**. The single biggest cause of an agent misfiring
or ignoring an available tool is a vague `description` — it's the only
thing Claude has to decide relevance from, so it needs to be specific.
With multiple tools declared at once, Claude picks which one(s) fit a
given request based on how closely each description matches the intent —
adding a third tool is just adding another array entry and another
dispatch case, nothing structural changes.

The SDK's **tool runner** (TypeScript, Python, Ruby) removes almost all of
this boilerplate: point it at your actual functions, and it builds the
JSON schema from your code's own types and docs, then runs the entire
tool-use/tool-result loop internally — `runner.untilDone()` returns the
final assistant message once everything has settled, with no manual
`while` loop, no `stop_reason` switch, no manually re-appending tool
results. Real tools in production are thin wrappers around functions that
already exist in your codebase — nothing about the pattern changes moving
from a mock weather lookup to a compliance agent citing real building-code
lookups.

## Extended thinking

**Extended thinking** lets Claude reason step-by-step (visible chain-of-
thought tokens) before answering, specifically to avoid the failure mode
where a multi-step question gets a confident, immediate, wrong answer.
With Opus 4.7, thinking is **adaptive** — you don't set a token budget,
you just turn it on and Claude decides how much reasoning a given request
needs. Depth is controlled by an `effort` parameter (inside
`output_config`, not next to the thinking block) at five levels: `low`,
`medium`, `high` (default), `xhigh`, `max`. Use it for math, multi-step
logic, debugging, and anything trading off competing options; skip it for
simple classification or extraction, where it only adds latency and cost
with no quality benefit. In production, this is the difference between an
agent that finds problems one at a time versus one that connects them
across a whole document — e.g. catching that a wind-load spec in one
section conflicts with a material spec elsewhere, which requires actually
reasoning across sections rather than processing each one independently.

## Built-in server tools

Some capabilities are common enough that Anthropic ships them pre-built
and **runs them on Anthropic's own infrastructure** — you declare the
tool, you never execute it yourself, and critically **no agent loop is
required for these** since the result already comes back inside the same
response. The main three: **web search** (returns results with
citations), **code execution** (writes and runs real Python in a
sandbox), **web fetch** (retrieves full URL content). Watch for new block
types in the response — `server_tool_use` for the call itself, plus a
tool-specific result block (e.g. `bash_code_execution_tool_result` with
real `stdout`). A separate category, **client tools** — `memory` (reads
and writes across sessions) and `bash` (a persistent shell) — ship with a
schema and runner in the SDK but actually run on *your* side, same as a
custom tool would. One explicit caution: something being validated
against the live web doesn't make it true — always double-check.

## Skills, on the API

A **Skill** is a `SKILL.md` (plus optional scripts/resources) uploaded
once (`client.beta.skills.create`) and referenced by ID on any
`messages.create` call via `container.skills` — a *list*, so multiple
Skills can layer on one call. The distinction the course keeps sharpening:
**tools are about what Claude can do; Skills are about how you want it
done** — a tool looks something up or takes an action, a Skill is a
followed procedure (a status-report template, a review checklist).
Skills load progressively exactly as in Claude Code — only name and
description at startup, full content only once the agent judges it
relevant — keeping context lean even with many Skills available. Skills
often pair with code execution, since a Skill's procedure can involve
genuinely running scripts, not just following written instructions.

## MCP, and how it differs from both tools and Skills

The maintenance argument is the whole case for MCP: writing your own
integrations against Asana, Slack, and Google Calendar is doable once, but
you're then on the hook to keep updating all three every time any of
those APIs changes. An **MCP server** shifts that maintenance to the
service provider itself — Asana publishes and maintains its own server;
when their API changes, you change nothing. The clean three-way split:
**tools** are for your own systems (you own the maintenance), **Skills**
are for your processes (instructions, not necessarily integrations), and
**MCP** is for everyone else's systems (the provider owns the
maintenance).

Connecting is two pieces in a request: `mcp_servers` declares the
connection (`type`, `url`, `name`, optional auth token), and a
`mcp_toolset`-typed tool entry grants access — Claude then **introspects
the server itself** and discovers its tools with zero schemas written by
you. Access can be scoped down deliberately — `default_config: {"enabled":
false}` plus specific `configs` entries set to `true` — useful for
granting read access to a service (search, list) while withholding write
actions (post, delete) Claude shouldn't be able to trigger accidentally.

## Managing context deliberately

Context is *everything* Claude sees on a turn — system prompt, message
history, tool definitions and results, attached files/skills, thinking
blocks — and it's neither free nor infinite; once the window is full, the
request simply fails. Four patterns, matched to different failure modes:

- **Just-in-time context** (a design pattern, not an API feature) — don't
  front-load everything; load only what's needed now and let tools pull
  in more on demand (a compliance agent doesn't get the whole code book
  in its system prompt, it calls `lookup_building_code` when it actually
  needs a section).
- **Server-side compaction** — opt in with a `context_management` key
  (`edits: [{"type": "compact"}]`); the API auto-summarizes older turns
  once input crosses a trigger threshold, with no manual length tracking.
- **Prompt caching** — mark stable parts of a request (system prompt,
  tool definitions, a long reference document) for reuse across calls at
  a fraction of the cost; the math compounds fast (a 4,000-token system
  prompt called 100 times an hour is where caching stops being optional).
- **The memory tool** — for anything that must survive *across* sessions
  (user preferences, running notes, last week's decisions): Claude reads
  and writes a memory directory via tool calls, you own the actual
  storage backend, and Anthropic auto-injects an instruction telling
  Claude to check memory before starting.

Real production agents typically layer all four at once, each addressing
a different specific failure mode (cost, window size, statelessness) —
and managed agents (below) ship with caching and compaction on by
default, so choosing them sidesteps having to wire these up by hand at
all.

## Managed agents — the loop, hosted for you

**Managed Agents** run the same agent loop on **Anthropic's own
infrastructure** instead of your server, inside an isolated container
with file system access, bash execution, and web search — enabled by
default on every API account, no special access needed. Four primitives,
in order: **Agent** (the reusable persona — model, system prompt,
toolset), **Environment** (cloud or local sandbox, networking config),
**Session** (one actual run of an agent inside an environment — the unit
of work), **Events** (everything flowing in and out — actions, tool
calls, results, replies). The mental shift: you're not writing a `while`
loop anymore, you're sending events in and reading events out of a stream
— and that stream must be **opened before** the kickoff message is sent,
since it only delivers events occurring after it opens.

Three event types matter most when consuming the stream:
`agent.message` (Claude's text), `agent.tool_use` (which tool it picked),
`session.status_idle` (the run is finished). The course's real-world
examples show the actual ceiling this unlocks: a Kanban board where
dragging a ticket fires a session against a rubric (Lighthouse score,
render-blocking resources) with an independent grader evaluating the
result and looping Claude back to fix what it missed; a recurring
research agent with cross-session memory tracking SaaS pricing changes
week over week; and multi-agent incident response where a coordinator
delegates to specialists in the same shared file system, with sensitive
actions gated behind human approval before anything goes out.

The decision rule: reach for a manual loop when you want full control;
reach for managed agents when the loop would otherwise run too long
(minutes to hours), touch too many tools, need to survive a network
hiccup, or needs genuine statefulness across a run.

## Building Claude API integrations with Claude Code itself

Claude Code ships a built-in **Claude API** skill (`/claude-api`, or
auto-invoked when it detects the TypeScript SDK in a project — install
via `/plugin marketplace add AnthropicsSkills` if it's missing). Given a
prompt that names the file to change, the pattern to follow, and the
expected end state, Claude Code fills in a stub, runs it, and patches
errors in place — the recurring shape of Claude API code (define a tool,
hand it to a runner, return the result) is common enough that stubbing
the file and delegating the implementation is often faster than
hand-writing it, with the review happening on the diff rather than from
scratch.

## Reflection / practice prompts

- Sketch a 20-30-example evaluation set for one real task you'd want
  Claude to do — what would "good" mean for that specific task, concretely
  enough to score against?
- Pick a real external service you'd want an agent to reach (a ticketing
  tool, a wiki, a CRM). Would it be a custom tool, a Skill, or MCP — and
  why, using the "your stuff / your process / everyone else's stuff"
  split?
- Name one long-running, multi-tool task from your own work that would be
  a better fit for a managed agent than a loop you'd run and babysit
  yourself.
