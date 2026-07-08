# Module 2 — Introduction to Subagents

## Source note

Rewritten from the real course (4 lessons, via your logged-in session).
Paraphrased in my own words; Anthropic Academy course content, rights
reserved to Anthropic.

## Learning objectives

By the end of this document you should be able to explain what actually
happens when Claude Code spins up a subagent, create a custom one with
`/agents`, design its description and output format for reliability, and
recognize the specific situations where a subagent helps versus hurts.

## What a subagent actually does

A subagent runs in its own, separate conversation context: it receives a
custom system prompt (from its config file) plus a task description
written by the main agent based on what you asked, does its own work
(reading files, searching, editing — whatever it needs), and returns only
a **summary** to the main thread. The entire subagent conversation is then
discarded. The concrete win: your main context records the question and
the summary, not the fifteen files a research pass had to read to answer
it. The explicit tradeoff: you lose visibility into *how* the subagent got
there.

Claude Code ships three built-in subagents — **General purpose** (broad
multi-step exploration-plus-action), **Explore** (fast codebase search and
navigation), and **Plan** (research and analysis during Plan Mode, before
a plan is presented) — beyond which you can define your own.

## Creating a custom subagent

`/agents` → "Create new agent" is the interactive path. It walks through:
**scope** (project-level, current project only, versus user-level, shared
across all your projects), **generation** (describe what you want in
plain language and let Claude draft the name, description, and system
prompt — the recommended path over writing it by hand), **tool access**
(read-only, edit, execution, MCP, other — matched deliberately to what the
subagent's job actually requires), **model** (Haiku for fast/lightweight,
Sonnet as the middle ground, Opus for complex analysis, or Inherit to
match whatever the main conversation is using), and a **color** purely for
visually distinguishing which subagent is active when several exist.

The result is a markdown file (typically `.claude/agents/your-agent.md`)
with YAML frontmatter — `name` (how you reference it directly, including
`@agent your-agent-name` in a message), `description` (controls *when*
Claude delegates to it — must be a single line, can include example
conversations), `tools`, `model`, `color` — followed by the system prompt
as the body of the file. To make Claude reach for a subagent
*automatically* rather than only when explicitly asked, include the word
**"proactively"** directly in the description, plus concrete example
scenarios — the more specific the examples, the more reliably Claude
recognizes when to delegate.

## The description does double duty

This is the course's sharpest insight: a subagent's `description` field
doesn't just control *whether* it gets launched — it shapes **what input
prompt the main agent writes** when it does. A generic description on a
code-review subagent produces a vague hand-off like "use git diff to find
the current changes," leaving the subagent to guess which files actually
matter. Adding "you must tell the agent precisely which files you want it
to review" to the description causes the main agent to write a
*specific* list of files into the delegation itself. The same lever works
generally — e.g., adding "return sources that can be cited" to a
web-research subagent's description gets that instruction threaded into
every task the main agent hands it.

## Four things that make a subagent actually reliable

- **A specific description** — as above, shaping both trigger conditions
  and the instructions the subagent receives.
- **A defined output format** — the single highest-leverage change
  available. An explicit structured template (e.g., for a code reviewer:
  Summary, Critical Issues, Major Issues, Minor Issues, Recommendations,
  Approval Status) gives the subagent a natural stopping point — it knows
  it's done once every section is filled — and prevents the open-ended
  research spiral a subagent otherwise falls into without a clear
  "finished" signal.
- **An "Obstacles Encountered" section in that output format** —
  explicitly surfaces setup issues, workarounds, special command flags,
  or dependency problems the subagent hit along the way. Without asking
  for this directly, the main thread has to rediscover the same problems
  itself later, burning time and tokens redoing work the subagent already
  did once.
- **Deliberately limited tool access** — a research/read-only subagent
  needs only `Glob, Grep, Read` (structurally can't modify anything); a
  code reviewer needs `Bash` too (to run `git diff`) but still no
  `Edit`/`Write`; only a subagent whose actual job is changing code should
  get edit access at all.

## When subagents genuinely help

The decision rule the course gives is a single question: **does the
intermediate work matter to your main thread?** If you only need the
final answer, delegate — the exploratory noise is exactly what a subagent
is for hiding. If each step depends on discoveries from the previous one,
keep it in the main thread instead.

Three situations where delegation clearly wins:

- **Research and exploration** — tracing how authentication works in an
  unfamiliar codebase, say. The subagent reads dozens of files and traces
  function calls; your main thread gets back one clean fact ("JWT
  validation happens in `middleware/auth.js` line 42...").
- **Code review** — Claude reviews code it just wrote worse than code it's
  seeing for the first time, since it has trouble being genuinely critical
  of its own recent work. A reviewer subagent sees only the diff, in a
  separate context, with no memory of *how* the code was written —
  structurally closer to a fresh pair of eyes.
- **Tasks needing a genuinely different system prompt** — Claude Code's
  default prompt favors concise, code-focused output, which is actively
  wrong for some jobs. A copywriting subagent with different tone/voice
  instructions, or a styling subagent pointed at your design-system files
  (so color variables and spacing conventions load into its context
  automatically before it writes a line of CSS) are both cases where a
  different default personality is the actual point.

## Three anti-patterns to avoid

- **"Expert" personas** — a subagent prompted as "you are a Python expert"
  adds nothing; Claude already has that knowledge, so there's no
  capability an expert-framed subagent has that the main thread lacks.
- **Sequential pipelines with real dependencies** — a three-stage flow
  (reproduce a bug → debug it → fix it) sounds tidy but fails specifically
  because each stage genuinely depends on what the previous one
  discovered; information gets lost in the hand-off, exactly the case the
  decision rule says to keep in the main thread.
- **Test-runner subagents** — a subagent that reports "tests failed"
  without the full output forces you to build extra debug tooling to get
  detail that would have been visible directly. The course notes this
  pattern measured worse than direct test output across the board.

## Reflection / practice prompts

- Pick a real research question you've asked Claude Code recently (e.g.,
  "where does X get handled?"). Would a subagent's summary-only return
  have been enough, or did you need the intermediate steps too?
- Draft the description for a code-review subagent that would make the
  main agent hand it a *specific* file list rather than a vague "review
  my changes" — what exact phrase would you add?
- Name one subagent you'd want a genuinely different system prompt for
  (not just different tools) — what would make its default voice wrong
  for the main thread's usual style?
