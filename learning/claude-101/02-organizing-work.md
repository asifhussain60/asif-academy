# Module 2 — Organizing Your Work and Knowledge

## Source note

Rewritten from the real, completed course content. Paraphrased; Copyright
2025 Anthropic, all rights reserved.

## Learning objectives

By the end of this document you should be able to distinguish Projects,
Artifacts, and Skills, and know which one to reach for when a task doesn't
fit a single one-off message.

## Projects — a persistent, shareable workspace

A **Project** is a self-contained workspace with its own memory, chat
history, uploaded knowledge base, and custom instructions that apply to
every conversation inside it. It's the right tool once you have reference
material you'll use repeatedly, consistent requirements for how Claude
should respond, or a team that needs to share the same context.

Setup is three steps: name and describe the project, write **instructions**
(context, process, tone — applied to every chat in the project), then
build the **knowledge base** by uploading reference documents (naming them
descriptively matters — Claude uses filenames to decide what's relevant).
When a knowledge base grows large enough to approach the context window's
limit, Claude automatically switches to **Retrieval Augmented Generation
(RAG)** — retrieving only the most relevant pieces of your uploaded
material for a given question instead of loading everything at once,
expanding effective capacity by up to 10x without you doing anything
differently.

For Claude for Work (Team/Enterprise) users, projects are shareable at
three permission levels: **Can view** (read-only), **Can edit** (full
collaboration), and **Owner** (controls sharing). The course's practical
advice: start with one focused project rather than trying to build one
project for everything, keep the knowledge base current, and reference
specific documents by name in your questions to help Claude focus its
search.

## Artifacts — a piece of output that stands on its own

An **Artifact** is a standalone, interactive output rendered in its own
window alongside the conversation, rather than buried in chat as a wall of
text. Claude creates one automatically when content is substantial and
self-contained (typically 15+ lines) and likely to be reused or edited —
document types (markdown, Word, PDF, PowerPoint, Excel), code in any
language, full HTML pages, SVG graphics, Mermaid diagrams, and interactive
React components with real working logic, not just mockups.

If Claude doesn't create one automatically when you expect it, just ask
directly ("create this as an artifact"). Sharing options scale with your
plan: copy or download for personal use, internal sharing within a Claude
for Work organization, or **publishing publicly** — anyone with the link
can view and interact (and "remix" it into their own conversation) without
a Claude account, though only the specific published version is exposed,
your chat itself stays private, and published artifacts aren't indexed by
search engines.

Getting good results: be specific about what you want (a full description
beats "build a budget tracker"), describe who the end user is, and iterate
one change at a time rather than requesting several changes simultaneously.

## Skills — a packaged, repeatable procedure

A **Skill** is a folder of instructions, scripts, and resources Claude
loads dynamically for a specialized task — an "expertise package." You've
already used Skills invisibly if Claude has ever built you an Excel file,
PowerPoint, Word doc, or PDF; those are Anthropic's built-in Skills running
behind the scenes. **Custom Skills** go further, codifying an entire
repeatable workflow — a quarterly variance analysis method, a brand-voice
review process, a compliance checklist — so Claude follows the same steps
every time rather than improvising.

Skills require Code execution and file creation to be enabled (Settings →
Capabilities), and are currently a feature preview on Pro, Max, Team, and
Enterprise plans. The easiest way to build a custom Skill is by describing
it conversationally — Claude interviews you about what the skill should
do, what good output looks like, and can ingest example materials you
upload, then generates the properly structured skill file itself; no
manual coding required. Because Skills can include executable code, the
course's security guidance is direct: only install custom Skills from
sources you trust, and review anything from outside your own account
before use.

## Telling Projects and Skills apart

The course's own framing is the clearest version of this: **projects store
knowledge, skills perform tasks.**

| | Projects | Skills |
|---|---|---|
| Purpose | Store knowledge Claude references | Define a process Claude executes |
| Best for | Long-term context, reference material, team collaboration | Repeatable, multi-step workflows |
| Persistence | Available across every chat in the project | Applied whenever the skill is invoked |

They compose rather than compete — a Skill can pull from knowledge stored
in a Project (a "customer call prep" skill drawing on customer profiles
already uploaded to a project's knowledge base): the project supplies the
*what*, the skill supplies the *how*.

## Reflection / practice prompts

- Think of one recurring task you do weekly. Would it be better served by
  a Project (because it needs stable context) or a Skill (because it's the
  same procedure every time)? Could it genuinely be both?
- Name a piece of content you've asked Claude for recently that you had to
  copy out of the chat manually — that's a candidate for an Artifact next
  time, and worth asking for explicitly if Claude didn't offer one.
- What's one piece of team "tribal knowledge" — a format, a style rule, a
  checklist — that could become a custom Skill instead of being
  re-explained every time?
