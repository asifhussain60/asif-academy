# Module 2 — Building with the Claude API

## Source note

This course has 85 lessons (the largest on the platform) — going through
every one wasn't practical for this document, so this is a **deliberately
sampled subset**: 16 lessons covering the sections that add genuinely new
ground beyond what Claude Platform 101 already covers (that course already
covers API basics, the agent loop, tool use, extended thinking, built-in
tools, Skills, MCP, and context management in depth — this document
doesn't repeat those). Skipped entirely: all exercises and quizzes, the
full hands-on tool-use build sequence, the full MCP build sequence, and
the Claude Code / Computer Use setup walkthroughs. Register for the real
course for the complete 85-lesson sequence — this is a study companion
for the sections most worth knowing about first. Paraphrased in my own
words; Anthropic Academy course content, rights reserved to Anthropic.

## Learning objectives

By the end of this document you should be able to run a basic prompt-eval
loop, use XML tags to structure a complex prompt, explain the tradeoffs
of a RAG pipeline including chunking and hybrid search, send images/PDFs
with citations enabled, and choose the right workflow pattern (chaining,
routing, parallelization) versus a full agent.

## A typical prompt-evaluation workflow

Five repeatable steps, regardless of tooling: **(1) draft a prompt**, **(2)
build an eval dataset** (representative sample inputs — a handful by hand
to start, scaling to hundreds), **(3) run each through Claude**, **(4)
grade each response** (typically 1-10, either by a human or by a second
model), **(5) change the prompt and repeat**, comparing the average score
before and after. The entire value is turning "does this feel better?"
into an actual number you can compare across prompt versions — removing
guesswork from iteration rather than eliminating iteration itself.

## Structuring prompts with XML tags

When a prompt mixes instructions with a large block of data (or several
different kinds of content — code and documentation, say), Claude can
struggle to tell them apart. Wrapping each piece in **descriptive** XML
tags (`<sales_records>`, `<my_code>`, `<docs>` — not generic ones like
`<data>`) gives Claude unambiguous boundaries. The more specific the tag
name, the more clearly it signals what that section actually is; the
technique matters increasingly as prompts grow longer and mix more kinds
of content, and costs nothing to apply even on shorter prompts.

## RAG — why, and the real tradeoffs

**Retrieval Augmented Generation** exists for documents too large to fit
in a single prompt (an 800-page filing, say): instead of stuffing
everything in (hitting length limits, raising cost and latency, and
actually making Claude *less* effective on very long input), you **chunk**
the document ahead of time and, per query, retrieve only the chunks
likely to be relevant. The real cost of this approach: a chunking
preprocessing step, a search mechanism to find "relevant" chunks, and the
risk that the chunks retrieved don't carry all the context a full read
would have.

### Chunking strategies, and why the choice matters

A poor chunking strategy actively produces wrong answers — a query about
software bugs can retrieve a medical-research chunk that happens to
contain the word "bug" in an unrelated sense, purely because of how the
document was sliced. Four approaches, in increasing sophistication:

- **Size-based** — fixed-length slices with overlap between them (to
  avoid mid-sentence cuts losing context). The simplest, most reliable
  fallback — works on any content type, including code, and is often the
  actual production default *despite* not being the most "correct"
  option.
- **Structure-based** — split on a document's own real structure
  (Markdown headers, for instance). Produces the cleanest, most
  meaningful chunks, but only works when you can actually guarantee the
  document has that structure.
- **Sentence-based** — group sentences with a small overlap; a practical
  middle ground for plain-text documents without reliable structure.
- **Semantic-based** — group sentences by how related their *meaning* is
  to their neighbors. The most accurate, and the most computationally
  expensive.

The takeaway isn't "always use the fanciest one" — it's that the right
choice depends entirely on what guarantees your actual documents give you.

### Finding the relevant chunks: embeddings and hybrid search

A **text embedding** is a numeric representation of a chunk's meaning —
feed text into an embedding model, get back a list of numbers, each
roughly ranging -1 to +1. The honest caveat worth remembering: you don't
actually know what any individual number represents — it's a learned
representation, not a labeled, human-interpretable feature. (Anthropic
doesn't provide an embeddings API itself; the course uses **VoyageAI** as
the embedding provider.) **Semantic search** compares a query's embedding
against every chunk's embedding to surface conceptually related content.

Semantic search alone has a real gap: an exact-match query (an incident
ID like "INC-2023-Q4-011") can retrieve a *conceptually* related but
factually wrong chunk, because semantic search reasons about meaning, not
exact terms. **BM25** — a classic lexical search algorithm — fixes this by
tokenizing the query, weighting rare terms higher than common ones (an
incident ID scores far higher than "the"), and returning chunks
containing the highest-weighted terms. The practical answer is **hybrid
search**: run semantic and BM25 lexical search in parallel and merge the
results, so conceptual queries and exact-term lookups both work well.

## Image and PDF support

Sending an image means adding an `image` content block alongside a `text`
block in the same user message — base64-encoded or a URL, up to 100
images per request, 5MB max per image, and a token cost proportional to
pixel dimensions (`width × height / 750`). **PDF support uses almost
identical code** — swap the block `type` to `document`, the media type to
`application/pdf`, and Claude can extract text, tables, charts, and
structure all at once, not just raw text.

The same prompting discipline that improves text results applies directly
to images: a bare "how many marbles are in this image?" is unreliable;
walking Claude through an explicit **methodology** (identify and number
each one, then re-verify by counting a second way, row by row) measurably
improves accuracy — the course's real-world example is a satellite-image
fire-risk assessment broken into five explicit sub-steps (locate the
residence, measure tree overhang percentage, assess ember-catch
vulnerability, check for continuous fuel paths, assign a 1-4 rating) —
each step is one sentence in the final response, keeping the reasoning
auditable rather than a single opaque score.

## Citations — showing Claude's work

Adding `title` and `citations: {"enabled": true}` to a document block
(PDF or plain text) makes Claude's response return structured citation
data alongside the text: `cited_text` (the exact source passage),
`document_index`/`document_title` (which source, when there are several),
and page numbers (or character positions, for plain text). This turns
Claude from an opaque answer-generator into something a user can actually
verify against the real source — worth reaching for whenever users need
to check accuracy or the source material is itself authoritative enough
that traceability matters.

## Workflows versus agents — the core architectural choice

The course's framing: you've technically been building agents throughout
the course any time you handed Claude tools and let it figure out how to
use them — but **workflows** (a fixed, predetermined sequence of Claude
calls) and **agents** (a goal plus tools, with Claude improvising the
path) are a real fork, not two names for the same thing.

| | Workflows | Agents |
|---|---|---|
| Use when | You can picture the exact steps ahead of time | You genuinely don't know what task/parameters will come in |
| Accuracy | Higher — Claude focuses on one narrow subtask at a time | Lower success rate — more improvisation, more can go wrong |
| Testability | Much easier — you know every step in advance | Harder — you often don't know what path an agent will take |
| Flexibility | Constrained to the flows you designed | Handles novel situations, can ask for more input mid-task |

The course's actual recommendation, stated plainly: **default to
workflows wherever possible, and reach for an agent only when the task
genuinely can't be pinned down in advance.** Users don't care that a
system is "agentic" — they care that it works reliably, and workflows are
easier to make reliable.

## Three workflow patterns worth having memorized

- **Chaining** — break one complex task into focused sequential steps,
  each building on the last. Especially valuable for the "long prompt
  problem": a single prompt with many simultaneous constraints (no AI
  disclosure, no emojis, a specific tone) often still violates some of
  them, because Claude is juggling everything at once. A two-step chain —
  generate, then a dedicated revision pass that does nothing but check
  and fix those specific constraints — reliably outperforms trying to get
  everything right in one shot.
- **Routing** — categorize an incoming request first (a cheap
  classification call against a fixed list of categories), then send it
  to *one* specialized pipeline built for that category alone — an
  "educational" video-script prompt versus an "entertainment" one, say.
  The win is that each pipeline can be deeply optimized for its own
  narrow case without needing to also handle every other case.
- **Parallelization** — split one task into several independent
  sub-evaluations run *simultaneously*, then aggregate. The course's
  example: rather than one prompt asking Claude to weigh six material
  types at once (with the risk of Claude juggling too many criteria
  poorly), run six parallel requests — one per material, each with its
  own specialized criteria — then a final aggregation call compares all
  six results and picks. Each sub-task can be tuned, tested, and scaled
  independently of the others.
- **Evaluator-optimizer** (a workflow *shape*, seen in the image-to-CAD
  example) — a producer generates output, a separate grader checks it
  against criteria, and on failure, feedback loops back to the producer
  for another pass — repeating until the grader accepts the result.

## Reflection / practice prompts

- Pick a real document-heavy task you have. Which chunking strategy
  actually fits your documents' real structure — and would you need
  hybrid search, or is semantic search alone good enough for your query
  patterns?
- Take a real multi-constraint writing task you've given Claude before.
  Would splitting it into a chaining workflow (generate, then a dedicated
  constraint-fixing pass) have produced a more reliable result than one
  big prompt?
- For one feature you'd want to build with Claude: is it genuinely a
  workflow (you can picture every step) or does it need to be an agent
  (you can't predict the inputs)? Defend the choice using the course's own
  "users don't care that it's agentic, they want it to work reliably"
  framing.
