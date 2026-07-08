# Module 2 — AI Capabilities and Limitations

## Source note

Rewritten from the real course (via your logged-in session) — 13 lessons
covering the underlying machine-side properties that the AI Fluency
Framework's 4Ds respond to. Paraphrased in my own words; credited to
Anthropic (2026), building on the AI Fluency Framework by Prof. Rick Dakan
and Prof. Joseph Feller, released under CC BY-NC-SA 4.0. The real course
frames itself as the companion to Module 1 in this tier: "the 4D Framework
teaches you how to collaborate with AI. This course teaches you how AI is
able to work with you" — read them together.

## Learning objectives

By the end of this document you should be able to describe the four core
properties that shape what generative AI can and can't do, locate a given
task on each property's capability-to-limitation continuum, and name which
product features exist specifically to push each limitation further out.

## The core idea: four properties, each a continuum

The course's central framework: generative AI has four core properties —
**Next Token Prediction, Knowledge, Working Memory, and Steerability** —
and each one is not a fixed strength or weakness but a **spectrum** running
from capability to limitation. The same underlying mechanism produces both
ends. Calibrated trust means locating a specific task on each continuum,
not granting or withholding trust wholesale. This framework is explicitly the
machine-side mirror of the 4D Framework: the 4Ds describe the human
competencies; this course describes the machine properties those
competencies are responding to.

## How AI gets its character (before the four properties)

Before covering the four properties, the course explains why a model
behaves like an "assistant" at all. Training happens in two stages:
**pretraining** (the model learns to predict what comes next across vast
amounts of text, becoming a powerful document-completer with no concept of
"helping you") and **fine-tuning** (human preference data shapes that
document-completer into something that treats your input as a request,
answers helpfully, and declines harmful asks). Fine-tuning leaves
predictable "fingerprints": a pull toward **sycophancy** (agreeing with
your framing too readily), a default toward **verbosity**, occasional
**over-caution**, and loose calibration between how confident a response
sounds and how reliable it actually is. Recognizing these fingerprints in
your own interactions is itself a skill the course has you practice.

## Property 1: Next Token Prediction

Generative AI writes answers word by word (token by token) based on
learned patterns of what tends to follow what — closer to a vastly
sophisticated autocomplete than to a search engine. That single mechanism
produces both its fluency and its hallucination.

- **Capability zone:** well-worn paths — summarizing, reformatting,
  explaining common concepts.
- **Limitation zone:** novel or sparse territory, and anywhere the task
  requires distinguishing "true" from merely "sounds true."
- **Where fabrication concentrates:** specificity — names, dates,
  statistics, citations, URLs, exact quotes. The more precise a claim, the
  more it warrants verification.
- **Product features that push the edge out:** citations and source
  grounding, uncertainty signaling, constrained generation, and
  generator-verifier patterns.
- **4D connection:** this is the foundation of Discernment — knowing an
  output was generated (not retrieved) tells you exactly what kind of
  scrutiny to apply.

## Property 2: Knowledge

What a model "knows" comes entirely from training data and is frozen at a
**knowledge cutoff** — no real-time browsing, no lived experience, by
default.

- **Capability zone:** topics that appeared frequently, recently (within
  training), and consistently in training data — mainstream subjects,
  popular languages.
- **Limitation zone:** rare, post-cutoff, niche, local, or contested
  topics.
- **Characteristic failures:** staleness (true-at-training-time isn't
  true-now), uneven coverage, inherited bias in what counts as "default,"
  and **source amnesia** — it can't actually cite where a piece of
  knowledge came from.
- **Product features that push the edge out:** web search, retrieval
  (RAG) and MCP connections to live data, tool use, and explicit
  cutoff-date disclosure.
- **4D connection:** knowledge unevenness is core to Delegation — knowing
  where the model is well-stocked versus thin tells you when to hand off,
  when to supply context yourself, and when to go elsewhere entirely.

## Property 3: Working Memory

Everything a model is attending to lives inside a fixed-size **context
window**. It can work with what's in there; it cannot attend to anything
outside it — and unlike the other three properties, this one fails as a
**cliff**, not a gradient.

- **Capability zone:** your material fits comfortably, the session is
  current, you supply the relevant context yourself.
- **Limitation zone:** very long documents or conversations, expecting
  continuity across separate sessions, burying a critical instruction in
  the middle of a long input ("lost in the middle").
- **Characteristic failures:** hard length limits with silent truncation,
  uneven attention across the window, no persistent memory between
  sessions by default, and no learning from your corrections — corrections
  only change what's in the current context, never the model itself.
- **Product features that push the edge out:** memory features that
  persist facts across sessions, compaction/summarization, Projects or
  workspaces that keep standing documents in context, Skills (which
  minimize context use until actually needed), and larger context windows.
- **4D connection:** this is what Description acts on — knowing how the
  window works tells you when to front-load context and when to start a
  fresh conversation instead of continuing a long one.

## Property 4: Steerability

The model follows your instructions the same way it does everything else —
by continuing a pattern — which makes it remarkably steerable, but leaves a
persistent gap between what you intended and what actually landed.

- **Capability zone:** short, concrete, verifiable instructions — format
  specs, length limits, an explicit role or persona.
- **Limitation zone:** long chains of reasoning, abstract or ambiguous
  asks, anything needing native numerical or logical precision.
- **Characteristic failures:** **reasoning drift** (small errors compound
  across a long chain) and **letter-over-spirit** (the instruction was
  followed literally while missing the actual intent).
- **Product features that push the edge out:** system prompts/custom
  instructions, offloading math to real code execution, visible reasoning
  (so drift is caught at step two, not at the final answer), and structured
  output modes.
- **4D connection:** steerability is what makes Description powerful *and*
  what bounds it — when an instruction is followed literally but
  uselessly, the fix is restating the goal, not repeating the instruction
  louder.

## When properties collide

The course's key diagnostic move: most real-world AI failures aren't one
property misbehaving — they're **two properties intersecting** at once.
Recognizing which two points straight to the fix:

- **Next Token Prediction + Knowledge** → hallucinated specifics (verify
  the specifics directly).
- **Working Memory + Steerability** → long-conversation drift (re-supply
  context, or start fresh rather than pushing further into a degraded
  session).

Naming the property pair at play is Discernment applied directly — you
evaluate an output better once you know what *kind* of wrong you might be
looking at.

## Putting it together

The course's closing framing: this Capabilities & Limitations framework and
the 4D Framework (Module 1 in this tier) are two halves of one system — the
four properties explain what the four human competencies are responding to.
Models will keep changing and the exact boundaries will keep shifting, but
the shape of the four properties is built to stay useful regardless.

## Reflection / practice prompts

- Pick one task you actually use Claude for. Locate it on all four
  continuums (Next Token Prediction, Knowledge, Working Memory,
  Steerability) — which property is the biggest risk for that specific
  task?
- Recall a moment an AI output disappointed or surprised you. Which one or
  two properties were most likely colliding?
- Try the "goal, not just format" habit from the Steerability section on a
  real request this week — state the actual goal alongside the format
  instruction, and compare the result to a format-only version.
- Name one standing-context habit (a Project, a saved instruction, an
  uploaded reference doc) you'll set up this week specifically to address
  a Working Memory limitation you keep hitting.
