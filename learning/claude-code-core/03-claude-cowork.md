# Module 3 — Introduction to Claude Cowork

## Source note

Rewritten from the real course (14 lessons, via your logged-in session,
2/15 already marked started on your account). Paraphrased in my own words;
Anthropic Academy course content, Copyright 2026 Anthropic, all rights
reserved.

## Learning objectives

By the end of this document you should be able to explain how Cowork
differs from both Chat and Code, delegate a real task through it, and know
which of the four "make it yours" building blocks (global instructions,
projects, skills, plugins) to reach for first.

## What Cowork actually is — delegating, not chatting

The single mental-model shift the course insists on: **Cowork is about
delegating, not just chatting.** Chat is turn-by-turn — you ask, Claude
responds, you iterate one exchange at a time, one tool at a time. Cowork
sustains a whole piece of work: it pulls from many tools at once, works
through a multi-step plan, and returns a finished, saved deliverable. The
telltale shape of a Cowork-worthy task has three ingredients at once: it
touches **local files**, spans **multiple tools**, and takes **multiple
steps** — a request like "check what we decided about pricing across the
Q3 meeting notes, sales emails, and leadership Slack, then write a
one-page summary for the exec team" is Cowork's kind of work precisely
because no single one of those sources or steps would justify it alone.

Chat, Cowork, and Code are three different shapes of work on the same
desktop app: **Chat** for thinking, drafting, and one-response answers;
**Cowork** for delegating sustained, multi-tool, file-producing work;
**Code** for building software inside a real codebase with terminal and
git access. Most knowledge workers live mainly in Chat and Cowork, using
them for genuinely different things rather than treating Cowork as "a
smarter Chat."

## Setting up: the folder, the connectors, the permissions

Three setup decisions matter more than anything else:

- **The working folder** — the single most important choice per task.
  Point Cowork at the smallest folder that actually holds what the task
  needs (not your whole Documents folder). This is also the core
  difference from Chat: in Chat, Claude reads what you upload but can't
  save anything back; in Cowork, the folder is read *and write* — Claude
  edits existing files and creates new ones there directly.
- **Connectors** — the apps where your work already lives (email,
  calendar, Slack/Teams, cloud storage, CRM/project tools), set up once
  in Customize and toggled on or off per task. Cloud connectors vary in
  what they can do — some are read/search-only, others can create or
  edit — so check each one's description rather than assuming. Anything
  with no connector but a browser interface is covered by **Claude in
  Chrome** instead (below).
- **Permissions** — two modes: **Ask before acting** (Claude pauses for
  approval before anything that touches the outside world — sending,
  posting, sharing) and **Act without asking** (faster, no pause, reserve
  for tools and tasks you already trust). One guarantee holds in both
  modes: Claude always asks before permanently deleting a file, with no
  way to skip that specific prompt.

## Recognizing Cowork-shaped work, and the two ways to trigger it later

Three patterns cover most good-fit tasks: **multi-step** (gather,
compare, draft, format — handed off as one prompt instead of five),
**file-based** (the objective is a real saved artifact — a doc, sheet,
deck — built from files that already exist in your folder), and
**multi-tool** (the work spans systems you already use, planned and
executed as one delegation instead of you stitching each tool's output
together yourself).

Once you've found a task worth repeating, two mechanisms carry it forward
without you re-triggering it manually: **scheduled tasks** (`/schedule`
— describe the task and cadence, or turn an already-successful one-off
task into a recurring one directly; only runs while your machine is on,
and catches up if it wasn't) and **Dispatch** (assign a task from the
Claude *mobile* app; it actually executes on your desktop with the same
files, connectors, and permissions, notifying you when done — requires
the desktop app open and awake).

## Delegating your first real task

A good Cowork prompt does three things: **names the deliverable**
(format and length — "a one-page brief," not just "help with this"),
**names the inputs** (which folder, which channels, which date range),
and **names the nuance** only your expertise supplies (a constraint or
lens Claude couldn't otherwise guess). This front-loads the back-and-forth
that would otherwise happen turn-by-turn in Chat — more upfront effort,
but it's traded against the five rounds of "actually, can you also..."
that a vague prompt produces instead.

Expect **clarifying questions** before Claude dives in — this is Cowork
closing context gaps *before* the work starts, not friction; most are
multiple-choice with an option to answer in your own words if none fit.
While it runs, **you can steer mid-task** rather than waiting for a
finished (and possibly wrong) result — the course is explicit that the
Chat-trained instinct to "wait, then regenerate" is the wrong habit to
bring here; interrupting and redirecting mid-run costs far less. When it's
done, **review the deliverable with real discernment**: does it meet the
actual objective, are referenced facts verifiable against the real source
material, and does anything — a specific date, name, or quote — look
un-traceable to an actual input. If the draft is mostly right, tell Claude
what to change rather than starting over; if it's wrong in a load-bearing
way, the prompt was likely missing that load-bearing context in the first
place.

## Making Cowork yours: four compounding building blocks

Four mechanisms make Cowork progressively more capable of your specific
work, each carrying forward a different kind of knowledge:

- **Global instructions** — a standing brief (Settings → Cowork) applied
  to *every* session: who you are, your team's shorthand and acronyms, and
  your default output preferences. This is usually the first thing worth
  setting up, and it doesn't need to be complete on day one — recurring
  corrections you find yourself giving are exactly the candidates to
  promote into it.
- **Projects** — a workspace scoped to one ongoing stream of work (a
  client account, a recurring deliverable, a launch), holding its own
  instructions, scheduled tasks, and context (folders/links) — plus
  **memory that Claude builds automatically** from conversations inside
  it, which is the actual difference a project makes: the next
  conversation opens already knowing the account's situation and last
  week's decisions, rather than starting cold. Three ways to start one:
  from scratch, from an existing folder, or migrated one-way from an
  existing Chat project.
- **Skills** — a reusable playbook (a folder Claude loads automatically
  when a task matches it) built from up to four kinds of files:
  **instructions** (the `SKILL.md`, written like a runbook for a new
  colleague), **assets** (templates, logos, brand materials),
  **references** (examples of what "good" looks like for this process),
  and **scripts** (small pieces of code for the parts that should run
  identically every time). Not every skill needs all four — the mix
  follows what the actual process requires. The fastest way to build one
  is conversationally: describe the recurring process you're tired of
  re-explaining, and Claude interviews you and generates the skill folder
  itself.
- **Plugins** — a packaged bundle of several skills (plus the connectors
  and subagents they depend on) built around a job, in one of two shapes:
  an **end-to-end process** (sequential skills covering each step of one
  workflow, e.g. a monthly-close plugin) or a **team's most-used skills**
  bundled together even though they're independent of each other (e.g. a
  finance plugin covering variance analysis, modeling, and memo drafting
  as separate, unrelated skills). Anthropic publishes ready-made plugins
  per common role in the marketplace; any installed plugin can be
  customized further by pointing Claude at your team's real examples and
  templates.

These aren't a day-one checklist — they show up in the order your real
usage surfaces the need: global instructions first, projects as recurring
work surfaces, skills once you notice yourself re-explaining the same
process, plugins once a skill (or few) is worth sharing.

## Cowork beyond the desktop app

**Claude in Chrome** is the bridge for anything with no connector but a
browser interface — internal dashboards, vendor portals, customer systems
behind SSO, any web app with a login. It works *with* Cowork in one
conversation: Claude reads and acts on a page in Chrome, then hands what
it found back into the same Cowork task to build the actual deliverable.
You must already be signed in yourself — Claude works inside your existing
authenticated session, it doesn't log in on your behalf — and, as with
connectors, it's worth being deliberate about what you give it access to,
since on the open web it can see whatever you can see.

**Claude for Microsoft 365** puts Claude inside Word, Excel, PowerPoint,
and Outlook as a sidebar, working on the specific file or space you
already have open — and, distinctively, **one conversation can carry
context across apps**: build an analysis in Excel, hand it to PowerPoint
to slide-ify, use a Word memo as the source for an Outlook reply draft.
The rule of thumb for choosing between the two surfaces: reach for
**Cowork** when the work pulls from many sources and ends in a new
deliverable; reach for **Claude in M365** when you're editing a document
you already have open in place. Most real work actually uses both in
sequence rather than picking one.

## Working safely

Beyond the built-in floor (always asks before deleting; asks before
sending/sharing in default mode), the course's practical layer is yours to
add: use a **dedicated working folder** rather than pointing Claude at
Documents or Downloads wholesale; **back up anything irreplaceable**
before letting Cowork near it; **test new recurring workflows against
copies** before pointing them at live data; and **be specific about
destructive verbs** in your prompts ("remove the section from the draft
but keep the file" instead of an ambiguous "cut the section," which could
be read as deletion). In the moment, three checks catch most of what
slips through: read the plan once it's proposed, watch for the task
touching files or sites you didn't mention, and actually read confirmation
prompts rather than reflexively approving them. The course is direct about
when Cowork is the *wrong* tool: regulated workflows needing an audit
trail (Cowork activity isn't captured in compliance logs or data
exports), anything you wouldn't trust an unsupervised colleague to do
(sending a legal document externally, posting a public announcement), and
sensitive personal data outside what your organization has explicitly
approved.

## Validating and sharing what you build

Before a personal skill becomes something a teammate relies on, run it
through a lightweight **eval**: `skill-creator` generates realistic test
prompts, produces a with-skill and without-skill output side by side for
each, and you give plain-English feedback on which you'd actually send —
Claude revises the skill from that feedback, one change at a time, until
it holds up. This isn't a bureaucratic gate; if a skill's outputs already
look right on the first pass, there's nothing further to do.

Scaling a proven skill (or bundled plugin) across a team goes through an
organization's private marketplace, published by whoever owns it (a team
lead, enablement, or IT) at one of several install levels — **available**
(shows in the Directory, opt-in), **installed by default** (present but
removable), or **required** (stays on, for things like compliance checks
everyone must run identically). Healthy shared plugins have one named
owner, get re-evaluated before every published change, use specific
rather than generic names (to avoid colliding with similar plugins
elsewhere in an org), and get reviewed on a regular cadence so unused ones
get retired rather than quietly going stale.

## Reflection / practice prompts

- Pick one task from your own week that's multi-step, file-based, *and*
  multi-tool all at once — the shape the course says is Cowork's actual
  sweet spot, not just one of the three.
- Write a five-sentence first draft of your own global instructions block
  — role, shorthand your team uses, and your default output preferences.
- Name one recurring process you currently re-explain to Claude (or to a
  new teammate) every time — that's your first real Skill candidate.
- Before handing Cowork an unsupervised, scheduled task: which folder
  would you point it at, and is there anything irreplaceable inside that
  needs a backup first?
