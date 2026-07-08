# Module 3 — Expanding Claude's Reach

## Source note

Rewritten from the real, completed course content (previously this document
was built from public documentation only — now replaced with the actual
lesson material). Paraphrased; Copyright 2025 Anthropic, all rights
reserved.

## Learning objectives

By the end of this document you should understand how Claude reaches
beyond a single conversation — connecting to your other tools, searching
across your whole organization at once, and running deep multi-step
research.

## Connectors — and the protocol underneath them

A **Connector** gives Claude access to an external tool (Google Drive,
Notion, Slack, Asana, and many more), so it can search, read, and — with
permission — act on real data instead of you copy-pasting it in every
time. The course names the underlying standard directly: connectors run
on the **Model Context Protocol (MCP)** — described as "USB-C for AI," a
single open standard that lets any developer build a connector that then
works seamlessly with Claude, rather than every tool needing a bespoke
integration.

There are two kinds: **web connectors** for cloud services (set up via
claude.ai/directory — find the tool, authenticate, review and grant
permissions), and **desktop extensions**, which run locally through the
Claude Desktop app and reach local files and native applications like
Figma. Security is scoped deliberately: Claude only sees what you already
have permission to see in the connected tool, permissions can be toggled
individually, and any connection is revocable at any time.

## Enterprise Search — one question across your whole organization

**Enterprise Search** adds a dedicated "Ask [Your Org]" entry to the
sidebar — described in the course as a pre-built Project for your entire
organization, already loaded with your company's knowledge base. It's
built specifically for information-gathering (not general chat), using
instructions Anthropic configures for the purpose, and it's available on
Team/Enterprise plans once a workspace admin enables it.

Setup is two-stage: an **admin** connects at least one Documents source
(Google Drive, SharePoint) and one Chat source (Slack, Teams), names the
project, and finishes setup — after which every **user** authenticates
individually with each connected service before they can start asking
questions. A single question fans out across every connected source and
comes back as one synthesized, cited answer — Claude only shows what you
already have permission to see in the original tool, and your queries
aren't indexed or stored separately.

## Research mode — deep, multi-source investigation

**Research** turns Claude from a conversational assistant into a
systematic, agentic investigator: rather than one search, it runs many
searches that build on each other, deciding what to look into next based
on what it's already found, with **extended thinking** automatically
active to plan the approach and break the request into pieces. Most
reports finish in 5–15 minutes; more complex ones can take up to 45 —
still far faster than the hours of manual work they'd otherwise take. Every
claim comes with a citation you can check yourself.

Enable it from the `+` menu in the chat interface (web search must also be
on). The course's guidance on when to reach for Research specifically,
versus its near neighbors:

| Need | Use instead |
|---|---|
| A quick, single fact | Web search alone |
| Deep reasoning with no external information needed | Extended thinking alone |
| Answers from your org's internal knowledge specifically | Enterprise Search |
| Comprehensive, multi-source, citable synthesis | Research |

Because a Research run represents real time investment, prompt quality
matters more here than in an ordinary chat: state the goal specifically
rather than a bare topic, specify the structure you want the findings
organized around, and include real constraints (budget, timeline,
geography). You can even ask Claude to help you write a better Research
prompt before turning the feature on. With Google Workspace or similar
integrations connected, Research can also pull from your own email,
calendar, and documents alongside the open web — and can be restricted to
internal-only sources by turning web search off.

## Reflection / practice prompts

- Which of your company's tools (chat, docs, tickets, CRM) would save you
  the most time if Enterprise Search could query them together in one
  question?
- Describe a research task from the last month that took more than an
  hour of manual searching — would Research have been the better fit, or
  would a single web search actually have sufficed?
- In your own words: what's the difference between something Claude does
  through a *connector* versus something it does through *Research*?
