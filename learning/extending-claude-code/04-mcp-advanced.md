# Module 4 — Model Context Protocol: Advanced Topics

## Source note

Rewritten from the real course (via your logged-in session). Paraphrased
in my own words; Anthropic Academy course content, rights reserved to
Anthropic.

## Learning objectives

By the end of this document you should be able to explain sampling,
progress/logging notifications, and roots; describe MCP's request-result
versus notification message categories; and choose between stdio and
StreamableHTTP transport for a given deployment, understanding what each
configuration flag actually costs you.

## Sampling — letting a server use Claude without its own API key

**Sampling** lets an MCP server access a language model *through the
connected client* rather than calling Claude directly itself. Concretely:
a server tool finishes some work (say, fetching several Wikipedia
articles), then asks the client "could you call Claude for me?" via a
`create_message` request; the client — which already holds the real
connection and credentials — makes the actual call and returns the
generated text.

This is a real design choice, not a workaround: it **removes the need for
the server to hold its own API key**, shifts the token cost onto whoever
is running the client (not the server operator), and is specifically what
makes **public MCP servers** viable — nobody wants to run a public server
that racks up unlimited AI spend on their own account for every stranger
who connects. On the server side, a tool calls `ctx.session.create_message(...)`
with the prompt and a system prompt; on the client side, a
`sampling_callback` receives the request, calls Claude via the Anthropic
SDK directly, and returns the result — passed in when the `ClientSession`
is constructed.

## Progress and logging notifications — cheap, high-value UX

Without any signal, a long-running tool call (a research task, a large
data transform) just looks frozen to a user — no way to tell "working" from
"broken." Two `Context` methods, available automatically inside any tool
function, fix this directly: `context.info(...)` sends a log message to
the client, and `context.report_progress(current, total)` reports
numeric progress. On the client side, a `logging_callback` and a
per-call `progress_callback` decide how to actually surface these —
printed to a terminal for a CLI, pushed via WebSockets/SSE/polling for a
web app, or driving a real progress bar in a desktop UI. Both are
**entirely optional** — implementing neither breaks nothing, they exist
purely to make a slow operation feel less like it's stalled.

## Roots — file-system access with real boundaries

**Roots** solve a concrete problem: a tool that takes a bare filename
("convert biking.mp4 to mov") has no way to find where that file actually
lives on a user's disk without either the user typing a full path every
time (bad UX) or the server having unrestricted filesystem access (a real
security risk). Roots grant access to *specific* directories only —
Claude calls `list_roots` to see what's approved, then `read_dir` within
those to actually locate the file, all invisibly to the user. Anything
outside the approved roots simply isn't reachable, so a Desktop-only root
means Documents and Downloads stay untouched regardless of what a
malformed or malicious request asks for.

One sharp implementation detail: **the SDK does not enforce this
automatically.** You're responsible for writing something like an
`is_path_allowed()` check yourself and calling it inside every tool that
touches the filesystem, before the real file operation runs — roots are a
capability the protocol enables, not a guarantee it provides for free.

## The MCP message specification, in two categories

The authoritative message list lives in the MCP specification repository
itself (written in TypeScript purely as a clear way to describe data
shapes, not because anything executes it) — separate from any particular
SDK. Every message falls into one of two categories:

- **Request-Result pairs** — always come in twos: `Call Tool
  Request`/`Result`, `List Prompts Request`/`Result`, `Read Resource
  Request`/`Result`, `Initialize Request`/`Result`.
- **Notifications** — one-way, no response expected: `Progress
  Notification`, `Logging Message Notification`, `Tool List Changed`,
  `Resource Updated`.

The detail that matters most for transport selection: **MCP is
bidirectional** — servers can send requests to clients, not only the
reverse. Sampling (`create_message`) and roots (`list_roots`) are both
server-initiated requests, which is exactly the pattern that gets
difficult once you leave the stdio transport.

## Stdio transport — the simple, bidirectional baseline

In **stdio**, the client launches the server as a subprocess and the two
talk over standard input/output — client writes to the server's stdin,
server writes to stdout, and *either side* can send a message at any
time. Every connection opens with a fixed three-message handshake:
`Initialize Request` → `Initialize Result` → `Initialized Notification`
(no response expected) — only after that can tool calls or prompt
listings happen. Stdio only works when client and server share a machine,
but it's the cleanest mental model for what "full" MCP communication looks
like, since nothing about it constrains which direction a message can
flow.

## StreamableHTTP — the same functionality, worked around HTTP's shape

Plain HTTP is built for clients to request things from servers, not the
other way — which directly threatens server-initiated messages
(sampling, roots) and notifications (progress, logging). **StreamableHTTP**
is MCP's workaround: after the same Initialize handshake (the
`Initialize Result` now carries an `mcp-session-id` header that must
accompany every subsequent request), the client opens a long-lived GET
request that becomes a **Server-Sent Events (SSE)** stream — the channel
the server actually uses to push requests and notifications back. A tool
call opens a *second*, tool-specific SSE connection that closes once that
tool's result is delivered, while the primary SSE connection stays open
indefinitely for anything server-initiated. Progress notifications route
through the primary connection; logging and tool results route through
the tool-specific one.

## The two flags that break the workaround — and why you might still want them

`stateless_http` and `json_response` (both default `False`) exist
specifically to trade functionality for scaling simplicity:

- **`stateless_http=True`** removes session tracking entirely — no
  session IDs, no GET/SSE pathway, and as a direct consequence: **no
  sampling, no progress reports, no subscriptions**. The one thing it buys
  back: no initialization handshake required, so clients can call
  directly. This becomes necessary once you're running **multiple server
  instances behind a load balancer** — without it, a POST request and its
  paired GET/SSE connection can land on *different* instances, and
  coordinating sampling or progress across separate server processes is a
  real distributed-systems problem the flag simply sidesteps by removing
  the need for it.
- **`json_response=True`** is simpler: it disables streaming on POST
  responses entirely — you get one final JSON result instead of a stream
  of intermediate SSE messages, so no progress updates or log lines
  during execution, just the finished output.

The course's practical guidance: **test with the transport you'll
actually deploy with.** An MCP server built and tested against stdio
locally can silently lose real functionality (sampling, progress,
notifications) the moment it's deployed over HTTP with either flag
enabled — catching that gap in development is far cheaper than catching
it in production.

## Choosing a transport

| Need | Choice |
|---|---|
| Local development, full functionality, simplest mental model | **Stdio** |
| Remote/public hosting, need sampling/notifications/roots | **StreamableHTTP**, both flags `False` |
| Horizontal scaling behind a load balancer | **StreamableHTTP**, `stateless_http=True` (accept the functionality loss) |
| Simple integration expecting plain JSON, no streaming needed | **StreamableHTTP**, `json_response=True` |

## Reflection / practice prompts

- If you were building a public-facing MCP server that other people's
  applications would connect to, would you reach for sampling or give the
  server its own API key — and why does the public-facing detail change
  the answer?
- Sketch the roots-boundary check you'd need for a tool that reads
  arbitrary files: what would `is_path_allowed()` actually need to verify?
- You're asked to scale an MCP server to thousands of concurrent clients
  behind a load balancer, but one of its tools depends on sampling. What's
  the real tradeoff you'd have to present, given `stateless_http` removes
  exactly that capability?
