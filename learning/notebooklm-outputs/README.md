# NotebookLM Studio Outputs

Where downloaded Studio outputs (Slide decks, Infographics, Mind Maps,
Video Overviews, Audio Overviews, Quizzes, Flashcards) land after you
generate them in Google NotebookLM, following the curricula in
[`../curriculum/`](../curriculum/).

## Folder structure

One folder per notebook, matching the curriculum file names exactly, each
with a subfolder per output type:

```
notebooklm-outputs/
  00-fluency-foundations/
    mind-maps/
    slide-decks/
    infographics/
    video-overviews/
    audio-overviews/
    quizzes-and-flashcards/
  01-claude-core/            (same 6 subfolders)
  02-claude-code-mastery/    (same 6 subfolders)
  03-extending-claude-code/  (same 6 subfolders)
  04-platform-and-api/       (same 6 subfolders)
```

Each leaf folder currently holds only a `.gitkeep` placeholder so the
empty structure stays tracked in git — delete the `.gitkeep` once a real
file lands next to it, or just leave it; an unused `.gitkeep` next to real
files is harmless.

## Naming convention when you save a file here

Match it to the session number and output name from that notebook's
curriculum file, so it's obvious later which curriculum row a file came
from:

```
<session-number>-<short-slug>.<ext>
```

Examples, using the actual curricula:

- `notebooklm-outputs/00-fluency-foundations/mind-maps/01-whole-notebook.png`
- `notebooklm-outputs/00-fluency-foundations/slide-decks/02-the-4d-framework.pdf`
- `notebooklm-outputs/00-fluency-foundations/infographics/03-capability-limitation-continuum.png`
- `notebooklm-outputs/02-claude-code-mastery/infographics/02-hook-events-table.png`
- `notebooklm-outputs/04-platform-and-api/slide-decks/01-api-basics-and-agent-loop.pdf`

If a notebook generates more than one file for the same session and
output type (e.g., you regenerated a slide deck after adjusting the
Customise prompt), append `-v2`, `-v3`, etc., rather than overwriting —
that way a prior version is still around to compare against.

## What NOT to put here

Don't upload anything from this folder back into NotebookLM as a source —
these are downstream outputs, not source material. Source files live in
each tier's own folder (`../fluency-foundations/`, `../claude-101/`, etc.)
and are what's listed in each curriculum's table of contents.
