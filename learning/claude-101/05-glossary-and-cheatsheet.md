# Glossary and Feature-Selection Cheatsheet

Keep this file open in a side pane while reading Modules 1–4, or load it into
NotebookLM as a quick-reference source for quiz generation.

## Glossary

| Term | Plain-English definition |
|---|---|
| **Chat** | The default conversational surface at claude.ai — type a message, get a response, keep going. |
| **Cowork** | A more autonomous, project-oriented surface where Claude carries out multi-step work and checks in at decision points, rather than requiring a new prompt per step. |
| **Claude Code** | The command-line and IDE-integrated version of Claude, built for reading a repository, editing files, running commands, and iterating like a developer. |
| **Project** | A persistent workspace with a large context window, an uploaded knowledge base, and standing instructions that apply to every conversation inside it. |
| **Artifact** | A single piece of generated content (document, code, app, diagram) that gets its own pane instead of staying buried in chat history. |
| **Skill** | A packaged, reusable procedure (instructions + optional scripts/references/templates) that Claude loads automatically when relevant. |
| **Progressive disclosure** | The design principle behind Skills — Claude sees short descriptions of all available Skills first, and only loads a Skill's full instructions once it decides that Skill is relevant. |
| **Connector** | A live link between Claude and an external tool (CRM, ticketing system, cloud storage) so Claude can pull in current data rather than relying only on what you paste in. |
| **Enterprise Search** | A feature that treats all of a company's connected tools as one searchable knowledge base — one query fans out across chat, email, storage, wikis, and more, then synthesizes a single sourced answer. |
| **Research mode** | A deep, multi-source investigation mode for practical planning tasks, available on paid Claude plans. |
| **Context window** | The amount of text (conversation, documents, instructions) Claude can hold in view at once. A Project's context window is roughly a 500-page book. |

## Feature-selection cheatsheet

| If your task is… | Reach for… |
|---|---|
| A one-off question or quick request | **Chat** |
| Multi-step work you want Claude to plan and largely run itself | **Cowork** |
| Anything touching a real codebase | **Claude Code** |
| Recurring work with a stable set of reference material | **Project** |
| A specific document/code/app you'd otherwise copy out of the chat | **Artifact** |
| The exact same procedure done repeatedly, and you want consistency | **Skill** |
| Pulling current data from a tool you already use (CRM, storage, wiki) | **Connector** |
| One question whose answer is scattered across many company tools | **Enterprise Search** |
| A deep, multi-source investigation before a decision | **Research mode** |

## Reflection / practice prompts

- Cover the right-hand column and try to answer each row from memory — then check yourself.
- Pick three terms from the glossary and explain each to a colleague in one sentence, without using any other term from this table.
