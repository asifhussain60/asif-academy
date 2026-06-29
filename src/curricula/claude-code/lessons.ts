import type { Lesson } from '@/engine/types';
import { welcomeShowcase } from './showcase';

/**
 * All lessons, keyed by id. Phase A: thin skeletons (real titles + placeholder
 * blocks + sample tooltip/Q&A), plus the realized `welcome-showcase`.
 * The running example ("Release Notes Assistant") is threaded via slide notes.
 */
export const lessons: Record<string, Lesson> = {
  // ── Module 1 · Foundations ────────────────────────────────────────────────
  'welcome-showcase': welcomeShowcase,
  'what-is-claude-code': {
    id: 'what-is-claude-code',
    title: 'What is Claude Code?',
    blurb: 'The agent that reads, edits, and runs your project.',
    slides: [
      {
        id: 'cc-1',
        layout: 'two-column',
        steps: 1,
        estMinutes: 2,
        background: 'grid',
        details: {
          agent: {
            title: 'Agent',
            icon: '🤖',
            body: 'Software that pursues a goal by **taking actions on its own** — reading, editing, running — and reacting to what happens, instead of only producing text.',
            analogy: 'A new teammate you give a task to, not a search box you type into.',
            source: { label: 'How Claude Code works', href: 'https://code.claude.com/docs' },
          },
          tools: {
            title: 'Tools',
            body: 'The concrete actions Claude can take: **read a file, edit it, run a command, search the web.** Tools are how it touches your project instead of just describing it.',
            analogy: 'Its hands.',
          },
        },
        faqs: [
          {
            q: 'Is this just ChatGPT in my terminal?',
            a: 'No. A chat model returns text. Claude Code is an **agent**: it can open your files, change them, run the result, and react — a loop, not a single reply.',
          },
          {
            q: 'Does it see my whole codebase at once?',
            a: 'It doesn’t hold everything in memory. It **reads what it needs, when it needs it** — opening files, searching, running commands — the way a developer explores an unfamiliar repo.',
          },
          {
            q: 'Will it change files without asking?',
            a: 'For sensitive actions it **asks first** by default. You allow-list the routine ones you trust, so ordinary steps flow without prompts.',
          },
        ],
        talkingPoints: [
          [
            'So what *is* Claude Code, really? We’ve all heard it called an AI coding tool. True, and that label misses the one thing that actually matters.',
            'Here’s the word to hold onto: **agent.** Not chatbot. Agent. Everything else today is a footnote on it.',
            'What’s the difference? A chatbot hands us an answer and clocks out. An **agent** takes the goal and **does the work.** It reads our files, edits them, runs commands, and reacts to what comes back.',
            'So picture less of a *search box*, and more of an **eager new teammate we just handed a task to.**',
            'Get that one idea, and the whole rest of this tutorial clicks into place.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · What is Claude Code?', text: 'It’s an agent — not a chatbot', question: 'So what exactly is Claude Code?' },
          { kind: 'prose', size: 'lg', md: 'The word that matters is [[agent|agent]]: a chatbot **answers**, an agent **acts**. That one difference is what this whole tutorial is about.' },
          { kind: 'image', src: 'what-is-cc', size: 'sm', alt: 'Two panels: a vending machine handing back one answer, versus a busy many-handed robot reading, editing, and running a real project', caption: 'A chatbot answers once; an agent keeps working' },
          {
            kind: 'tiles',
            columns: 2,
            tiles: [
              { title: 'Chat', icon: '💬', tone: 'muted', body: 'Answers and **stops** — no follow-through. You take the reply and do the work yourself.' },
              { title: 'Agent', icon: '🤖', tone: 'accent', body: '**Acts** on your goal — reads files, edits code, runs commands — then **reacts and keeps going**. That self-direction is **agency**.' },
            ],
          },
        ],
      },
      {
        id: 'cc-2',
        layout: 'center',
        steps: 4,
        estMinutes: 1.5,
        background: 'grid',
        details: {
          surface: {
            title: 'Surface',
            body: 'Where you actually type to Claude Code — the terminal, an IDE panel, the desktop app, or the web. **Different doors into the same agent.**',
            analogy: 'Like checking the same email account from your phone, laptop, or the web.',
          },
        },
        faqs: [
          {
            q: 'Do I get a different Claude in the IDE vs. the terminal?',
            a: 'No — **same agent, same model, same loop.** The surface only changes how you see and approve its work, not what it can do.',
          },
          {
            q: 'Which surface should I start in?',
            a: '**The terminal is the simplest to reason about** and what we’ll use today. The IDE extension adds inline diffs; the web and desktop apps are handy away from your dev machine.',
          },
          {
            q: 'Can I use the desktop app without a local dev environment?',
            a: 'Yes — the agent runs in the cloud, not on your machine. **No terminal or IDE is required** to reach it from the desktop app or the web.',
          },
        ],
        talkingPoints: [
          [
            'Before we go further, one thing that trips everyone up. Is the Claude in our terminal the same as the Claude in our editor?',
            'It is. Exact same agent. This first door is the **terminal**, the command line, and it’s the one we’ll live in all day.',
          ],
          [
            'So what if we’d rather stay inside our editor? Second door: the **IDE extension**, in VS Code or JetBrains.',
            '**Same agent.** Only now its edits show up as **inline diffs**, right where we already read code.',
          ],
          [
            'Not at our dev machine right now? Third door: the **desktop app**, on Mac or Windows.',
            'Same agent, its own window. Handy when we’re nowhere near a terminal.',
          ],
          [
            'And the **web**, at claude.ai/code. That’s four doors.',
            'Here’s the part to remember: **one agent, one model, one loop** sits behind every one of them.',
            'So we pick whichever door is closest to where we’re sitting. Everything we learn today travels to all four.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · Where it runs', text: 'Four surfaces, one agent behind them', question: 'Where do I actually run it?' },
          { kind: 'prose', size: 'lg', md: 'You reach Claude Code through several [[surfaces|surface]] — but it’s the **same agent everywhere**, only the window changes.' },
          { kind: 'diagram', diagramId: 'context-stack', caption: 'Terminal · IDE · Desktop · Web — one agent underneath' },
        ],
      },
    ],
  },
  'the-agentic-loop': {
    id: 'the-agentic-loop',
    title: 'The agentic loop',
    blurb: 'Observe → think → act, until done.',
    slides: [
      // ── Fully-authored "finished product" slide (top-down layout) ──
      {
        id: 'loop-1',
        layout: 'center',
        steps: 4,
        estMinutes: 2.5,
        background: 'grid',
        details: {
          agent: {
            title: 'Agent vs. chatbot',
            icon: '🤖',
            body: 'An **agent** runs a loop; a **chatbot** answers once and stops.',
            points: [
              'Chatbot: **one reply**, then done',
              'Agent: **acts → checks → repeats**',
              'So it can **fix its own mistakes** mid-task',
            ],
            analogy: 'A worker who keeps going — not a vending machine.',
            source: { label: 'How Claude Code works', href: 'https://code.claude.com/docs' },
          },
        },
        faqs: [
          {
            q: 'How is this different from autocomplete or a chatbot?',
            a: 'Those answer once and stop. **An agent runs a loop**: it acts, sees what actually happened, and keeps going — so it can **fix its own mistakes mid-task**.',
          },
          {
            q: 'What makes the loop stop?',
            a: 'A turn that produces a final answer instead of another tool call. **No tool call = the job is done.**',
          },
          {
            q: "Won't it run off and do something I didn't want?",
            a: 'By default it **asks permission before sensitive actions**. You allow-list the ones you trust, so routine steps flow without interrupting you.',
          },
        ],
        talkingPoints: [
          [
            'Here’s the question that unlocks everything. When we hand Claude Code a task, does it just answer once, like a chatbot? It doesn’t. **It works in a loop.**',
            'Every turn, the first thing it does is **look around.** Our request, our open files, whatever it just ran, its own notes.',
            'Picture a sharp new teammate who reads every doc already open on our desk before touching a thing.',
          ],
          [
            'So what does it do with all that? It **thinks.** But only about the **single next step**, never the whole master plan.',
            'Like a chess player choosing the next move, not scripting the entire game.',
            'This is where the real reasoning happens, which is exactly why **the model we pick matters most right here.**',
          ],
          [
            'Now the move that makes it an agent. It **acts.** It doesn’t *describe* the fix. **It makes the fix.**',
            'Runs a command, edits a file, looks something up. These are **its hands.**',
            'A chatbot reads us the recipe. An **agent actually cooks dinner.**',
          ],
          [
            'And the step everyone forgets? It **checks its own work.** Did the test pass? Did the file change the way it should? Then it **loops back.**',
            'It keeps going until the job is truly done.',
            'Because it checks as it goes, it catches its own mistakes, the way we re-read an email one last time before we hit send.',
            'This little loop is **the engine under everything we build today.**',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · The agentic loop', text: 'It works in a loop — and fixes its own mistakes', question: 'How does the agent actually work?' },
          { kind: 'prose', size: 'lg', md: 'An [[agent|agent]] doesn’t answer once — it acts, checks the result, and repeats until the job is done.' },
          { kind: 'diagram', diagramId: 'agentic-loop', caption: 'Observe → Think → Act, until the goal is met' },
        ],
      },
      {
        id: 'loop-2',
        layout: 'center',
        steps: 4,
        estMinutes: 2,
        background: 'grid',
        details: {
          toolcall: {
            title: 'Tool call',
            body: 'A turn where the model asks to **run an action** — edit this file, run this test — instead of giving a final answer. A tool call means the work isn’t finished.',
            analogy: 'Reaching for a wrench mid-repair, not putting the toolbox away.',
          },
        },
        faqs: [
          {
            q: 'So what literally makes it stop?',
            a: 'A turn that ends in **plain text instead of a tool call.** No action requested = nothing left to do = the loop exits.',
          },
          {
            q: 'Could it loop forever?',
            a: 'In practice no — each turn either makes progress toward an answer or hits a guardrail (permissions, limits). The exit is built into the rule, not bolted on.',
          },
          {
            q: 'What if it keeps calling tools and never writes a final answer?',
            a: 'Hard limits on turns and time act as a safety net. **It cannot spiral indefinitely** — permission prompts and ceilings both cut the loop before runaway.',
          },
        ],
        talkingPoints: [
          [
            'We just watched it loop. So the fair question is: what stops it? Turns out there’s one clean rule, and this whole picture is that rule.',
            'Every cycle is one **turn.** One response from the model.',
          ],
          [
            'After each turn, we ask a single yes-or-no question. **Did this turn call a tool?**',
            'Did it try to *do* something, or did it just talk back to us?',
          ],
          [
            'If the answer is **yes**, there’s still work to do. It runs the tool, looks at the result, and **loops back to the top.**',
            'That’s the path that keeps it going.',
          ],
          [
            'And if the answer is **no**? Then the turn was just a final answer, no action attached. **Nothing left to run, so it stops.**',
            'That’s the entire stopping rule. **No tool call means the job is done.**',
            'Dead simple, and it’s what keeps the agent both persistent and well-behaved. It doesn’t loop for the fun of it.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · When does it stop?', text: 'One rule: no tool call means it’s done', question: 'What makes it stop?' },
          { kind: 'prose', size: 'lg', md: 'Each turn either makes a [[tool call|toolcall]] — so it loops again — or gives a final answer with no action, and stops.' },
          { kind: 'diagram', diagramId: 'loop-control-flow', caption: 'Tool call → loop · final answer → done' },
        ],
      },
      {
        id: 'loop-3',
        layout: 'center',
        steps: 5,
        estMinutes: 2.5,
        background: 'grid',
        captureKeys: false,
        details: {
          selfcorrect: {
            title: 'Self-correction',
            body: 'Because the agent **checks the result of each action**, it can notice its own mistake and fix it on the next turn — without you pointing it out.',
            analogy: 'Re-reading an email once before hitting send.',
          },
        },
        faqs: [
          {
            q: 'Is this a real Claude Code session?',
            a: 'It’s a faithful re-creation for teaching — the phases, order, and stopping point are exactly what a real run does, slowed down so each step is visible.',
          },
          {
            q: 'Why does verifying matter so much?',
            a: 'Verification is what turns a hopeful guess into a reliable result. Because it **checks before stopping**, the agent catches its own errors — that’s the difference from one-shot generation.',
          },
          {
            q: 'Is this scripted, or does Claude actually run this way?',
            a: 'The real run is identical — **observe, think, act, verify** in the same order. We just slowed it down and labeled each phase so the loop is visible.',
          },
        ],
        talkingPoints: [
          [
            'Enough theory. What does this loop actually look like when it runs? Let’s watch one together, phase by phase.',
            'Here’s the job we handed it: **read a failing test and fix it.** Nothing has happened yet.',
          ],
          [
            'So what’s the very first move? Not what most of us would do. It doesn’t guess.',
            'Phase one, **Observe.** It opens the test file and reads the real failure first. Look before we leap.',
          ],
          [
            'Now does it write the whole fix in one go? No. Phase two, **Think.**',
            'It reasons about the *one* next step. The test wants a 401, the code returns a 500. Just the next move. Chess, not the whole game.',
          ],
          [
            'Here’s the moment that separates an agent from a chatbot. Does it *suggest* the edit, or make it?',
            'Phase three, **Act.** It makes the change itself, with a tool. Hands on the keyboard.',
          ],
          [
            'And the part everyone skips? What does it do before declaring victory? Phase four, **Verify.**',
            'It **re-runs the tests.** Twelve passing. Goal met, nothing left to call, so it stops.',
            'But what if the fix had been wrong? It would have caught that and **looped again**, [[fixing its own mistake|selfcorrect]].',
            'That self-correction is the engine under everything we build today.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · See it live', text: 'Watch one loop fix a failing test', question: 'What does this actually look like?' },
          { kind: 'prose', size: 'lg', md: 'Step through a single pass of the loop. The last phase — verifying — is what lets it catch and fix [[its own mistakes|selfcorrect]].' },
          { kind: 'widget', widgetId: 'agentic-terminal' },
        ],
      },
    ],
  },
  'memory-hierarchy': {
    id: 'memory-hierarchy',
    title: 'CLAUDE.md & memory',
    blurb: 'Persistent context the agent reads every session.',
    slides: [
      {
        id: 'mem-1',
        layout: 'center',
        steps: 4,
        estMinutes: 2.5,
        background: 'grid',
        details: {
          claudemd: {
            title: 'CLAUDE.md',
            body: 'A plain Markdown file of standing instructions the agent **reads automatically at the start of every session** — your conventions, commands, and gotchas. No need to repeat yourself.',
            analogy: 'The onboarding doc you hand every new hire on day one.',
            source: { label: 'Memory & CLAUDE.md', href: 'https://code.claude.com/docs' },
          },
          scope: {
            title: 'Scope',
            body: 'How widely a CLAUDE.md applies: **enterprise** (whole org), **user** (all your projects), **project** (this repo, shared with the team), **local** (just you, uncommitted).',
            analogy: 'Company policy vs. your own desk notes.',
          },
        },
        faqs: [
          {
            q: 'Do the narrower files replace the broader ones?',
            a: 'No — they **stack**. All four load together. A narrower scope only wins when it **directly contradicts** a broader one (your local note beats the team’s default).',
          },
          {
            q: 'Where do I actually put project rules?',
            a: 'A `CLAUDE.md` at the repo root, committed to git. The whole team shares it, and it **travels with the code**.',
          },
          {
            q: 'What goes in it?',
            a: 'Standing facts the agent should never have to be told twice: build/test commands, code conventions, “always do X,” and known traps. Keep it tight — it loads every session.',
          },
        ],
        talkingPoints: [
          [
            'So how does Claude Code remember anything between sessions? The answer is refreshingly low-tech. It’s a plain Markdown file called **CLAUDE.md.**',
            'It reads that file automatically at the start of every session.',
            'Think of it as **the onboarding doc we’d hand a new teammate.** Our conventions, our commands, the traps to avoid.',
            'The broadest layer is **enterprise** scope — managed centrally by IT, and it applies to everyone in the organisation.',
          ],
          [
            'What about our own personal preferences? That’s the next layer down: **user** scope.',
            'A CLAUDE.md in our home folder that applies to **every project we touch.** Our preferences, everywhere we go.',
          ],
          [
            'Now where do a team’s shared rules live? That’s **project** scope: a CLAUDE.md committed at the repo root.',
            'This is the one teams care about. **Shared with everyone, and it travels with the code.**',
          ],
          [
            'And just for us, on this one repo? Narrowest layer: **local** scope, our own uncommitted notes.',
            'Here’s the mental model. These don’t overwrite each other. **They all stack, and all four load together.**',
            'When two of them genuinely disagree, **the closest one wins.**',
            'So it’s less a chain of command, more a stack of sticky notes, each one more specific as it gets closer to the task.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · CLAUDE.md & memory', text: 'Memory is a Markdown file it reads every time', question: 'How does it remember anything between sessions?' },
          { kind: 'prose', size: 'lg', md: '[[CLAUDE.md|claudemd]] is how the agent remembers your project between sessions. It comes in four [[scopes|scope]] that stack from broad to specific.' },
          { kind: 'diagram', diagramId: 'memory-hierarchy', caption: 'Enterprise → User → Project → Local — all load, closest wins' },
        ],
      },
      {
        id: 'mem-2',
        layout: 'center',
        steps: 4,
        estMinutes: 2,
        background: 'grid',
        details: {
          running: {
            title: 'The running example',
            body: 'We’ll build one project across the whole tutorial — a **Release Notes Assistant** that turns merged pull requests into a clean changelog. Every concept gets applied to it, so the pieces add up to something real.',
            analogy: 'A worked example you extend, not a pile of disconnected demos.',
          },
        },
        faqs: [
          {
            q: 'Will we actually build this end to end?',
            a: 'Yes. By the final module the assistant has its own CLAUDE.md, a Skill, and a subagent — assembled live, **one concept at a time**.',
          },
          {
            q: 'Why start with the CLAUDE.md?',
            a: 'Because it’s the assistant’s memory. **Giving it standing instructions first means every later step inherits the right context for free.**',
          },
          {
            q: 'Can I follow along at my own pace after today?',
            a: 'Yes — each module adds one self-contained capability. **Try it on your own repo later** and the steps still compose cleanly, because each one builds on the last.',
          },
        ],
        talkingPoints: [
          [
            'Let’s make all of this concrete. What are we actually going to build together? Meet the project: a **Release Notes Assistant.**',
            'Its job: take every pull request that merged this week and turn them into one clean, readable changelog.',
            'Imagine it’s Friday afternoon, forty messy merges behind us, and instead of writing the changelog by hand, we just ask. Everything we learn from here bolts onto *it*.',
            'First piece, today: **its own CLAUDE.md.** The repo’s conventions, where the changelog lives, the house style. Its first-day onboarding doc.',
          ],
          [
            'So what does it need next? A memory of how we like things written. Next module, we package its house style into a **Skill.**',
            'A reusable folder of instructions it loads only when it needs them. No more re-explaining the changelog format every single time.',
            '**Same assistant, one new ability bolted on.**',
          ],
          [
            'Now who does the grunt work of gathering all those merged pull requests? Not the main assistant. Module three, we hand that off to a **subagent.**',
            'A helper with its own clean workspace. It does the fetching and hands back just the results, so the main assistant stays focused on writing.',
            'That’s **division of labor**, the same trick every good team uses.',
          ],
          [
            'So where does this leave us? By the end, it all runs **end to end.** Memory, skill, and helper, working as one assistant.',
            'Same character the whole way through. Each module just added one more ability.',
            'That’s the thread to watch. We’re not collecting disconnected features, we’re **growing one real tool.**',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · Running example', text: 'We build one real project — a piece per module', question: 'What are we actually building today?' },
          { kind: 'prose', size: 'lg', md: 'Meet the [[Release Notes Assistant|running]] — the single project we extend the whole way through. Its job: turn the week’s merged pull requests into one clean, readable **changelog**.' },
          {
            kind: 'widget',
            widgetId: 'module-roadmap',
            params: {
              modules: [
                { title: 'Now', body: 'Give it a **CLAUDE.md** — its memory, so it knows the repo’s conventions.' },
                { title: 'Module 2', body: 'Package its house style as a **Skill**.' },
                { title: 'Module 3', body: 'Delegate gathering the PRs to a **subagent**.' },
                { title: 'By the end', body: 'It runs **end to end** — memory, skill, and helper together.' },
              ],
            },
          },
        ],
      },
    ],
  },
  'slash-commands': {
    id: 'slash-commands',
    title: 'Slash commands',
    blurb: 'Built-in and custom shortcuts.',
    slides: [
      {
        id: 'slash-1',
        layout: 'center',
        steps: 4,
        estMinutes: 2,
        background: 'grid',
        captureKeys: false,
        details: {
          slash: {
            title: 'Slash command',
            body: 'A shortcut you trigger by typing `/name`. Some are **built-in** (like `/model`, `/context`); the ones **you** add are really Skills under the hood.',
            analogy: 'Keyboard shortcuts for whole workflows.',
          },
        },
        faqs: [
          {
            q: 'What’s the difference between a built-in and a custom command?',
            a: 'Built-ins ship with Claude Code and control the tool itself (model, context, clearing). **Custom commands are Skills you author** — the same mechanism we spend Module 2 on.',
          },
          {
            q: 'So learning to write commands is learning to write Skills?',
            a: 'Exactly. **Learning slash commands is learning Skills** — that’s the hand-off from Foundations into the heart of the tutorial.',
          },
          {
            q: 'Where do custom commands live on disk?',
            a: 'In `.claude/commands/` at whichever scope you choose. **Same scoping rules as CLAUDE.md** — user, project, or local — so they can be shared with a team or kept just for yourself.',
          },
        ],
        talkingPoints: [
          [
            'One last stop in Foundations, and it’s the fastest way to drive Claude Code. So what happens the moment we type a slash?',
            'We get a menu. First built-in: **/model.** Swap the model mid-task, speed versus depth, whenever we want.',
            'Claude Code ships with a handful of built-ins that control the tool itself, and we can add as many of our own as we want.',
          ],
          [
            'Ever wonder what the agent is actually holding in its head right now? **/context** shows us exactly that.',
            'Every file, all the memory, the tool output, and how much room is left. Handy when we’re not sure it even knows about that file yet.',
          ],
          [
            'Need a clean slate without quitting? **/clear** wipes the running conversation and starts a fresh task.',
            'All three of these **ship with the tool.** They drive Claude Code itself.',
          ],
          [
            'But here’s the one that changes everything: **/release-notes** — and it didn’t ship with Claude Code. It’s one *we* made.',
            'And here’s the best part: **a custom slash command is just a Skill wearing a shortcut.**',
            'So if we can write a good slash command, we can write a Skill. Which is exactly where Module 2 picks up.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · Slash commands', text: 'Type “/” — and your custom ones are Skills', question: 'What’s the fastest way to drive it?' },
          { kind: 'prose', size: 'lg', md: '[[Slash commands|slash]] are named shortcuts. The built-ins drive the tool; the ones you write are Skills — the bridge into the next module.' },
          { kind: 'widget', widgetId: 'slash-playground' },
        ],
      },
    ],
  },

  'permission-modes': {
    id: 'permission-modes',
    title: 'Permission modes',
    blurb: 'Five levels — from "ask me everything" to fully hands-free.',
    slides: [
      {
        id: 'perm-1',
        layout: 'center',
        steps: 4,
        estMinutes: 2,
        background: 'grid',
        details: {
          askMode: {
            title: 'Ask permissions',
            body: 'Claude pauses **before every tool call** — file read, shell command, search — and waits for your approval. Nothing happens without a "yes."',
            analogy: 'A cautious intern who checks in before touching anything on your desk.',
          },
          acceptMode: {
            title: 'Accept edits',
            body: '**File writes are auto-approved**, but shell commands (Bash, npm, git) still stop and ask. Good when you trust the edits but want a gate on running code.',
            analogy: 'Approving all the paperwork in advance but still signing off before any real-world action.',
          },
          planMode: {
            title: 'Plan mode',
            body: 'A **read-only exploration pass** first — Claude maps what it wants to do and shows you a step-by-step proposal. Nothing is written until you approve.',
            analogy: 'Ask a contractor to walk the site and write a quote before swinging a single hammer.',
          },
          autoMode: {
            title: 'Auto mode',
            body: 'Claude runs the full loop — observe, think, act — **without stopping**, asking only when it is genuinely stuck or reaches a decision it cannot reverse. The right mode for most real work.',
            analogy: 'A senior developer you trust to execute: they call if the spec is unclear, not for every keypress.',
          },
          bypassMode: {
            title: 'Bypass permissions',
            body: 'All permission checks are **skipped entirely**. Intended for CI pipelines and headless automation where there is no human in the loop. Use with deliberate intent.',
            analogy: 'Giving a robot the master key — efficient, but the guardrails are entirely on you.',
          },
        },
        faqs: [
          {
            q: 'Which mode should I start with?',
            a: '**Auto mode for most tasks.** It runs without constant interruption but still asks before irreversible actions. Drop to "Accept edits" when exploring an unfamiliar codebase.',
          },
          {
            q: 'Can I change mode in the middle of a task?',
            a: 'Yes — the Mode picker and keyboard shortcuts 1–5 switch instantly. **No restart needed.** Tighten the mode if the agent heads somewhere unexpected; open it back up once you’re comfortable.',
          },
          {
            q: 'Is Bypass permissions dangerous?',
            a: 'It skips every permission prompt. That is fine inside a sandboxed CI job, but **risky on your own machine** — pair it with deny lists so irreversible operations are still blocked at the settings layer.',
          },
        ],
        talkingPoints: [
          [
            'Here’s the question that comes up the moment we hand Claude Code a real task: how much should it just *do* on its own, and how much should it stop and check?',
            'The answer isn’t a single setting — it’s a **dial with five positions**, running from “ask me before you touch anything” all the way to “run fully hands-free.”',
            'These are the **five permission modes.** Knowing which to reach for is what separates confident, productive Claude Code use from constant interruptions — or worse, unwanted surprises.',
          ],
          [
            'At the cautious end, we have two modes that keep us in control of every move.',
            '**[[Ask permissions|askMode]]** is the most conservative: Claude pauses before every single tool call and waits for our yes. Think of it as a careful intern who checks in before touching anything on our desk.',
            '**[[Accept edits|acceptMode]]** is one step up: file writes go through automatically, but shell commands — Bash, git, npm — still stop and ask. Great for exploring an unfamiliar codebase where we trust the reading but want a gate on running anything.',
          ],
          [
            'In the middle sits **[[Plan mode|planMode]]** — and it’s different from the others. Instead of controlling each individual action, it gates the *whole plan*.',
            'Claude does a read-only pass first: maps the codebase, writes out a step-by-step proposal. Nothing is written, nothing runs, until we review and say go.',
            'Think of asking a contractor to walk the site and write a quote **before swinging a hammer.** We see the plan, argue about it, cross things out — then give the green light.',
          ],
          [
            'And now the mode most of us will live in: **[[Auto mode|autoMode]]**.',
            'Claude runs the full loop — observe, think, act — without stopping. It calls us only when it’s genuinely stuck, or reaches a decision it can’t reverse. For the Release Notes Assistant, this is how we run it: one prompt, full execution, done.',
            'At the far end, **[[Bypass permissions|bypassMode]]** skips every check entirely. That’s for CI pipelines and headless scripts where there is no human in the loop — not for everyday work on our own machine. **Pair it with deny lists** so irreversible operations are still blocked at the settings layer.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · Permission modes', text: 'Five modes dial Claude’s autonomy from “ask everything” to fully hands-free', question: 'How much should Claude do on its own?' },
          { kind: 'prose', size: 'lg', md: 'The **[[Mode picker|autoMode]]** gives us five positions on a single dial — choose how much Claude does silently and how much it stops to ask. Switch at any time with keyboard shortcuts **1–5**.' },
          { kind: 'diagram', diagramId: 'permission-modes', caption: 'Most cautious → most autonomous — switch any time, no restart required' },
        ],
      },
    ],
  },

  // ── Module 1 · Foundations (cont.) — Models, context window, building blocks ──
  'models-foundations': {
    id: 'models-foundations',
    title: 'Models: the brain that thinks',
    blurb: 'An LLM vs a model, and the lineup.',
    slides: [
      {
        id: 'mdl-1',
        layout: 'center',
        steps: 2,
        estMinutes: 2,
        background: 'grid',
        details: {
          llm: {
            title: 'LLM',
            body: 'A **large language model** — a system trained on huge amounts of text to predict and generate language. It’s the *kind* of engine, the underlying technology.',
            analogy: 'The kind of engine, not a specific one.',
          },
          modelpick: {
            title: 'A model',
            body: 'A **specific, named, versioned** instance of an LLM that you pick: Opus 4.8, Sonnet 4.6, Haiku 4.5, Fable 5. Same engine, each tuned for a different speed-versus-depth tradeoff.',
            analogy: 'The exact engine you drop in for the job.',
            source: { label: 'Claude models overview', href: 'https://platform.claude.com/docs/en/about-claude/models/overview' },
          },
          thinkstep: {
            title: 'The “Think” step',
            body: 'The reasoning step of the agentic loop. It runs on whichever **model** you’ve chosen, so that pick sets how deeply the agent reasons.',
            analogy: 'Choosing which brain does the thinking.',
          },
        },
        faqs: [
          {
            q: 'Aren’t “LLM” and “model” the same thing?',
            a: 'Close, but not quite. The LLM is the *category* — the kind of engine. A “model” is a **specific named version** of it you choose, like Opus 4.8.',
          },
          {
            q: 'Is Claude Code itself a model?',
            a: 'No. Claude Code is the **agent** — the tool that runs the loop. It *uses* a model to do its thinking, and you can swap which one.',
          },
          {
            q: 'Do I have to understand the model to use the tool?',
            a: 'Not at all — the defaults are sensible. But knowing the lineup means you can **trade speed for depth** on purpose when a task calls for it.',
          },
        ],
        talkingPoints: [
          [
            'Back at the loop, we said the model we pick matters most at the thinking step. So let’s settle the obvious question first: what even *is* a model?',
            'Start one level up. We’ve all heard the term **LLM**, a large language model. That’s the *kind* of engine: a system trained on a mountain of text to work with language.',
            'Think of it like “a car engine” as a category, not any one engine in particular.',
          ],
          [
            'So where does “model” come in? A **model** is a *specific, named version* of that engine we can pick. Opus, Sonnet, Haiku, Fable.',
            'Same kind of engine, each one tuned differently. A zippy one for quick errands, a powerful one for the heavy haul.',
            'And here’s why it matters to us: the loop’s thinking step runs on whichever model we chose. **Pick the model, and we’re picking the brain that does the thinking.**',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · Models', text: 'An LLM is the engine; a model is the version you pick', question: 'What even is a model?' },
          { kind: 'prose', size: 'lg', md: 'The loop’s thinking step runs on a [[large language model|llm]]. A [[model|modelpick]] is a specific, named version of that engine you choose — same engine, different tuning.' },
          { kind: 'diagram', diagramId: 'llm-vs-model', caption: 'One engine, many named versions you can pick' },
          { kind: 'callout', tone: 'analogy', md: 'The **LLM** is the *kind* of car engine. A **model** is the exact engine you drop in: a zippy one for errands, a powerful one for towing.' },
        ],
      },
      {
        id: 'mdl-2',
        layout: 'center',
        steps: 4,
        estMinutes: 2.5,
        background: 'grid',
        details: {
          spectrum: {
            title: 'Speed vs. depth',
            body: 'The lineup sits on one dial. To the left: **faster, lighter, cheaper.** To the right: **deeper reasoning, more capable, pricier.** Picking a model is choosing where on that dial a task belongs.',
            analogy: 'A dial from quick-and-cheap to slow-and-powerful.',
          },
          driver: {
            title: 'The daily driver',
            body: '**Sonnet** is the balanced middle — fast enough to feel snappy, capable enough for most real coding. It’s the sensible default when you’re not sure.',
            analogy: 'The car you actually drive every day.',
          },
        },
        faqs: [
          {
            q: 'Which one should I just use?',
            a: 'Start with **Sonnet** — the balanced default. Reach for Haiku when speed and cost matter more than depth, and Opus or Fable when a problem is genuinely hard.',
          },
          {
            q: 'Why not always use the most powerful one?',
            a: 'Depth costs time and money. On a simple task the frontier model is **slower and pricier for no real gain** — matching the model to the job is the whole skill.',
          },
          {
            q: 'Can I switch models mid-task?',
            a: 'Yes — that’s exactly what `/model` is for. **Swap on the fly** when the work gets harder or you want a faster turnaround.',
          },
        ],
        talkingPoints: [
          [
            'So which model do we reach for? The trick is to see them all on one dial: fast and light on the left, deep and powerful on the right.',
            'Start at the quick end. **Haiku.** Fastest, cheapest. When a task is small and well-defined, that’s all we need.',
          ],
          [
            'Slide right one notch. **Sonnet.** The balanced middle, and honestly the one to default to.',
            'Snappy enough to feel instant, sharp enough for most real coding. If we’re not sure, this is the answer.',
          ],
          [
            'Further right, the heavy hitter. **Opus.** When a problem is genuinely hard, a tricky bug, a big refactor, a long run on its own, this is the brain we want.',
            'It thinks more, so it costs more. Worth it exactly when correctness beats speed.',
          ],
          [
            'And at the frontier, the most capable of all. **Fable.** The hardest, longest-horizon problems, at a premium.',
            'So the whole lineup is one tradeoff: speed and cost against depth. We just match the model to the job.',
            'And that pays off the promise we made back at the loop. The thinking step runs on whichever of these we pick. **That’s the brain doing the work.**',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · The lineup', text: 'Pick the model to fit the job, from fast to frontier', question: 'Which model should I reach for?' },
          { kind: 'prose', size: 'lg', md: 'Same engine, four versions on one [[speed-versus-depth dial|spectrum]]. **Haiku** is fast and light; **Sonnet** is the everyday [[default|driver]]; **Opus** goes deep; **Fable** is the frontier.' },
          { kind: 'diagram', diagramId: 'model-lineup', caption: 'Haiku → Sonnet → Opus → Fable: fast-and-light to deep-and-capable' },
        ],
      },
    ],
  },
  'context-window': {
    id: 'context-window',
    title: 'The context window',
    blurb: 'What it can see at once — and why it’s finite.',
    slides: [
      {
        id: 'ctx-1',
        layout: 'center',
        steps: 4,
        estMinutes: 2.5,
        background: 'grid',
        details: {
          ctxwin: {
            title: 'Context window',
            body: 'Everything the agent can “see” right now — your request, the files it has read, its memory, and recent tool output — all held in **one finite space**. When it’s full, older material gets summarized or dropped.',
            analogy: 'The agent’s desk: only so much fits at once.',
            source: { label: 'Context windows', href: 'https://platform.claude.com/docs/en/build-with-claude/context-windows' },
          },
          clear: {
            title: 'Clearing the desk',
            body: '`/context` shows what’s on the desk right now; `/clear` wipes it for a fresh task. Keeping the window focused on what matters is part of working well with the agent.',
            analogy: 'Tidying your desk between jobs.',
          },
        },
        faqs: [
          {
            q: 'Why does the context window matter to me?',
            a: 'Because it’s **the agent’s whole working memory** for the task. If something it needs isn’t on the desk, it can’t use it — and if the desk overflows, older details get squeezed out.',
          },
          {
            q: 'What happens when it fills up?',
            a: 'Older material gets **summarized or dropped** to make room. That’s why a long, wandering session can start to “forget” early details — the desk filled up.',
          },
          {
            q: 'How do I keep it healthy?',
            a: 'Start fresh tasks with `/clear`, and lean on memory and helpers. **A focused desk is a sharper agent** — which is exactly what the next two ideas are about.',
          },
        ],
        talkingPoints: [
          [
            'Here’s a question that quietly explains half of what’s coming. What can the agent actually *see* at any one moment?',
            'The answer: whatever fits in one space we call the **context window.** Picture it as the agent’s desk. First thing on the desk is the obvious one. **Our request.**',
          ],
          [
            'What else does it need up there? The **files it has read.** It pulls the actual code onto the desk so it’s working with the real thing, not a guess.',
          ],
          [
            'What carries over from before? Its **memory**, the CLAUDE.md we’re about to meet. The standing notes that are always on the desk.',
          ],
          [
            'And last, the **result of whatever it just ran.** A test result, a command’s output, back on the desk to react to.',
            'Now the catch, and it’s the whole point. It’s **one desk, and it’s finite.** Pile on enough and it fills up, and the oldest things get squeezed off.',
            'Hold that picture. It’s why memory matters, and why later we’ll hand busywork to a helper to keep this desk clear.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · The context window', text: 'It only sees what’s on its desk — and the desk is finite', question: 'What can the agent actually see?' },
          { kind: 'prose', size: 'lg', md: 'Everything the agent works with sits in one [[context window|ctxwin]] — your request, the files it has read, its memory, and what it just ran. One desk, and it fills up.' },
          { kind: 'diagram', diagramId: 'context-window', caption: 'Request · files · memory · tool output — all in one finite frame' },
        ],
      },
    ],
  },
  'building-blocks': {
    id: 'building-blocks',
    title: 'Skills vs agents vs subagents',
    blurb: 'The three building blocks, untangled.',
    slides: [
      {
        id: 'bb-1',
        layout: 'center',
        steps: 3,
        estMinutes: 2.5,
        background: 'grid',
        details: {
          agentdef: {
            title: 'Agent',
            body: 'The thing that **does the work** — Claude Code itself, running the observe-think-act loop. Our Release Notes Assistant is an agent.',
            analogy: 'The chef running the kitchen.',
          },
          skilldef: {
            title: 'Skill',
            body: '**Reusable knowledge** packaged in a folder the agent loads only when a task needs it — a house style, a checklist, a procedure. It doesn’t act; it informs.',
            analogy: 'A recipe card the chef keeps on hand.',
          },
          subdef: {
            title: 'Subagent',
            body: 'A **helper agent** the main agent hands a side-task to, with its own clean workspace. It does the side-job and hands back just the result.',
            analogy: 'A prep cook sent to chop the vegetables.',
          },
        },
        faqs: [
          {
            q: 'A subagent is still an agent — so what’s the real difference?',
            a: 'A subagent *is* an agent; the difference is **role**. The main agent spins it up to handle one side-task in its own space, then it reports back. Same machinery, narrower job.',
          },
          {
            q: 'Why is a skill not just “an agent that knows things”?',
            a: 'Because a skill **doesn’t act** — it’s knowledge, not a worker. The agent loads it and acts on it. A subagent, by contrast, goes off and *does* something.',
          },
          {
            q: 'Do I need all three?',
            a: 'Eventually, yes — and we build them onto the same assistant. **Memory first, then a skill, then a subagent**, one module at a time.',
          },
        ],
        talkingPoints: [
          [
            'Three words are about to come up over and over, and people constantly mix them up. Let’s untangle them now, on our own assistant.',
            'First: what does the actual work? The **agent.** That’s Claude Code itself, running the loop. Our Release Notes Assistant is the agent.',
          ],
          [
            'Now where does its know-how live? In a **skill.** A folder of reusable knowledge it loads only when it needs it. Our changelog house style becomes a skill.',
            'A skill doesn’t *do* anything on its own. It’s the recipe card, not the cook.',
          ],
          [
            'Now the part people trip on. A **subagent** is an agent too. Same machinery as the main one, running its own loop.',
            'So what makes it different? Role. The main agent spins it up for one side-task, in its own clean space, and it hands back just the result. The main agent’s own desk stays clear.',
            'So the agent cooks, the skill is the recipe card it keeps on hand, and the subagent is the prep cook it sends to its own station to chop the vegetables.',
            'Same assistant, three building blocks. That’s the whole back half of this tutorial in one picture.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Foundations · The building blocks', text: 'An agent works; a skill is knowledge; a subagent is a helper', question: 'What do agent, skill, and subagent each mean?' },
          { kind: 'prose', size: 'lg', md: 'Three words people mix up. The [[agent|agentdef]] does the work. A [[skill|skilldef]] is reusable knowledge it loads. A [[subagent|subdef]] is **also an agent** — a helper it hands a side-task to, working in its own space.' },
          { kind: 'image', src: 'building-blocks-kitchen', size: 'sm', alt: 'Three-panel kitchen comic: the agent chef cooks, the skill is a pinned recipe card, and the subagent is a prep cook at a separate station who brings back the finished bowl', caption: 'Agent cooks · Skill holds the recipe · Subagent is the prep cook at its own station' },
          { kind: 'widget', widgetId: 'building-blocks-analogy' },
        ],
      },
    ],
  },

  // ── Module 2 · Skills ─────────────────────────────────────────────────────
  'skill-anatomy': {
    id: 'skill-anatomy',
    title: 'Skill anatomy',
    blurb: 'A folder with a SKILL.md — frontmatter names it, body teaches it.',
    slides: [
      {
        id: 'sk-1',
        layout: 'center',
        steps: 3,
        estMinutes: 2,
        background: 'grid',
        details: {
          skill: {
            title: 'Skill',
            icon: '📋',
            body: 'A reusable instruction set the agent loads on demand. It lives in a folder under `.claude/skills/`. The frontmatter tells the agent it exists; the body tells it what to do.',
            analogy: 'A recipe card on a corkboard — the agent knows the card is there; it only opens it when making that dish.',
          },
          frontmatter: {
            title: 'Frontmatter',
            body: '`name` and `description` — the two fields at the top of SKILL.md. The agent reads these **at startup** so it knows the Skill exists and when to reach for it.',
            analogy: 'The title and one-sentence description on the outside of a recipe card.',
          },
          body: {
            title: 'Body',
            body: 'Everything below the frontmatter: the actual instructions, output formats, file references. The agent reads this **only when the task matches** the description.',
            analogy: 'The full recipe inside the card — only opened when you\'re actually making that dish.',
          },
        },
        faqs: [
          {
            q: 'How is a Skill different from CLAUDE.md?',
            a: 'CLAUDE.md always loads — it\'s standing memory for every session. **A Skill loads only when the task matches.** Targeted expertise, not ambient context.',
          },
          {
            q: 'Does the agent read all the Skill bodies at startup?',
            a: 'No — only the frontmatter. That\'s the whole point: **the body stays unread until the agent needs it**, so it doesn\'t bloat the context window on every session.',
          },
          {
            q: 'What triggers a Skill?',
            a: 'The agent compares the task to each Skill\'s `description` field. **A semantic match is enough** — no exact keyword required. A good description is what makes the difference between a Skill that fires and one that gathers dust.',
          },
        ],
        talkingPoints: [
          [
            'We just gave our assistant a CLAUDE.md — its memory, always on. So what does it need next?',
            'It needs **expertise**. Not a new agent. Not a config file. Just a folder with one Markdown file inside it, called SKILL.md.',
            'That\'s a [[Skill|skill]]: a packet of know-how the agent picks up exactly when the task calls for it.',
          ],
          [
            'SKILL.md has two zones. The **[[frontmatter|frontmatter]]** — `name` and `description` — loads at startup. Every session, every time.',
            'Think of it as a corkboard of recipe cards. The agent skims the titles every morning: "I know these exist."',
          ],
          [
            'The **[[body|body]]** zone is where the actual expertise lives — format rules, examples, file references. None of it enters the context window until the task matches.',
            'All the format rules, the examples, the file references — none of it hits the context window until it\'s needed.',
            'So we can have twenty Skills. The agent holds twenty card titles in its head. It only opens the card it\'s actually using.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Skills · Anatomy', text: 'A Skill is a folder + SKILL.md — frontmatter names it, body teaches it', question: 'What exactly is a Skill?' },
          { kind: 'prose', size: 'lg', md: 'A [[Skill|skill]] is reusable expertise the agent loads on demand. The [[frontmatter|frontmatter]] tells it the Skill exists; the [[body|body]] tells it what to do — and only loads when the task actually calls for it.' },
          { kind: 'diagram', diagramId: 'skill-anatomy', caption: 'Click a zone · frontmatter always · body on demand' },
        ],
      },
      {
        id: 'sk-2',
        layout: 'center',
        steps: 1,
        estMinutes: 1.5,
        background: 'grid',
        details: {
          description_tip: {
            title: 'Writing the description',
            icon: '🎯',
            body: 'The description is a semantic trigger. Write it as a sentence about **when** the Skill should fire, not what it is called.',
            points: [
              'Include the user\'s likely phrasing ("release notes", "changelog")',
              'Be specific about the trigger scenario',
              'Avoid vague labels like "release notes helper" — write a trigger sentence',
            ],
          },
        },
        faqs: [
          {
            q: 'How long should the body be?',
            a: 'As long as it needs to be, no longer. **One concrete format rule beats three vague ones.** Start with what the assistant needs to produce the right output, and add only what you notice is missing.',
          },
          {
            q: 'Can a Skill reference other files?',
            a: 'Yes — the body can include `@filename` references and the agent loads them on demand too. Useful for pointing at a sample changelog or a list of PR categories.',
          },
          {
            q: 'Do I commit this to the repo?',
            a: 'If the whole team should use it, yes — commit `.claude/skills/release-notes/` and it travels with the code. **Same scoping rules as CLAUDE.md**: project scope shares it with the team, user scope keeps it to yourself.',
          },
        ],
        talkingPoints: [
          [
            'Let\'s actually build it. We create `.claude/skills/release-notes/SKILL.md`.',
            'The name is `release-notes`. The [[description|description_tip]]: "When asked to write release notes or a changelog from a set of merged pull requests."',
            'That sentence is the trigger. The agent sees it every session. When we type "write the release notes," it matches, and the body loads.',
            'The body? The format rules. Sections, bullet style, how to handle breaking changes. **The house style the team no longer has to explain every time.**',
            'One thing to hold onto: the description is what makes a Skill fire. A vague label means it sits there unused. A specific trigger sentence means it fires exactly when we need it.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Skills · Running example', text: 'We give the assistant its first Skill — changelog format rules, on demand', question: 'What does this look like in practice?' },
          { kind: 'prose', size: 'lg', md: 'We create `.claude/skills/release-notes/SKILL.md`. The [[description|description_tip]] is the trigger — write it as the sentence that should match when we ask for release notes.' },
          { kind: 'image', src: 'skill-as-recipe', size: 'sm', alt: 'Two panels: chef robot glancing at all recipe cards on a corkboard every session vs. reading one card fully open when cooking that dish', caption: 'The agent knows every card is there — reads the one that matches' },
        ],
      },
    ],
  },

  'progressive-disclosure': {
    id: 'progressive-disclosure',
    title: 'Progressive disclosure',
    blurb: 'Load only what the task needs.',
    slides: [
      {
        id: 'pd-1',
        layout: 'center',
        steps: 3,
        estMinutes: 1.5,
        background: 'grid',
        details: {
          startup: {
            title: 'Startup phase',
            body: 'At the start of every session, the agent reads every Skill\'s **frontmatter only** — just `name` and `description`. This keeps startup fast regardless of how many Skills exist.',
            analogy: 'Scanning the title of every book on the shelf, not opening any of them.',
          },
          trigger: {
            title: 'Trigger',
            body: 'When a task arrives, the agent compares it semantically against each Skill\'s `description`. If there\'s a match, the body loads. If not, the Skill stays on the shelf.',
          },
          demand: {
            title: 'On-demand load',
            body: 'Only the matched Skill\'s body enters the context window. Unmatched Skills contribute **zero tokens** to that session. The more specific the task, the more targeted the load.',
          },
        },
        faqs: [
          {
            q: 'What if two Skills match the same task?',
            a: 'Both load. The agent combines them. **That\'s intentional** — a task that triggers both "security review" and "house conventions" genuinely needs both.',
          },
          {
            q: 'Does having many Skills slow things down?',
            a: 'Startup reads more frontmatter, but frontmatter is tiny. **The body size is what matters**, and that only loads on a match.',
          },
          {
            q: 'Can I force a Skill to always load?',
            a: 'Yes — reference it from CLAUDE.md with `@.claude/skills/release-notes/SKILL.md`. That body always loads. **Use sparingly**: it\'s the escape hatch for truly standing knowledge, not the default.',
          },
        ],
        talkingPoints: [
          [
            'Here\'s the question every thoughtful engineer asks: if we collect a dozen Skills, does the agent read all twelve every time we say hello?',
            'No. And the mechanism is simple enough to land on three tiles.',
          ],
          [
            'At [[startup|startup]], the agent reads every Skill\'s frontmatter. Name and description only. Tiny.',
            'Think of it as scanning every spine on a bookshelf. We know every title. We haven\'t opened a single book.',
          ],
          [
            'Then the [[task arrives|trigger]]. "Write the release notes." The agent compares that against every description it scanned.',
            'One matches. The release-notes Skill fires — its body loads into context.',
            'Every other Skill? Still on the shelf. Zero tokens. Not even there.',
            'We can have fifty Skills. The agent uses the one or two the task actually calls for. That\'s [[on-demand loading|demand]], and it\'s why Skills scale cleanly.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Skills · Progressive disclosure', text: 'Frontmatter loads at startup; body loads only when the task matches', question: 'Does it read every Skill every time?' },
          { kind: 'prose', size: 'lg', md: 'At [[startup|startup]] the agent skims every Skill\'s frontmatter. When a task arrives it checks for a [[match|trigger]]. **Only the matching Skill\'s body enters context.** Everything else stays on the shelf.' },
          { kind: 'widget', widgetId: 'progressive-disclosure' },
        ],
      },
    ],
  },

  'build-a-skill-lab': {
    id: 'build-a-skill-lab',
    title: 'Build a Skill (lab)',
    blurb: 'The description is the trigger — write it right.',
    slides: [
      {
        id: 'bas-1',
        layout: 'center',
        steps: 1,
        estMinutes: 2,
        background: 'grid',
        details: {
          bad_description: {
            title: 'Why bad descriptions fail',
            icon: '⚠️',
            body: 'A description like "release notes tool" is a label, not a trigger. The agent can\'t match "can you write the changelog" against a two-word category — there\'s nothing to semantically land on.',
            points: [
              'Vague labels ("release notes tool") never match specific prompts',
              'Think: would this description help a new teammate know exactly when to use this Skill?',
              'If the answer is "kind of, maybe" — rewrite it as a trigger sentence',
            ],
          },
        },
        faqs: [
          {
            q: 'How do I test whether my description fires?',
            a: 'Ask Claude Code to do the thing, then run `/context` — it shows which Skills are active. **If your Skill isn\'t listed, the description missed.**',
          },
          {
            q: 'Should the description be one sentence or more?',
            a: 'Start with one. "When asked to write release notes or a changelog from merged pull requests." **Add a second sentence only if the trigger conditions are genuinely complex.**',
          },
          {
            q: 'What if I want it to always run, regardless of the task?',
            a: 'Don\'t use the description for that — reference it from CLAUDE.md directly. **Always-on knowledge belongs in always-on memory.** Skills are for expertise not every task needs.',
          },
        ],
        talkingPoints: [
          [
            'We\'ve seen the anatomy. There\'s one thing that determines whether a Skill actually works.',
            'The description. Not the body, not the format. **The description is the trigger**, and a bad one means the Skill never fires.',
            'A name like "release-notes-tool" is a label. The agent can\'t match "write the changelog" against it — too vague to land on.',
            'A sentence like "When asked to write release notes or a changelog from merged pull requests" — that fires every time.',
            'Write it like the job posting for this specific expertise. Not what the Skill is called. **When it gets called in.**',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Skills · Lab', text: 'The description is the trigger — a vague one means the Skill never fires', question: 'What makes a Skill actually work?' },
          { kind: 'prose', size: 'lg', md: 'The `description` field is what the agent matches against. Write it as a sentence about **when** the Skill should load, not what it contains. A label never fires; a scenario does.' },
          { kind: 'diagram', diagramId: 'skill-trigger', caption: "Label vs. scenario — one fires, one doesn't" },
          { kind: 'callout', tone: 'key', md: '**Bad:** `release-notes-tool`\n\n**Good:** `When asked to write release notes or a changelog from a set of merged pull requests.`' },
          { kind: 'widget', widgetId: 'build-a-skill' },
        ],
      },
    ],
  },

  // ── Module 3 · Subagents ──────────────────────────────────────────────────
  'why-subagents': {
    id: 'why-subagents',
    title: 'Why subagents',
    blurb: 'Side work that floods the context window belongs somewhere else.',
    slides: [
      {
        id: 'sa-1',
        layout: 'center',
        steps: 2,
        estMinutes: 2,
        background: 'grid',
        details: {
          context_flood: {
            title: 'Context flood',
            icon: '🌊',
            body: 'When a subtask generates a lot of output — forty PR diffs, a large directory listing, search results across the whole codebase — it fills the context window fast. The main agent then has less room to reason clearly about the actual goal.',
            analogy: 'Asking the head chef to go inventory the warehouse, read every label, and sort everything before they can start cooking.',
          },
          isolation: {
            title: 'Why isolation helps',
            body: 'A subagent takes the noisy subtask and its own fresh context window. All the intermediate output stays in its space. Only the clean summary — what the main agent actually needs — comes back.',
          },
        },
        faqs: [
          {
            q: 'Couldn\'t the main agent just use a tool to fetch the PRs?',
            a: 'It could, and the raw results would land in its context. A subagent is better when **the intermediate noise is significant** — multiple fetches, pagination, cleanup — and only the final answer matters.',
          },
          {
            q: 'How is a subagent different from a Skill?',
            a: 'A Skill is knowledge the agent loads into its own context. A **subagent is a separate agent** — its own loop, its own context, its own tools. The main agent doesn\'t see its working; just the result.',
          },
          {
            q: 'When should I not use a subagent?',
            a: 'When the task is small and the output is compact. Spawning a subagent has overhead. **If the fetch produces two lines, just use a tool call.** Subagents earn their keep when the intermediate work is large or noisy.',
          },
        ],
        talkingPoints: [
          [
            'Our Release Notes Assistant has a CLAUDE.md and a Skill. It knows the conventions; it knows the format. What\'s left?',
            'It needs to **gather the PRs.** Forty merged pull requests, each with a title, description, maybe a diff. Thousands of tokens of raw data.',
            'That all lands in the main context. Now the agent is managing a fetch operation and trying to write a clean changelog at the same time.',
            'That\'s like asking the head chef to drive to the warehouse, [[inventory everything|context_flood]], and come back — before they can start cooking.',
          ],
          [
            'The fix is **delegation.** We hand the fetching to a subagent.',
            'A subagent is a separate agent: **its own loop, its own context window, its own tools.** It goes off, does the noisy work, and comes back with just the answer.',
            'The main agent\'s context stays clean. All it sees is the summary: "here are the 40 PRs, categorized, ready." Not the raw noise.',
            'We reach for subagents not because the task is hard — but because **the intermediate mess belongs [[somewhere else|isolation]].**',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Subagents · Why delegate', text: 'Side work that floods the context window belongs in a subagent', question: 'Why doesn\'t the main agent just fetch the PRs itself?' },
          { kind: 'prose', size: 'lg', md: 'Fetching forty PRs floods the main context with raw noise. A [[subagent|isolation]] takes that work into its own space and returns only what the main agent actually needs — the clean [[summary|isolation]].' },
          { kind: 'image', src: 'subagent-at-work', size: 'md', alt: 'Three-beat comic: main chef dispatches a runner; runner does messy PR-fetching work in its own corner; runner returns with one clean summary card', caption: 'The messy work stays in the subagent · only the summary returns' },
        ],
      },
    ],
  },

  'context-isolation': {
    id: 'context-isolation',
    title: 'Context isolation',
    blurb: 'Each subagent gets its own fresh window.',
    slides: [
      {
        id: 'ci-1',
        layout: 'center',
        steps: 4,
        estMinutes: 1.5,
        background: 'grid',
        details: {
          fresh_context: {
            title: 'Fresh context',
            icon: '🧹',
            body: 'Every subagent starts with an empty context window. It receives only what the main agent explicitly passes in — the task prompt, maybe a file or two. Nothing from the main agent\'s conversation leaks in.',
            analogy: 'A new hire given a single brief, not CC\'d on the whole email thread.',
          },
          summary_only: {
            title: 'Summary only',
            body: 'When the subagent finishes, it returns a text summary to the main agent. The main agent never sees the subagent\'s intermediate steps, its tool calls, or its context. Just the answer.',
          },
        },
        faqs: [
          {
            q: 'Can a subagent call other subagents?',
            a: 'Yes — the nesting goes as deep as the task requires. Each layer only returns a summary up to its parent. **The isolation is recursive.**',
          },
          {
            q: 'Does the subagent have access to the same tools?',
            a: 'By default, yes — but you can restrict it in AGENT.md. The PR-gathering subagent needs only `web_search` and `read_file`, so we grant exactly those. **Least privilege by default.**',
          },
          {
            q: 'What if the subagent fails?',
            a: 'The main agent gets an error summary instead of a result. It can retry, try a different approach, or surface the failure. **Same decision logic as any failed tool call** — the loop handles it.',
          },
        ],
        talkingPoints: [
          [
            'How does the subagent actually stay isolated? Simple: it starts with an **empty context window.**',
            'Not the main agent\'s conversation. Not its memory. A clean slate, with exactly what we gave it: the task prompt, and any files we explicitly passed in.',
          ],
          [
            'It runs its own loop — observe, think, act — in its own space.',
            'All the intermediate output, the tool calls, the pagination through forty PRs? **The main agent never sees any of it.** That noise stays in the subagent\'s window.',
          ],
          [
            'When the subagent finishes, it sends back one thing: **a summary.**',
            '"Here are the 40 merged PRs, organized by category, ready to be turned into a changelog."',
            'The main agent\'s context stayed clean the whole time. [[Isolation|fresh_context]] on the way in, [[summary only|summary_only]] on the way back.',
          ],
          [
            'That\'s the whole mechanism — and it\'s the same every time, no matter how many steps the subagent took internally.',
            'Fresh context in. One clean summary out. The main agent never saw the mess — it just got the answer.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Subagents · Isolation', text: 'A subagent starts fresh — only its summary crosses back to the main agent', question: 'How does the isolation actually work?' },
          { kind: 'prose', size: 'lg', md: 'A subagent starts with an empty [[context window|fresh_context]] — nothing from the main conversation leaks in. All its intermediate work stays there. When it finishes, only the [[summary|summary_only]] crosses back.' },
          { kind: 'diagram', diagramId: 'subagent-isolation', caption: 'Fresh context in · summary only out' },
        ],
      },
    ],
  },

  'subagent-config': {
    id: 'subagent-config',
    title: 'Configuring a subagent',
    blurb: 'AGENT.md: description, model, tools — the job posting.',
    slides: [
      {
        id: 'sc-1',
        layout: 'center',
        steps: 1,
        estMinutes: 1.5,
        background: 'grid',
        details: {
          agentmd: {
            title: 'AGENT.md',
            icon: '📄',
            body: 'The config file for a reusable subagent. Lives in `.claude/agents/`. Three key fields: **description** (when to spawn it), **model** (right-size the cost), **tools** (what it\'s allowed to call).',
            analogy: 'A job description: role title, decisions they can make, accounts they have access to.',
          },
          model_override: {
            title: 'Model override',
            body: 'Subagents don\'t need to use the same model as the main agent. A PR-fetching subagent doesn\'t need Opus — Haiku is fast and cheap for structured lookup work.',
            analogy: 'Sending a junior team member to do the warehouse run while the senior lead stays focused on the deliverable.',
          },
          tools_restriction: {
            title: 'Tool restriction',
            body: 'Scoping the subagent to only the tools it needs (`read_file`, `web_search`) prevents it from accidentally editing files or running commands. Least privilege, applied per-agent.',
          },
        },
        faqs: [
          {
            q: 'Is AGENT.md the same format as SKILL.md?',
            a: 'Similar frontmatter, different fields. SKILL.md has `name` and `description`. AGENT.md adds `model` and `tools`. **Both use YAML frontmatter and a Markdown body.**',
          },
          {
            q: 'What goes in the body of AGENT.md?',
            a: 'The subagent\'s standing instructions — for the PR gatherer: what fields to collect per PR, how to handle pagination, what format to return. **The job brief, not just the job title.**',
          },
          {
            q: 'Do I need an AGENT.md to spawn a subagent?',
            a: 'No — you can spawn inline with just a task prompt. AGENT.md is for **reusable, consistently configured helpers** you\'ll call more than once.',
          },
        ],
        talkingPoints: [
          [
            'How do we configure a subagent? Same way we configure a Skill — a Markdown file with frontmatter.',
            'For subagents it\'s called **[[AGENT.md|agentmd]]**, and it lives in `.claude/agents/`.',
            'Three fields do the work. **Description**: when should the main agent reach for this helper? **[[Model|model_override]]**: does this task need Opus, or can Haiku handle it? **[[Tools|tools_restriction]]**: exactly what\'s it allowed to call — and nothing else.',
            'Together they\'re the job posting. The role, the budget, and the access card.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Subagents · Config', text: 'AGENT.md is the subagent\'s job posting — description, model, tools', question: 'How do we configure a subagent?' },
          { kind: 'prose', size: 'lg', md: 'A [[AGENT.md|agentmd]] in `.claude/agents/` configures a reusable subagent. Three fields: description (when to spawn), [[model|model_override]] (right-size the cost), [[tools|tools_restriction]] (least privilege).' },
          { kind: 'diagram', diagramId: 'agent-md-fields', caption: 'Three fields configure every reusable subagent' },
          {
            kind: 'code',
            lang: 'md',
            filename: '.claude/agents/pr-gatherer/AGENT.md',
            code: `---
name: pr-gatherer
description: >
  When the main agent needs to collect merged pull requests
  from a GitHub repository for a given date range.
model: claude-haiku-4-5
tools:
  - web_search
  - read_file
---

## Your job

Fetch every pull request merged in the requested date range.
For each PR, return: title, number, author, labels, body summary.
Paginate until all results are collected.
Return a structured list — no prose, no filler.`,
          },
        ],
      },
      {
        id: 'sc-2',
        layout: 'center',
        steps: 3,
        estMinutes: 2,
        background: 'grid',
        details: {
          division: {
            title: 'Division of labor',
            body: 'The PR gatherer does one job: fetch and structure the PRs. The main agent does one job: turn them into a clean changelog. Neither has to care about the other\'s work.',
            analogy: 'Sous chef preps ingredients; head chef composes the dish.',
          },
        },
        faqs: [
          {
            q: 'Do we call the subagent explicitly in the prompt?',
            a: 'No — the main agent decides when to spawn it, based on the AGENT.md description. We type "write the release notes," the description matches, and **the PR gatherer fires automatically.**',
          },
          {
            q: 'What if the subagent fetches the wrong date range?',
            a: 'The main agent sees the summary and can ask for a correction. **Same loop logic as any tool result** — if the output looks wrong, the agent re-spawns with a narrower prompt.',
          },
          {
            q: 'Is this the end of the running example?',
            a: 'For Modules 2 and 3, yes. Our assistant now has **CLAUDE.md** (memory), a **Skill** (format rules), and a **subagent** (PR fetching). Module 7 assembles a larger version — the full multi-subagent PR-review build.',
          },
        ],
        talkingPoints: [
          [
            'Let\'s run the whole thing through. We type: "Write this week\'s release notes."',
            'The main agent reads our CLAUDE.md — it knows the repo, the conventions. It matches the release-notes Skill — the format rules load.',
            'Then it looks at the task: gather forty PRs. That\'s the **PR gatherer\'s job.** It spawns the subagent.',
          ],
          [
            'The PR gatherer fetches, paginates, structures. All of that noise stays in its own context.',
            'It comes back with a clean list: forty PRs, titles, labels, summaries. One return message.',
            '**The main agent never saw the raw API calls.** It got the answer, not the work.',
          ],
          [
            'Now the main agent writes. It has the format from the Skill, the material from the subagent, the conventions from CLAUDE.md.',
            'Everything it needs. Nothing it doesn\'t. **That\'s the [[whole design|division]].**',
            'We started with a CLAUDE.md. We added a Skill. We added a subagent. Same assistant the whole way through — one more capability added each module.',
            'Module 7 takes this further: four specialized subagents, a synthesizer, a real PR-review pipeline. But the building blocks are exactly what we just built.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Subagents · Running example', text: 'The PR gatherer fetches; the main agent writes — clean division of labor', question: 'What does the finished assistant look like?' },
          { kind: 'prose', size: 'lg', md: 'One command: the main agent loads the release-notes Skill and hands the PR fetch to its [[subagent|division]]. Noisy work stays isolated; a clean summary comes back.' },
          { kind: 'image', src: 'subagent-at-work', size: 'sm', alt: 'Three-beat comic: main chef dispatches a runner; runner does messy PR-fetching work; runner returns with one clean summary card', caption: 'PR gatherer goes off, does the noisy work, and brings back only the answer' },
          {
            kind: 'tiles',
            columns: 3,
            tiles: [
              { title: 'CLAUDE.md', icon: '📄', tone: 'muted', body: 'Repo conventions — always loaded, always on.' },
              { title: 'Skill', icon: '📋', tone: 'muted', body: 'Changelog format rules — loads when the task matches.' },
              { title: 'Subagent', icon: '🤝', tone: 'accent', body: 'PR gatherer — fetches in isolation, returns the summary.' },
            ],
          },
        ],
      },
    ],
  },

  // ── Module 4 · Extending Claude Code ──────────────────────────────────────
  'hooks-lifecycle': {
    id: 'hooks-lifecycle',
    title: 'Hooks',
    blurb: 'Commands that fire at lifecycle events.',
    slides: [
      {
        id: 'hk-1',
        layout: 'center',
        steps: 3,
        estMinutes: 2,
        background: 'grid',
        details: {
          hook: {
            title: 'Hook',
            icon: '🔗',
            body: 'A shell command registered against a **lifecycle event** — PreToolUse, PostToolUse, Notification, Stop. Claude Code calls it automatically, passes context as JSON on stdin, and reads the exit code.',
            analogy: 'A bouncer at the door: every tool call checks in before it touches anything.',
          },
          preToolUse: {
            title: 'PreToolUse hook',
            body: 'Runs **before** any tool fires. A non-zero exit **blocks the tool call entirely** — the file is never touched, the command never runs.',
            analogy: 'The bouncer says no: the call never happens.',
          },
        },
        faqs: [
          { q: 'Can a hook see what Claude is about to do?', a: 'Yes. The hook receives the full tool call as JSON on stdin. **It can inspect, log, or block based on any detail.**' },
          { q: 'What happens if my hook crashes?', a: 'Non-zero exit blocks the tool call. A crash counts as non-zero. **Write hooks defensively** — a broken hook stops Claude mid-task.' },
          { q: 'Are hooks per-project or global?', a: 'Both. Project hooks live in `.claude/settings.json` and travel with the repo. **Global hooks are in your user config** and apply everywhere.' },
        ],
        talkingPoints: [
          [
            'What if we want Claude Code to enforce a rule on every single tool call — automatically, without trusting the model to remember? That is what [[hooks|hook]] solve.',
            'A hook is a shell command we register against a lifecycle event. The four main events: PreToolUse, PostToolUse, Notification, and Stop.',
            'The power move: a non-zero exit from a [[PreToolUse hook|preToolUse]] blocks the tool call entirely. The file is never touched. The command never runs.',
          ],
          [
            'Think of it as a bouncer at the door. Every tool call has to pass the PreToolUse hook before it touches anything.',
            'If the bouncer says no — non-zero exit — the call never happens. No model memory required. The rule is mechanical and absolute.',
          ],
          [
            'For the Release Notes Assistant: a hook can enforce "never write outside `changelog/`" without relying on the model to remember that every time.',
            'Skills give Claude vocabulary. MCP gives it reach. **Hooks give us a safety net underneath everything it does.**',
            'That is the complete extending picture: four tools, each adding a different kind of capability to the same loop.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Extending · Hooks', text: 'Hooks intercept every tool call — a non-zero exit blocks it before anything fires', question: 'How do I enforce rules Claude might forget?' },
          { kind: 'prose', size: 'lg', md: 'A [[hook|hook]] is a shell command wired to a lifecycle event. The [[PreToolUse hook|preToolUse]] fires before any tool runs — a non-zero exit **cancels the call entirely**.' },
          { kind: 'image', src: 'hooks-intercept', size: 'md', alt: 'Comic showing a bouncer robot checking a tool-call badge at a gate — non-zero badge gets turned away', caption: 'Every tool call clears the hook before touching anything' },
          { kind: 'code', lang: 'json', filename: '.claude/settings.json', code: `{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [{ "type": "command", "command": "scripts/check-path.sh" }]
      }
    ]
  }
}` },
        ],
      },
    ],
  },
  mcp: {
    id: 'mcp',
    title: 'MCP',
    blurb: 'Connect external tools.',
    slides: [
      {
        id: 'mcp-1',
        layout: 'center',
        steps: 3,
        estMinutes: 2,
        background: 'grid',
        details: {
          mcp: {
            title: 'Model Context Protocol (MCP)',
            icon: '🔌',
            body: 'An open standard that lets external services expose **tools** Claude Code can call — databases, CI runners, search APIs, anything with a web interface.',
            analogy: 'USB-C for AI tools: one plug shape, thousands of compatible devices.',
            source: { label: 'MCP documentation', href: 'https://modelcontextprotocol.io' },
          },
          server: {
            title: 'MCP server',
            body: 'A small process that wraps an external service and advertises its tools in MCP format. Claude Code connects to it at startup and **gains those tools immediately**.',
            analogy: 'The adapter brick between Claude and the service it needs to reach.',
          },
        },
        faqs: [
          { q: 'Do I have to write my own MCP server?', a: 'Not usually. **Hundreds of open-source servers already exist** for GitHub, Slack, Postgres, Figma, and more. Two lines of config and you are wired in.' },
          { q: 'How does Claude know which tool to call?', a: 'The server advertises each tool with a name and description. Claude reads those at startup and **picks the right tool based on your request.**' },
          { q: 'Is MCP safe to use in production?', a: '**Yes, with the same care you would give any third-party library.** Review what each server can access; the allow/deny settings let you restrict which MCP tools Claude can call.' },
        ],
        talkingPoints: [
          [
            'What if we want Claude Code to query our database, pull live CI status, or open a Jira ticket? Pasting that data into the chat every time is not a workflow. That is what [[MCP|mcp]] solves.',
            'MCP stands for Model Context Protocol. Any external service wraps itself in a [[server|server]], Claude Code connects at startup, and those tools are immediately in the repertoire.',
            'Think USB-C: **one plug shape, thousands of compatible devices.** We configure which servers we want and Claude gains those tools for free.',
          ],
          [
            'Wiring one in takes two lines in `.claude/settings.json`. Name the server, point to its command. Claude reads the tool list at startup.',
            'For the Release Notes Assistant, a GitHub MCP server means the PR-fetch step becomes **one tool call** instead of a shell script.',
          ],
          [
            'Skills gave Claude vocabulary. Hooks gave it a safety net. MCP gives it **reach** — the ability to act on external systems directly.',
            'Each layer stacks on the last. The assistant is not a chat window anymore. It is a collaborator with access to our full toolchain.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Extending · MCP', text: 'MCP gives Claude Code a standard plug for any external tool', question: 'How do I connect Claude to my stack?' },
          { kind: 'prose', size: 'lg', md: '[[MCP|mcp]] is an open standard: external services expose tools via an [[MCP server|server]], Claude Code connects at startup — **no custom glue code required.**' },
          { kind: 'image', src: 'mcp-plugin-socket', size: 'md', alt: 'Comic showing a robot plugging a standard connector into service sockets labelled GitHub, Slack, Postgres', caption: 'One standard plug, any service on the other end' },
          { kind: 'code', lang: 'json', filename: '.claude/settings.json', code: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}` },
        ],
      },
    ],
  },
  'plan-mode': {
    id: 'plan-mode',
    title: 'Plan mode',
    blurb: 'Explore and propose before editing.',
    slides: [
      {
        id: 'pm-1',
        layout: 'center',
        steps: 2,
        estMinutes: 1.5,
        background: 'grid',
        details: {
          planMode: {
            title: 'Plan mode',
            body: 'Activated with `--plan` or `/plan`. Claude Code reads your codebase and proposes a step-by-step approach — but **touches nothing until you approve**. The plan is editable plain text.',
            analogy: 'Asking a contractor to walk the site and write a quote before swinging a single hammer.',
            source: { label: 'Claude Code docs', href: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
          },
        },
        faqs: [
          { q: 'Does plan mode cost more tokens?', a: 'Yes — it does a read pass before any edits. The payoff is avoiding a **costly wrong-direction rewrite**.' },
          { q: 'Can I edit the plan before approving?', a: "Yes. The plan is plain text in the chat window. Paste it back, strike lines, add constraints — Claude Code treats your edited version as **the new brief**." },
          { q: 'When should I skip plan mode?', a: 'For small, well-scoped tasks — a one-line fix, a rename, a test addition. **Plan mode earns its keep on multi-file changes with unclear dependencies.**' },
        ],
        talkingPoints: [
          [
            "Here is the single habit that separates confident Claude Code use from hoping the repo stays intact: **plan before we build.**",
            'Plan mode — triggered with `--plan` or `/plan` — puts Claude Code into a read-only exploration pass. It reads our codebase, maps the dependencies, and writes out a step-by-step proposal. It touches **nothing** until we approve.',
            'Think of it like hiring a contractor to walk the site and write a quote before swinging a hammer. We see the plan, argue about it, cross things out — then give the green light.',
          ],
          [
            'The loop: read-only exploration → a reviewed [[plan|planMode]] → execute. That one extra step is the difference between a surgical refactor and a three-hour rollback.',
            'For the Release Notes Assistant: before we wire in the subagent, we run plan mode. We see exactly which files it will touch and in what order. No surprises.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Extending · Plan mode', text: 'Plan mode explores read-only and waits for your approval before touching a file', question: 'How do I avoid accidental rewrites?' },
          { kind: 'prose', size: 'lg', md: 'Run [[plan mode|planMode]] first: Claude Code reads your codebase, proposes a step-by-step approach, and **waits for your approval** before touching a single file.' },
          { kind: 'diagram', diagramId: 'plan-mode-flow', caption: 'Explore → Plan → Approve → Execute — nothing is written until you say go' },
          { kind: 'callout', tone: 'analogy', md: 'Like asking a contractor to walk the site and write a quote **before** swinging a hammer — you see the plan, argue about it, then give the green light.' },
        ],
      },
    ],
  },
  'settings-permissions': {
    id: 'settings-permissions',
    title: 'Settings & permissions',
    blurb: 'allow/deny, scopes, precedence.',
    slides: [
      {
        id: 'sp-1',
        layout: 'center',
        steps: 3,
        estMinutes: 2,
        background: 'grid',
        details: {
          allow: {
            title: 'allow list',
            body: 'Tool patterns Claude Code can use **without asking first**. Wildcards work: `"Write": ["src/**"]` lets it write anywhere under `src/`, silently.',
            analogy: 'The green lane at security: pre-approved, no stopping.',
          },
          deny: {
            title: 'deny list',
            body: 'Patterns Claude Code **can never use**, regardless of any allow. Deny always wins. Use it for irreversible operations: `rm -rf`, production DB writes, secret files.',
            analogy: 'A fire door: locked from the inside, no key overrides it.',
          },
          scope: {
            title: 'Settings scope',
            body: 'Four layers, highest-wins: **Enterprise** > **Project** (`.claude/settings.json`) > **User** (`~/.claude/settings.json`). Deny at any layer blocks everywhere below.',
            analogy: 'Like git config: the more local file overrides the global one.',
          },
        },
        faqs: [
          { q: 'What happens if allow and deny conflict?', a: '**Deny always wins, everywhere.** You cannot allow something that is on the deny list, no matter which scope it is in.' },
          { q: 'Can I set different permissions per project?', a: 'Yes. Put project-specific rules in `.claude/settings.json`. **Those rules travel with the code** — clone the repo and the safety net comes with it.' },
          { q: 'How do I let Claude run tests automatically but not deploy?', a: 'Allow `"Bash": ["npm test"]` and deny `"Bash": ["npm run deploy"]`. **Pattern matching is your precision control.**' },
        ],
        talkingPoints: [
          [
            'How much does Claude do automatically, and how much does it stop to ask? That is what settings and permissions answer.',
            'The core rule: **[[allow lists|allow]]** tell Claude what it can do silently. **[[Deny lists|deny]]** tell it what it can never do. And deny always beats allow — that order never flips.',
          ],
          [
            'Settings live at four [[scopes|scope]]: enterprise-managed, project-level, user-level, and a global default. The more local scope wins for allows; deny at any scope blocks everywhere.',
            'Think of it like git config: the file closest to you overrides the one further away. Except for deny, which is a fire door that no local override can unlock.',
          ],
          [
            'For the Release Notes Assistant: we want it to read anything and write changelogs freely. But it should never deploy, never touch secrets.',
            'Three lines of deny config, and those guardrails travel with the repo. **Anyone who clones it inherits the same safety net** without thinking about it.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Extending · Settings', text: 'Settings tune what Claude does silently — deny always beats allow', question: 'How do I control what Claude can touch?' },
          { kind: 'prose', size: 'lg', md: '[[Allow lists|allow]] say what to do silently. [[Deny lists|deny]] block regardless. A four-level [[scope|scope]] hierarchy means project rules travel with the repo — and a deny at any layer blocks everywhere below it.' },
          { kind: 'code', lang: 'json', filename: '.claude/settings.json', code: `{
  "permissions": {
    "allow": ["Write:src/**", "Bash:npm test"],
    "deny":  ["Bash:npm run deploy", "Write:.env*"]
  }
}` },
        ],
      },
      {
        id: 'sp-2',
        layout: 'center',
        steps: 3,
        estMinutes: 2,
        background: 'grid',
        details: {
          enterprise: {
            title: 'Enterprise scope',
            icon: '🏢',
            body: 'Admin-managed settings that apply org-wide. **No project allow can override them** — the org\'s ceiling is always the ceiling.',
            analogy: 'Company policy. The team can add desk rules, but nobody overrides company policy.',
          },
          projectScope: {
            title: 'Project scope',
            body: 'Settings in `.claude/settings.json` at the repo root. **Committed to git — the whole team inherits the same allow/deny rules when they clone.**',
            analogy: 'The house rules printed on the fridge: visible to everyone who works in this kitchen.',
          },
          userScope: {
            title: 'User scope',
            body: 'Settings in `~/.claude/settings.json`. Your personal defaults across **every project you touch** — not shared, never committed.',
            analogy: 'Your own notebook: your preferences, your machine, nobody else sees it.',
          },
        },
        faqs: [
          {
            q: 'Can my user settings override a project deny?',
            a: 'No. **Deny at any scope is absolute.** A user-level allow cannot unlock a project-level deny — deny is a fire door, not a toggle.',
          },
          {
            q: 'What wins for allows when project and user both grant something?',
            a: '**The most local scope wins for allows.** User overrides project overrides the baseline. But for deny, the first match at any scope wins — no override, no exceptions.',
          },
          {
            q: 'Where should the Release Notes Assistant\'s deny list live?',
            a: 'In `.claude/settings.json` at the repo root. **Commit it, and every teammate inherits the same guardrails automatically** — nothing to configure per machine.',
          },
        ],
        talkingPoints: [
          [
            'Where do settings actually live? Not just one file — there are **four scopes**, and they don\'t all have the same weight.',
            'At the top: [[Enterprise|enterprise]] scope — admin-managed, the org\'s ceiling. Then [[Project|projectScope]]: the settings file committed in the repo. Then [[User|userScope]]: our personal defaults across every project we touch. And finally the global baseline.',
            'They all load together — not a chain of command, a stack of sticky notes, each one more specific as it gets closer to the work.',
          ],
          [
            '**Enterprise scope sits at the ceiling.** It\'s not ours to write — the org manages it, and no project allow can override it.',
            'Think of it like company policy versus desk notes. We write the desk notes. The company writes the policy. The policy has the final word.',
          ],
          [
            'And here\'s the one rule with no exceptions: **deny at any scope wins everywhere below it.**',
            'If the project settings deny a tool, a user-level allow cannot unlock it. If enterprise denies something, nothing below can grant it back. It\'s a fire door — locked from the inside, no key overrides it.',
            'For the Release Notes Assistant: one deny list in the project settings, committed to git. **Anyone who clones it inherits the same guardrails** — they don\'t have to think about it.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Extending · Settings', text: 'Settings live in four scopes — deny at any scope blocks everywhere below', question: 'Where do settings live, and who wins when they conflict?' },
          { kind: 'prose', size: 'lg', md: 'Four [[scopes|projectScope]] stack from org-wide to personal. **For allows, the most local scope wins. For deny, the first match anywhere wins** — no override, no exceptions.' },
          { kind: 'diagram', diagramId: 'settings-scope', caption: 'Enterprise → Project → User → Global Default — deny at any layer is absolute' },
        ],
      },
    ],
  },
  plugins: {
    id: 'plugins',
    title: 'Plugins',
    blurb: 'Bundle skills, agents, hooks, MCP.',
    slides: [
      {
        id: 'pl-1',
        layout: 'center',
        steps: 2,
        estMinutes: 1.5,
        background: 'grid',
        details: {
          plugin: {
            title: 'Plugin',
            icon: '📦',
            body: 'A directory that bundles **skills, agents, hooks, and MCP config** into one installable unit. Drop it into `.claude/plugins/` and all four layers activate at once.',
            analogy: 'An app on your phone: one install, all the capabilities together.',
          },
          marketplace: {
            title: 'Plugin marketplace',
            body: 'A registry of shared plugins — team-made or community-made — that you browse and install by name. **Share once, use everywhere.**',
            analogy: 'The app store for Claude Code extensions.',
          },
        },
        faqs: [
          { q: 'Do I have to publish to use plugins?', a: 'No. A plugin is just a local directory. **Share via git or npm; no marketplace required.** The registry is optional convenience.' },
          { q: 'Can one plugin depend on another?', a: 'Yes. Plugins can declare dependencies. **The whole graph installs at once** — same pattern as npm packages.' },
          { q: 'What goes in a plugin vs. the project CLAUDE.md?', a: 'Plugin = **reusable across projects**. CLAUDE.md = **project-specific** (this repo paths, this changelog format).' },
        ],
        talkingPoints: [
          [
            'We have now built four kinds of extension: a skill, an agent, a hook, and an MCP server. Each took its own file, its own config. Here is the question: how do we package all four and share them with the rest of the team?',
            'That is what a [[plugin|plugin]] is. One directory. Inside: the skills folder, the agents folder, the hooks config, the MCP entries. **Drop it into `.claude/plugins/` and every layer activates at once.**',
          ],
          [
            'Plugins travel via git or npm. The team publishes the release-notes plugin once. Everyone else installs it and gets the same Release Notes Assistant we built today — skills, subagent, hook, and all.',
            'There is also a [[marketplace|marketplace]]: one-command install from a shared registry. Same model as npm packages, dependency graphs and all.',
            'And that is the full extending picture: **skills, subagents, hooks, MCP, and plugins** — five layers, each adding one kind of capability, all composing into the assistant we need.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Extending · Plugins', text: 'A plugin bundles skills, agents, hooks, and MCP into one shareable unit', question: 'How do I share all these extensions with my team?' },
          { kind: 'prose', size: 'lg', md: 'A [[plugin|plugin]] is a directory that packages every extension layer. Install via git or the [[marketplace|marketplace]] — **one command, four capabilities.**' },
          { kind: 'image', src: 'plugins-bundle', size: 'sm', alt: 'Comic showing four component boxes — Skill, Agent, Hook, MCP — being wrapped into a single gift-box plugin', caption: 'Four layers, one install' },
          {
            kind: 'tiles',
            columns: 4,
            tiles: [
              { title: 'Skills', icon: '📋', tone: 'muted', body: 'Saved instruction sets that load on demand.' },
              { title: 'Agents', icon: '🤖', tone: 'muted', body: 'Specialized subagents with their own personas.' },
              { title: 'Hooks', icon: '🔗', tone: 'muted', body: 'Lifecycle commands that guard every tool call.' },
              { title: 'MCP', icon: '🔌', tone: 'accent', body: 'External tool connections, pre-configured.' },
            ],
          },
        ],
      },
    ],
  },

  // ── Module 5 · Choosing the right tool ────────────────────────────────────
  'the-decision-matrix': {
    id: 'the-decision-matrix',
    title: 'The decision matrix',
    blurb: 'Skill vs Subagent vs Slash vs MCP vs Hook.',
    slides: [
      {
        id: 'dm-1',
        layout: 'center',
        steps: 1,
        estMinutes: 1.5,
        background: 'default',
        details: {
          skill: { title: 'Skill', body: 'Packaged reusable behavior Claude loads on demand. Use when you want **a repeatable instruction set** — code review, release notes, a writing style.', analogy: 'The recipe card: read when cooking that dish.' },
          subagent: { title: 'Subagent', body: 'A delegated helper agent that works in isolation. Use when a task needs **its own loop and its own context** — research, long fetches, parallel work.', analogy: 'The prep cook at a separate station.' },
          slash: { title: 'Slash command', body: 'A human-triggered chat shortcut. Use when **you** want to kick off a fixed workflow with one command — not Claude, you.', analogy: 'Speed-dial for a saved prompt.' },
          mcp: { title: 'MCP tool', body: 'A live connection to an external service. Use when Claude needs to **read from or act on** a real system — a database, a CI runner, a third-party API.', analogy: "Claude's hand reaching into the toolbox." },
          hook: { title: 'Hook', body: 'An automatic shell command wired to a lifecycle event. Use when you want **every tool call checked** against a rule — path restrictions, linting, logging.', analogy: 'The bouncer: always on, never asked.' },
        },
        faqs: [
          { q: 'How do I know which mechanism to reach for?', a: "Ask: **who runs the logic?** Human triggers a prompt = slash command. Claude drives multi-step = subagent. External API = MCP. Automatic check = hook. Reusable instruction = skill." },
          { q: 'Can I use more than one mechanism together?', a: 'Yes — they compose. A **slash command** can kick off a **subagent**, which calls an **MCP tool**, and a **hook** validates the result.' },
          { q: 'What happens if I put logic in the wrong layer?', a: "It works until it doesn't. **Wrong layer = wrong owner.** The matrix is a bug-prevention map, not just a menu." },
        ],
        talkingPoints: [[
          'Every time we hit a new workflow need, we face the same question: skill, subagent, slash, MCP, or hook? The decision matrix gives us one rule for each — so we stop debating and start building.',
          'Each maps one need to one mechanism: reusable packaged behavior is a [[skill|skill]]; a planning loop is a [[subagent|subagent]]; a chat shortcut is [[slash|slash]]; a live external service is [[MCP|mcp]]; an automatic event-trigger is a [[hook|hook]].',
        ]],
        blocks: [
          { kind: 'heading', eyebrow: 'Choosing · Decision matrix', text: 'Each workflow need maps to exactly one mechanism — the matrix tells you which', question: 'How do I pick the right Claude Code extension?' },
          { kind: 'prose', size: 'lg', md: 'Five mechanisms, five jobs: [[Skill|skill]], [[Subagent|subagent]], [[Slash command|slash]], [[MCP tool|mcp]], [[Hook|hook]]. The matrix maps each need to the one that owns it.' },
          { kind: 'widget', widgetId: 'decision-matrix' },
        ],
      },
    ],
  },

  // ── Module 6 · Models ─────────────────────────────────────────────────────
  'model-lineup': {
    id: 'model-lineup',
    title: 'Choosing a model per task',
    blurb: 'The decision — cost/speed vs depth (the lineup is taught in Foundations).',
    slides: [
      {
        id: 'ml-1',
        layout: 'center',
        steps: 1,
        estMinutes: 1.5,
        background: 'default',
        details: {
          haiku: {
            title: 'Haiku — fast and cheap',
            body: 'Best for high-volume, low-stakes tasks: linting, formatting, quick lookups. Runs in milliseconds and costs a fraction of a cent per call.',
            analogy: 'The intern who handles the filing — fast, reliable, perfect for anything you’d feel silly doing yourself.',
          },
          sonnet: {
            title: 'Sonnet — the workhorse',
            body: 'The default for most coding work. Balances quality and cost well — good enough for complex edits, not overkill for simple ones.',
            analogy: 'A senior engineer on an ordinary sprint day.',
          },
          opus: {
            title: 'Opus — deep reasoning',
            body: 'Brings the most reasoning power. Use it for architecture decisions, tricky bugs, or ambiguous requirements where you need the model to think hard.',
            analogy: 'Calling in a consultant for the really thorny problem.',
          },
        },
        faqs: [
          {
            q: 'Should I just always use the most powerful model?',
            a: '**No — and cost is only half the reason.** Heavier models are slower too. For bulk or latency-sensitive tasks, a faster model produces a better user experience even when budget is unlimited.',
          },
          {
            q: 'How does Claude Code choose the model for subagents?',
            a: 'It inherits the model you set for the session unless you override it in the agent call. **Each subagent can target a different model**, so you can send lightweight tasks to Haiku while the orchestrator runs on Sonnet.',
          },
          {
            q: 'When does the model choice actually matter in practice?',
            a: 'Mostly at scale. For a single interactive session the difference is small. **It matters when you’re running hundreds of subagent calls or building a product where API cost is a line item.**',
          },
        ],
        talkingPoints: [
          [
            'We already know the lineup — Haiku, Sonnet, Opus. We met them in Foundations. The question here is: **how do we pick one for a given job?**',
            'The answer is a two-axis test. Axis one: **how much reasoning does this task actually need?** Axis two: **how much does it matter if this call takes two seconds instead of two hundred milliseconds?**',
            'High reasoning, low volume, correctness critical? That’s Opus. Standard coding work, everyday edits, complex but routine? Sonnet — the default, and the right call most of the time. High volume, fast turnaround, low stakes? Haiku. It costs a fraction and runs in milliseconds.',
            'The practical rule: **start with Sonnet and only move if you hit a wall or a bill.** Move up to Opus when the problem is genuinely hard to reason about. Move down to Haiku when you’re sending the same simple task dozens of times.',
            'That’s it. Not a hierarchy of quality — a **dial we tune to the job.** Cost and speed are the controls.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Models', question: 'Which model do I reach for?', text: 'Match the model to the job — cost and speed are the deciding factors.' },
          { kind: 'prose', size: 'lg', md: 'The model lineup is fixed. The decision is ours: **match reasoning depth, speed, and cost to what the task actually needs** — not to what’s most impressive.' },
          { kind: 'callout', tone: 'analogy', md: 'Like choosing between sending a courier, a same-day delivery service, or overnight freight — same package, very different trade-offs.' },
          { kind: 'diagram', diagramId: 'model-lineup', caption: 'Haiku → Sonnet → Opus: fast-and-cheap to slow-and-capable' },
          {
            kind: 'tiles',
            columns: 3,
            tiles: [
              { title: '[[Haiku|haiku]]', icon: '⚡', tone: 'muted', body: 'Fast, cheap, high volume. Low-stakes tasks where speed beats depth.' },
              { title: '[[Sonnet|sonnet]]', icon: '🛠', tone: 'accent', body: 'The everyday workhorse. Right for most coding tasks — default unless you have a reason to move.' },
              { title: '[[Opus|opus]]', icon: '🧠', tone: 'muted', body: 'Deep reasoning, complex problems. Worth the cost when correctness or architecture is on the line.' },
            ],
          },
        ],
      },
    ],
  },
  'model-picker-lab': {
    id: 'model-picker-lab',
    title: 'Model picker (lab)',
    blurb: 'Compare tradeoffs interactively.',
    slides: [{
      id: 'mp-1',
      layout: 'center',
      steps: 4,
      estMinutes: 1.5,
      background: 'default',
      details: {
        sample: {
          title: 'Sample tooltip',
          body: 'This is a hover tooltip. In Phase B it carries the precise definition, a gotcha, and a doc citation — so the slide stays clean while depth is one hover away.',
          analogy: 'Like a footnote that only appears when you point at it.',
          source: { label: 'Claude Code docs', href: 'https://code.claude.com/docs' },
        },
      },
      faqs: [
        {
          q: 'What is the practical difference between Haiku, Sonnet, and Opus?',
          a: 'Think of them as three price-performance tiers. **Haiku is your fast-lane model** — sub-second responses, a fraction of the cost, perfect for high-volume or low-stakes work like autocomplete or quick summaries. Sonnet is the balanced default: strong enough for most coding tasks, fast enough you barely notice the wait. Opus is the deliberate thinker — you pay more and wait a little longer, but it earns its price on architecture decisions and tricky bugs where **correctness beats speed**.',
        },
        {
          q: 'When should I pick a faster, cheaper model?',
          a: 'For routine tasks — linting, short completions, quick summaries — a faster model **saves cost and latency** without sacrificing quality. Reserve the heavyweight models for reasoning-heavy work.',
        },
        {
          q: 'Does switching models change how I write prompts?',
          a: 'Slightly. Smaller models benefit from **more explicit instructions**, while larger models handle ambiguity better. The **interactive picker** in this slide shows you the tradeoff in real time.',
        },
      ],
      talkingPoints: [
        [
          'The tradeoff isn\'t abstract: cost drops sharply as we move from Opus to Haiku, while latency tightens and raw reasoning power narrows.',
          'Opus earns its price tag on tasks that need deep, multi-step reasoning — the kind of judgment call a senior engineer makes. Haiku gets you an answer in under a second for a fraction of the cost.',
          'Most real workflows use both: Haiku handles the fast, repetitive subtasks; Opus steps in only when the complexity demands it.',
        ],
        [
          'Haiku 4.5 is the speed tier — sub-second responses at the lowest cost per token.',
          'Use it for high-volume, well-scoped tasks: autocomplete, short summaries, quick lookups, anything where latency matters more than deep reasoning.',
          'In multi-agent workflows, Haiku is the natural choice for leaf-node subtasks that run in parallel.',
        ],
        [
          'Sonnet 4.6 is the daily driver — the right default for most coding and everyday work.',
          'It hits the balanced sweet spot: capable enough to handle complex reasoning, fast enough that you barely notice the wait.',
          'When in doubt, start here. Switch up to Opus only when Sonnet\'s answers fall short.',
        ],
        [
          'Opus 4.8 is the deep-reasoning tier — bring it in for hard, multi-step problems and long autonomous runs.',
          'It takes more time and costs more per token, but earns that on architecture decisions, tricky bugs, and any task where correctness beats speed.',
          'Fable 5 sits at the frontier — the most capable model available, reserved for the hardest and longest problems where only the best will do.',
        ],
      ],
      blocks: [
        { kind: 'heading', eyebrow: 'Models', question: 'How do cost, speed, and depth trade off?', text: 'Not every task needs the most powerful model — pick by cost, speed, and reasoning depth.' },
        { kind: 'prose', size: 'lg', md: 'Choosing a model is a cost-speed-reasoning tradeoff: Haiku answers in milliseconds for a fraction of a cent, while Opus applies deep multi-step reasoning at a higher price. Most workflows blend both — Haiku for fast, repetitive tasks and Opus only when the complexity demands it.' },
        { kind: 'callout', tone: 'analogy', md: 'Like choosing between a bicycle courier, a car, and an overnight freight truck — same package, very different tradeoffs. Pick the vehicle that fits the distance.' },
        { kind: 'widget', widgetId: 'model-picker', params: { label: 'model-picker' } },
      ],
    }],
  },

  // ── Module 7 · Real-world builds ──────────────────────────────────────────
  'code-review-skill': {
    id: 'code-review-skill',
    title: 'Build: a code-review Skill',
    blurb: 'End-to-end, start to finish.',
    slides: [
      {
        id: 'cr-1',
        layout: 'center',
        steps: 3,
        estMinutes: 2,
        background: 'grid',
        details: {
          reviewSkill: {
            title: 'Code-review Skill',
            body: 'A SKILL.md file that teaches Claude **how your team reviews code** — what to look for, how to phrase feedback. Loaded only when a code-review task is requested.',
            analogy: 'Your senior engineer review checklist, condensed into a recipe card Claude can read.',
          },
          trigger: {
            title: 'Skill trigger',
            body: 'The `description:` field must describe **when to use this skill**, not just what it is. "When asked to review a pull request or audit code for quality issues."',
            analogy: 'The recipe title that tells the chef when to pull it off the rack.',
          },
        },
        faqs: [
          { q: 'How specific should the review checklist be?', a: 'Very. Vague guidance produces vague reviews. **Name the exact checks**: error handling pattern, test threshold, naming convention.' },
          { q: 'Can the Skill reference our style guide?', a: 'Yes — paste excerpts directly, or use `@path/to/style-guide.md`. **The skill can embed or reference any text Claude should follow.**' },
          { q: 'Will it review all files the same way?', a: 'Only if we tell it to. Add sections: "For API routes, also check: ...". **Conditional logic in plain English works.**' },
        ],
        talkingPoints: [
          [
            'We have built skills for the Release Notes Assistant. Now let us build one for a job we do every week: **code review.**',
            'The goal: one SKILL.md that teaches Claude how our team reviews pull requests — what we always check, what we skip, how we phrase feedback. Not a generic reviewer. Ours.',
          ],
          [
            'The skill starts with frontmatter. The `name:` is for us. The [[description|trigger]] is for Claude — it reads that at startup and decides when to fire the skill.',
            'A scenario-style trigger like "When asked to review a pull request or audit code" fires it exactly when we want. A vague name never fires it reliably.',
          ],
          [
            'The body is our checklist in plain English: error handling must be explicit, tests must cover the happy path, function names must be verbs.',
            'Claude applies it consistently on every PR — **the same senior-engineer bar, every time.**',
            'The skill travels with the repo. New teammate clones it, the code-review standard comes with it. That is the compounding value of skills.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Real-world · Code review', text: 'A code-review Skill is one markdown file that teaches Claude how your team reviews', question: 'How do we get consistent code review from Claude?' },
          { kind: 'prose', size: 'lg', md: 'A [[code-review Skill|reviewSkill]] is a SKILL.md with a precise [[trigger|trigger]] and a checklist body. Claude fires it on every PR review request and applies the same bar every time.' },
          { kind: 'diagram', diagramId: 'skill-anatomy', caption: 'Frontmatter trigger · body checklist · loaded on-demand' },
          { kind: 'code', lang: 'md', filename: '.claude/skills/code-review.md', code: `---
name: Code Review
description: When asked to review a pull request or audit code for quality issues.
---

## What to check on every PR

- Error handling is explicit; no silent catches
- Tests cover the happy path and at least one failure case
- Function names are verbs (getUser, not user)

## Feedback tone

Keep it collaborative: "Consider extracting this" not "This is wrong."` },
        ],
      },
    ],
  },
  'research-subagent': {
    id: 'research-subagent',
    title: 'Build: a research subagent',
    blurb: 'Delegate research, get a summary.',
    slides: [
      {
        id: 'rs-1',
        layout: 'center',
        steps: 3,
        estMinutes: 2,
        background: 'grid',
        details: {
          researchAgent: {
            title: 'Research subagent',
            body: 'A specialized agent defined in an AGENT.md file. The main agent spawns it, it does **all the noisy fetch-and-summarise work in its own context**, and returns a clean result.',
            analogy: 'The research intern: brief them on the question, they do the library run, they hand back a summary — not a pile of raw sources.',
          },
          isolation: {
            title: 'Context isolation',
            body: 'The subagent runs in a **separate context window**. Its intermediate steps and raw results never pollute the main agent context. Only the final summary crosses back.',
            analogy: 'A separate notebook the intern uses. Only the final memo lands on your desk.',
          },
        },
        faqs: [
          { q: 'How does the main agent know to spawn the research subagent?', a: 'The AGENT.md description field. When the task matches, the main agent **spawns the research subagent automatically.**' },
          { q: 'Can the research subagent call MCP tools?', a: 'Yes. **Subagents inherit the same tool access as the main agent.** A research subagent can call a search MCP, a database MCP, or any connected tool.' },
          { q: 'What if the research task is too long for one context?', a: 'The subagent can spawn sub-subagents, each handling a slice. **Delegation is composable** — the tree can go as deep as the task needs.' },
        ],
        talkingPoints: [
          [
            'The Release Notes Assistant already has a PR-gathering subagent from Module 3. Now let us build a different kind: a **research subagent** that can answer open questions about our codebase.',
            'Same principle — [[isolation|isolation]] is the point. The main agent stays clean; the research subagent does the digging.',
          ],
          [
            'The AGENT.md is a two-section file. The frontmatter describes what this subagent is for — the [[description|researchAgent]] triggers it automatically when the task matches.',
            'The body defines the research protocol: what sources to check, in what order, how to summarise. Plain English that Claude reads and executes.',
          ],
          [
            'In practice: we ask "Why is the API latency spiking?" The main agent spawns the research subagent. It reads logs, queries the metrics MCP, checks recent commits.',
            'All that noise stays in its own context. What comes back: one concise summary, two probable causes, one recommendation.',
            '**The main agent never saw the raw data.** It got the answer. That is why isolation is the whole point.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Real-world · Subagents', text: 'A research subagent fetches and summarises so the main agent stays focused', question: 'How do we delegate research without bloating context?' },
          { kind: 'prose', size: 'lg', md: 'Define the [[research subagent|researchAgent]] in an AGENT.md. The main agent spawns it when the task matches; the subagent works in its own [[isolated context|isolation]]; only the clean summary returns.' },
          { kind: 'diagram', diagramId: 'subagent-isolation', caption: 'Main agent dispatches → subagent works in isolation → clean summary returns' },
          { kind: 'code', lang: 'md', filename: '.claude/agents/research.md', code: `---
name: Research Agent
description: When asked to investigate a technical question, find root causes, or summarise multiple sources.
---

## Research protocol

1. Check recent commits and PRs related to the question
2. Read relevant log files or metrics (use MCP tools if available)
3. Search the codebase for related code paths
4. Summarise: probable cause, evidence, recommended next step

Return a concise memo: 3-5 sentences max. Do not include raw data.` },
        ],
      },
    ],
  },
  'agent-sdk-intro': {
    id: 'agent-sdk-intro',
    title: 'The Agent SDK',
    blurb: 'The same loop, programmatic.',
    slides: [
      {
        id: 'sdk-1',
        layout: 'center',
        steps: 2,
        estMinutes: 2,
        background: 'default',
        details: {
          sdk: {
            title: 'Agent SDK',
            body: 'A TypeScript/Python library that lets you **run the agentic loop in your own code** — same observe → think → act cycle, exposed as a programmable API.',
            analogy: "If Claude Code is the finished appliance, the SDK is the same motor you wire into whatever you're building.",
            source: { label: 'Agent SDK docs', href: 'https://code.claude.com/docs/sdk' },
          },
          whenSdk: {
            title: 'Claude Code vs the SDK',
            body: '**Claude Code** is for interactive development — you and Claude, pair-programming in a terminal. **The Agent SDK** is for production pipelines — the same loop embedded inside CI, bots, or custom tooling.',
            analogy: 'Claude Code is the finished appliance. The SDK is the engine you pull out and wire into your own product.',
          },
        },
        faqs: [
          { q: 'Does the SDK run a different model?', a: 'No — **same Claude, same capabilities.** The SDK just exposes the loop as code you control.' },
          { q: 'When would I use the SDK instead of just running Claude Code?', a: 'When the loop needs to live **inside another product** — a CI pipeline, a Slack bot, a custom tool. **Claude Code is the stand-alone tool; the SDK is the programmable engine.**' },
          { q: 'Do I need to know TypeScript or Python?', a: 'One or the other, yes. The SDK is a library, not a CLI. **If you want point-and-shoot, Claude Code is the right tool.**' },
        ],
        talkingPoints: [
          [
            'We have spent this whole session inside the loop — observe, think, act. Here is a question worth asking: what if we want the loop to run inside our own software, not just from a terminal?',
            'That is what the [[Agent SDK|sdk]] is. Same loop. Same Claude. But instead of a human at the keyboard, our code triggers it.',
            'Think of it this way: Claude Code is the finished appliance. The SDK is the engine we can pull out and wire into a CI pipeline, a Slack bot, a custom internal tool.',
          ],
          [
            'When would we reach for the SDK instead of Claude Code? [[Same loop, different context|whenSdk]]: **Claude Code is for interactive dev; the SDK is for production pipelines.**',
            'A CI step that reviews every PR automatically. A webhook that answers codebase questions on Slack. A nightly script that drafts release notes without anyone sitting at a keyboard.',
            'Everything we learned today — the loop, the skills, the subagents — is the foundation. **The SDK is the deployment option that takes it to production.**',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Real-world · Agent SDK', text: 'The Agent SDK puts the same loop inside your own application code', question: 'How do I run the Claude loop in production?' },
          { kind: 'prose', size: 'lg', md: 'The [[Agent SDK|sdk]] lets your code trigger the same observe → think → act loop Claude Code uses — **no human at the keyboard required.**' },
          { kind: 'diagram', diagramId: 'sdk-vs-interactive', caption: 'Claude Code: interactive dev · Agent SDK: production pipeline' },
        ],
      },
      {
        id: 'sdk-1b',
        layout: 'center',
        steps: 1,
        estMinutes: 2,
        background: 'default',
        details: {
          loop: {
            title: 'The same reasoning loop',
            body: 'Every Claude Code session runs a think → act → observe loop. The Agent SDK exposes that exact loop as a programmable API — same intelligence, triggered by code instead of a person.',
            analogy: 'Like putting a capable chef on-call: before, you had to walk in and order; now your app can ring the kitchen directly.',
          },
        },
        faqs: [
          {
            q: 'Why would I use the Agent SDK instead of just prompting Claude Code myself?',
            a: 'Because **it lets your app trigger the same reasoning loop automatically, at any hour, without you being there**. Claude Code is for you at a keyboard; the SDK is for your software at runtime.',
          },
          {
            q: 'How is this different from calling the Claude API directly?',
            a: 'A raw API call is one round-trip — one prompt, one completion. The Agent SDK gives you the full loop: the agent can call tools, observe results, and keep going until the task is done. **The difference is who starts the loop** — the SDK hands that trigger to your application code.',
          },
          {
            q: 'Can I run more than one agent at a time?',
            a: 'Yes — **your app can kick off hundreds of agent runs in parallel, each one doing real work, without a person watching**. That\'s the production superpower: the same loop that you run once in a terminal, your app can run at scale.',
          },
        ],
        talkingPoints: [[
          'We\'ve seen the loop run in a terminal, with us watching. The Agent SDK is how we hand that loop to our software.',
          'Same intelligence, same tool-calling, same reasoning — but now our application can trigger it, not just us.',
          'Think of it as putting the chef on speed-dial. Before, we had to walk in and order. Now our app can ring the kitchen directly, any time, at any scale.',
        ]],
        blocks: [
          { kind: 'heading', eyebrow: 'Real-world', question: 'How does the SDK hand the loop to my code?', text: 'The Agent SDK puts the same loop in your application\'s hands' },
          { kind: 'prose', size: 'lg', md: 'Claude Code runs a think → act → observe [[loop|loop]]. The Agent SDK lets your software trigger that exact loop — same intelligence, no human at the keyboard required.' },
          { kind: 'diagram', diagramId: 'sdk-vs-interactive', params: { label: 'sdk-vs-interactive' } },
        ],
      },
      {
        id: 'sdk-2',
        layout: 'center',
        steps: 1,
        estMinutes: 2,
        background: 'default',
        details: {
          recap: {
            title: 'What we built today',
            body: 'Starting from a blank terminal: a CLAUDE.md, a Skill, a subagent, a hook, MCP tools, settings, and the Agent SDK loop. **Every piece connects back to the Release Notes Assistant.**',
          },
        },
        faqs: [
          { q: 'What is the single most important thing to take away?', a: 'The loop: observe, think, act, repeat. **Everything else — skills, subagents, hooks, MCP — is just a way to extend that loop.**' },
          { q: 'Where do I start on my own project?', a: 'Start with a CLAUDE.md. **Five minutes of standing instructions pays off immediately** — no re-explaining, no format surprises.' },
          { q: 'How do I keep learning after today?', a: '**This deck is the reference.** Each slide is one self-contained idea, revisitable in under two minutes. Come back when you hit a question.' },
        ],
        talkingPoints: [
          [
            'We started this session not knowing what Claude Code was. Let us say out loud what we now know.',
            'We know the [[agentic loop|recap]]: observe, think, act, repeat. Every skill, subagent, hook, MCP tool, and SDK call is just a way to extend that loop.',
            'We built the Release Notes Assistant piece by piece: its CLAUDE.md, its release-notes skill, its PR-gathering subagent, its lifecycle hook, and the SDK loop that runs it all as a pipeline.',
            'The same building blocks — agent, skill, subagent, the loop — are everything we need to build whatever comes next.',
          ],
        ],
        blocks: [
          { kind: 'heading', eyebrow: 'Wrap-up', text: 'You now have the full loop — and the vocabulary to grow it', question: 'What do I take away from today?' },
          { kind: 'prose', size: 'lg', md: 'The [[agentic loop|recap]] is the frame. Skills, subagents, hooks, MCP, and the SDK are how we extend it. Everything we built today plugs into that one idea.' },
          { kind: 'image', src: 'release-notes-assistant', size: 'sm', alt: 'Messy pile of merged pull-request cards flowing through the assistant robot and out as one clean changelog', caption: 'The Release Notes Assistant: CLAUDE.md + Skill + Subagent, end to end' },
          {
            kind: 'tiles',
            columns: 3,
            tiles: [
              { title: 'The loop', icon: '🔁', tone: 'muted', body: 'Observe, think, act. **Every capability extends this.**' },
              { title: 'The tools', icon: '🧰', tone: 'muted', body: 'Skills, subagents, hooks, MCP. **Each adds one kind of capability.**' },
              { title: 'The project', icon: '📄', tone: 'accent', body: 'Release Notes Assistant. **One tool, grown one module at a time.**' },
            ],
          },
        ],
      },
    ],
  },
};
