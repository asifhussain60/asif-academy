# Voice fingerprint — presenter scripts (local to this project)

A teaching-register distillation of Asif's writing voice, brought in from the memoir project
(`PROJECTS/journal/content/babu-memoir/_system/voice-fingerprint.md`). Use it whenever writing or
editing the `talkingPoints` (the read-aloud presenter scripts) so they sound like Asif talking, not
like generated copy. The memoir file is the source of truth for the *voice*; this file adapts it to
a technical-teaching context.

## The speaker (teaching context)
Someone who has actually used the tool and is showing a room how it works. Confident, plain-spoken,
a little dry. Explains things the way you would to a smart colleague over coffee, not the way a
manual would. Never performs cleverness. The point is that the listener *gets it*, not that the
speaker sounds impressive.

## Voice rules (apply to every script)
- **First person and direct.** "We", "you", "let's". Talk to the room, not at it.
- **Short, declarative sentences.** Fragments are allowed when they land: "One word matters here.
  Agent." Vary rhythm; don't write everything the same length.
- **No em dashes.** This is a hard rule and a deliberate anti-AI tell. Restructure with commas,
  periods, or a colon. (e.g. "It isn't. It works in a loop." not "It isn't — it works in a loop.")
- **Plain English.** No corporate/AI filler: never "navigate", "unpack", "lean into", "at the end
  of the day", "it's worth noting", "in many ways", "delve", "robust", "leverage", "seamless".
- **Dry, restrained wit, well-timed.** One light touch per slide at most, and not on every slide.
  It should arrive without fanfare ("a chatbot hands you an answer and clocks out"). Never a comedy
  bit, never at the listener's expense.
- **Concrete analogies, sparingly.** "Think of it like…" with everyday images: a new teammate, a
  chess move, cooking from a recipe, sticky notes on a desk, re-reading an email before you send it.
  One strong analogy beats three weak ones.
- **Intelligent, not showy.** The weight comes from the explanation being right, not from vocabulary.
- **Earn the point.** Set up the idea, then land it. Don't announce the takeaway before the setup.

## Engaging delivery (read-aloud scripts)
The full device toolkit lives in the `teaching-script` skill; the voice-level rules are:
- **Lead with the question.** Open each step with the question the room is already thinking, let it
  sit a beat, then answer it. Don't state the conclusion before the audience feels the gap.
- **"Us", not "you".** Default to "we / us / let's" so the room rides along instead of being
  lectured. Own the pain with "we" ("we've all shipped the fix that broke two other things"). Save
  "you" for the moment of payoff, where it's a gift, not a command.
- **Free the imagination.** "Imagine if…" and concrete sensory detail ("the red CI badge," "coffee
  still hot") let people picture it themselves. One vivid image beats a paragraph of abstraction.
- **Spoken rhythm.** Rule of three, contrast ("not autopilot, a co-pilot"), and a short three-word
  sentence after a long one. End a section on a strong, forward-leaning word.

## Format notes specific to the deck
- `talkingPoints` is a bulleted, **verbatim read-aloud script** (see the `teaching-script` skill),
  never stage directions ("press the arrow"). Each step-group is what's said while that step is on
  screen.
- Keep `**bold**` only on the few key terms the presenter should hit. Bold is a teleprompter aid
  here, not prose formatting. Keep `[[label|key]]` detail links and `*italic*` emphasis where they
  already carry meaning.

## Calibration (the sound to match)
- "A chatbot hands you an answer and clocks out. An agent takes the goal and does the work."
- "It isn't. It works in a loop."
- "A chatbot reads you the recipe. An agent actually cooks dinner."
- "Dead simple, and it's what keeps the agent both persistent and well-behaved. It doesn't loop for
  the fun of it."
- "Don't bother taking notes. Honestly, automating that kind of thing is the whole reason we're here."

If a freshly written bullet doesn't sound like it belongs next to those lines, rewrite it.
