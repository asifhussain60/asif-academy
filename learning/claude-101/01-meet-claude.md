# Module 1 — Meet Claude

## Source note

Rewritten from the real, completed course (100% — certificate already
earned on your account). Paraphrased in my own words; the real course is
Copyright 2025 Anthropic, all rights reserved (no open license, unlike the
Fluency Foundations tier) — treat this as a condensed study companion, not
a copy.

## Learning objectives

By the end of this document you should be able to explain what Claude is
in one sentence, describe the three modes of the Claude desktop app (Chat,
Cowork, Code), and know two or three habits that reliably improve Claude's
answers.

## What Claude actually is

Claude is built around being **helpful, honest, and harmless** — an
approach the real course calls Constitutional AI, meant to keep Claude
aligned with human values and transparent about how it operates. The
course's framing is deliberate: Claude isn't "a chatbot," it's a **thinking
partner** — capable of summarization, research, analysis, creative and
collaborative writing, and coding, all with a consistent personality you
can steer. It's available everywhere you work (web, desktop, mobile, and
inside Slack, Excel, PowerPoint, Word, and Outlook), with conversations,
projects, and preferences syncing across devices when you're signed in.

Two capabilities worth knowing the shape of: a large context window (200K+
tokens standard, up to 1M on paid plans with supported models — roughly
500+ pages of material in a single conversation), and **extended
thinking**, available on recent Opus and Sonnet models, which lets Claude
work through a hard problem step by step rather than answering instantly.

## The three surfaces: Chat, Cowork, Code

The Claude desktop app organizes work into three modes, and Cowork and
Code both actually run on the same underlying engine as Claude Code —
capable of working locally, spinning up sub-agents, and sustaining long
tasks on their own:

- **Chat** — the familiar claude.ai experience, best for quick questions,
  brainstorming, and back-and-forth drafting. Running natively adds a few
  extras: a quick-entry overlay (double-tap Option on Mac) that keeps
  Claude one keystroke away without leaving what you're doing, screenshot
  and window sharing so Claude sees what you see, dictation, and desktop
  connectors to local tools.
- **Cowork** — an agentic mode for sustained, multi-step work: thorough
  research briefs, cross-source analysis, polished documents assembled
  from material spread across many places. You give it a goal; it plans,
  works through a visible task list, and can run several tasks in parallel
  sessions. Distinctive features: folder access (point it at a folder,
  it reads and saves work back there), scheduled recurring tasks,
  sub-agents for parallelizing parts of a complex task, browser and
  computer use as fallback paths when no connector exists, and a
  contained environment that can't reach outside the folders you've
  shared.
- **Code** — full Claude Code, working directly in a real codebase with
  file system and terminal access, visual diffs, and git tracking. You
  choose Local (your machine, live preview) or Remote (a GitHub repo in
  the cloud, session persists after you close the app), and one of three
  interaction modes — **Ask** (every change proposed and approved first),
  **Code** (files change automatically, terminal commands still confirmed),
  or **Plan** (full approach reviewed before anything is touched).

The practical skill is knowing which one a task actually needs: a quick
exchange is Chat; sustained multi-source work is Cowork; anything touching
a real codebase is Code.

## Writing an effective first message

The course's prompting framework has three parts, and it's worth noticing
it's the same underlying discipline as the AI Fluency Framework's
Description competency (Tier 0 of this path), just given different names
here:

1. **Setting the stage** — your role, objective, and any context Claude
   can't infer on its own.
2. **Defining the task** — the specific action you want (write, analyze,
   build, something else).
3. **Specifying rules** — tone, style, format, and examples of what "good"
   looks like.

A prompt that does all three at once reads like a real brief, not a
keyword fragment — and the course's own example is worth internalizing:
stating who you are, what you're preparing, and exactly what structure and
sourcing you expect, all in one message, rather than trickling that
information out over several follow-ups.

## Adding context and personalizing Claude

Claude can read both text and visual content in uploaded files (PDF, DOCX,
CSV, TXT, images), which is often faster than describing a document in
words. Two features make Claude better over time without you repeating
yourself: **Memory**, which automatically retains context like your role
and preferences across conversations (reviewable and editable in
Settings), and **Styles**, which let you set a default communication style
— concise, formal, explanatory, or a fully custom one — applied to every
conversation automatically.

## The iteration mindset

The course's core reframe: your first prompt is a starting point, not a
final attempt. Effective use looks like treating first drafts as drafts,
giving specific corrective feedback ("cut the first two paragraphs and
make the conclusion more action-oriented" beats "make it shorter"), and
knowing when a conversation has drifted enough that starting fresh beats
trying to redirect it.

## Common problems and fixes

| Problem | Likely cause | Fix |
|---|---|---|
| Response too generic | Not enough situational context in the prompt | Add audience, role, and constraints explicitly |
| Wrong length | Claude guessed at what you wanted | State a length directly ("two paragraphs," "under 100 words") |
| Wrong format | Understood the ask, not the presentation | Show an example, or describe the structure explicitly |
| Confident but wrong specifics | Same Next-Token-Prediction limitation covered in Tier 0 | Verify independently for high-stakes facts; ask for citations or enable web search |
| Wrong tone | Default tone doesn't match your need | Describe the tone directly, or show an example |

## A lightweight way to evaluate Claude on your own work

The course frames this as Discernment in practice: gather 5–10 real
examples of a task you already do, write prompts that would produce
something similar, run them, and compare against your originals — does it
capture the key information, is the tone right, what's missing. This turns
a vague sense of "is Claude good at this" into an actual, testable answer
for your specific work.

## Reflection / practice prompts

- Rewrite one of your own recent one-line requests to a coworker as a full
  three-part prompt (stage, task, rules) — what did you leave implicit
  that you'd need to spell out for Claude?
- Pick a real task from this week. Which surface — Chat, Cowork, or Code —
  actually fits it, and why?
- Run the lightweight eval above on one recurring task you do. What did
  you learn about where Claude needs more context from you?
