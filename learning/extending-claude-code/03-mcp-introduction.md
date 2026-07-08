# Module 3 — Introduction to Model Context Protocol

## Source note

Rewritten from the real course (via your logged-in session; this is a
hands-on Python course, so this document keeps the concepts and the shape
of the code without reproducing the full walkthrough). Paraphrased in my
own words; Anthropic Academy course content, rights reserved to Anthropic.

## Learning objectives

By the end of this document you should be able to explain what problem
MCP actually solves, define a tool/resource/prompt using the Python SDK's
decorator pattern, and know which of the three primitives fits a given
situation.

## The problem MCP solves

Say you're building an app where users ask Claude about their GitHub
data. GitHub's API surface is enormous — without MCP, you'd have to
write, test, and maintain your own tool schema and execution code for
every piece of that functionality yourself. MCP's actual value is
**shifting that burden**: instead of you authoring GitHub tools by hand, a
dedicated **MCP Server** for GitHub wraps that functionality and exposes
it as a standardized set of tools your application just connects to.
Anyone can author an MCP server (often the service provider itself
ships an official one).

A distinction the course flags explicitly because it's commonly confused:
**MCP is not the same thing as tool use.** Tool use is the mechanism by
which Claude calls a tool at all; MCP is about *who already built* the
tool definitions and execution code you're connecting to. With MCP,
someone else already did that implementation work — with a direct API
call, you'd be doing it yourself.

## MCP clients and the transport-agnostic connection

An **MCP client** is the bridge between your application and an MCP
server — it handles the message exchange so your app doesn't have to.
MCP is **transport-agnostic**: client and server most commonly run on the
same machine over standard input/output, but can equally communicate over
HTTP, WebSockets, or other network protocols. Two message types carry
almost everything: **ListToolsRequest/Result** ("what tools do you
provide?") and **CallToolRequest/Result** ("run this tool with these
arguments, here's what happened").

The full request flow, worth having as one mental picture: a user asks a
question → your server asks the MCP client what tools are available →
the client's `ListToolsRequest` goes to the MCP server and comes back with
a tool list → your server sends the question plus that tool list to
Claude → Claude decides to call a tool → your server asks the client to
execute it → the client's `CallToolRequest` reaches the MCP server, which
makes the real external API call → the result flows back through the
same chain to Claude → Claude answers → your server delivers that answer
to the user. Many steps, but each piece has exactly one job.

## Building a server with the Python SDK: tools

The official Python SDK (`FastMCP`) replaces hand-written JSON schemas
with decorators over ordinary Python functions:

```python
from mcp.server.fastmcp import FastMCP
mcp = FastMCP("DocumentMCP", log_level="ERROR")

@mcp.tool(
    name="read_doc_contents",
    description="Read the contents of a document and return it as a string."
)
def read_document(
    doc_id: str = Field(description="Id of the document to read")
):
    if doc_id not in docs:
        raise ValueError(f"Doc with id {doc_id} not found")
    return docs[doc_id]
```

The decorator supplies the tool's name and description; Pydantic's
`Field` descriptions on each parameter are what let the SDK auto-generate
a schema Claude can understand, with no manual JSON schema writing at
all. Ordinary Python exceptions (like the `ValueError` above) become the
tool's error-handling path.

## Testing with the built-in Inspector

Before wiring up a real client, the SDK's browser-based **Inspector**
(`mcp dev mcp_server.py`, then open the local URL it prints) lets you
**Connect**, list tools, pick one, fill in its inputs, and run it directly
— seeing both the success/failure status and the actual returned data.
State persists across calls in a session, so you can test a realistic
sequence (edit a document, then immediately read it back to confirm the
edit landed) without writing separate test scripts.

## Building the client side

In most real projects you implement *either* an MCP client or an MCP
server, not both — this course builds both so the whole loop is visible.
A client wraps the SDK's `ClientSession` (which needs careful connection
cleanup) in a simpler class exposing two core async functions:

```python
async def list_tools(self) -> list[types.Tool]:
    result = await self.session().list_tools()
    return result.tools

async def call_tool(self, tool_name: str, tool_input: dict) -> types.CallToolResult | None:
    return await self.session().call_tool(tool_name, tool_input)
```

`list_tools` surfaces what's available to send to Claude; `call_tool`
executes whichever one Claude decided to use, with the tool name and
arguments Claude supplied.

## Resources — app-controlled, read-only data

A **resource** is the MCP equivalent of a GET handler: read-only data your
*application* decides to fetch and inject, rather than something Claude
chooses to call. The course's example is a document `@mention` feature —
autocomplete needs a list of available documents, and selecting one needs
its contents *without* Claude having to spend a tool call fetching it
itself; the content gets folded straight into the prompt instead.

Two shapes: **direct resources** have a static URI (`docs://documents`,
no parameters) — good for a fixed listing; **templated resources** carry
a parameter in the URI itself (`docs://documents/{doc_id}`), which the
SDK parses and passes to your function as a keyword argument
automatically. Every resource declares a `mime_type`
(`application/json`, `text/plain`, `application/pdf`, ...) so a client
knows how to interpret whatever comes back; the SDK serializes your
return value automatically — you never hand-convert to a JSON string
yourself.

Reading one from the client side means requesting by URI and branching on
the returned MIME type:

```python
async def read_resource(self, uri: str) -> Any:
    result = await self.session().read_resource(AnyUrl(uri))
    resource = result.contents[0]
    if isinstance(resource, types.TextResourceContents):
        if resource.mimeType == "application/json":
            return json.loads(resource.text)
    return resource.text
```

The practical payoff: resource content becomes part of the *initial*
context sent to Claude, so answering a question about a mentioned
document needs no additional tool call round-trip at all.

## Prompts — pre-built, user-triggered workflows

A **prompt** is a tested, high-quality instruction template a client can
invoke instead of a user writing their own request from scratch. The
course's framing is direct: a user *could* type "reformat report.pdf in
markdown" and get an okay result, but a prompt you've specifically
crafted and evaluated for that exact task will do noticeably better and
more consistently — you're encoding expertise once so every user benefits
without needing to become a prompt-engineering expert themselves.

```python
@mcp.prompt(
    name="format",
    description="Rewrites the contents of the document in Markdown format."
)
def format_document(
    doc_id: str = Field(description="Id of the document to format")
) -> list[base.Message]:
    prompt = f"""Your goal is to reformat a document to be written with markdown syntax.
    The id of the document you need to reformat is: {doc_id}
    Add in headers, bullet points, tables, etc as necessary..."""
    return [base.UserMessage(prompt)]
```

The function returns a list of messages sent straight to Claude — it can
include multiple user *and* assistant turns for more elaborate flows, not
just a single instruction. On the client side, `list_prompts()` surfaces
what's available (typically shown as slash commands), and
`get_prompt(name, args)` fills in the template's variables from
user-supplied arguments before sending the result on to Claude.

## Choosing the right primitive

The course's own closing framework, and the cleanest way to hold all
three at once — each is controlled by a **different layer** of the stack:

| Primitive | Who controls it | Use it for |
|---|---|---|
| **Tools** | The model (Claude decides when to call one) | Giving Claude a new capability it can reach for autonomously |
| **Resources** | Your application code | Getting data into the app for UI (autocomplete) or silently enriching context |
| **Prompts** | The user (triggered directly — a slash command, a button) | A predefined, well-tested workflow the user starts on purpose |

Concretely, in Claude's own interface: the workflow buttons under the
chat input are prompts; the "Add from Google Drive" feature is resources
in action; and whenever Claude runs code or a calculation mid-conversation,
that's tools operating behind the scenes.

## Reflection / practice prompts

- Sketch a tool, a resource, and a prompt for one real external system you
  work with (a ticketing tool, an internal wiki, a database) — one of
  each, matched to the right primitive from the table above.
- Explain in one sentence, to someone who thinks "MCP is just tool use,"
  why the two are actually different things.
- If you built the document server from this course's project, what's one
  additional resource or prompt you'd add for your own real documents?
