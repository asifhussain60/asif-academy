import type { ImageManifest } from '@/engine/types';

/**
 * Curated, build-time image manifest for the Claude Code tutorial.
 * "Only when needed, no sprawl" — list an image here only when a slide truly earns one.
 *
 * Two kinds of image (see `ImageKind`):
 *  - 'opener'   — a mood / section illustration (the hero). Aesthetic; exempt from teaching.
 *  - 'teaching' — an in-content comic that must make ONE idea click. Carries a `teaches` target,
 *                 authored by the `teaching-illustration` skill; rendered in the bold cartoon
 *                 preset by the `gemini-image` skill into ./assets/<id>.png. Until the asset
 *                 exists, the ImageBlock renders a labeled placeholder, so a slide is
 *                 layout-complete before art lands.
 */
export const images: ImageManifest = [
  // ── Opener (mood; not a teaching panel) ───────────────────────────────────
  {
    id: 'welcome-hero',
    kind: 'opener',
    aspect: '16:9',
    prompt:
      'a warm, inviting hero scene of a friendly terminal window on a wooden desk that has gently come to life as a helpful coding companion — a soft glowing prompt cursor like a calm face, a mug and a small plant beside it, cozy late-evening workshop mood, shallow depth of field, generous empty space on the left for a title, no text',
    alt: 'A friendly terminal acting as a helpful coding assistant',
  },

  // ── Teaching comics (each lands one idea) ─────────────────────────────────
  {
    id: 'what-is-cc',
    kind: 'teaching',
    aspect: '4:3',
    teaches: 'An agent ACTS on your real project (reads, edits, runs); a chatbot just hands back one reply and stops.',
    prompt:
      'a two-panel "this, not that" comic strip with a clear vertical divider. LEFT panel labelled by mood as the weaker option: a plain vending machine dispensing one single flat answer-card into the hands of a slightly disappointed person, then nothing more — a dead end. RIGHT panel as the better option: a cheerful many-handed worker robot actively DOING things to a real project at once — one hand reading an open file, one hand editing code with a pencil, one hand pulling a lever that runs a command (little gear and checkmark popping up) — busy, capable, in a loop. Exaggerated friendly expressions, bold clean outlines, the right panel clearly more alive and active than the left',
    alt: 'Two panels: a vending machine handing back one answer, versus a busy many-handed robot reading, editing, and running a real project',
  },
  {
    id: 'building-blocks-kitchen',
    kind: 'teaching',
    aspect: '16:9',
    teaches: 'An agent does the work; a skill is knowledge it consults (never acts); a subagent is a helper agent sent off to its own station and brings back just the result.',
    prompt:
      'a friendly three-panel comic strip, each panel with a speech bubble and a bold label at the bottom. LEFT PANEL labelled "Agent" at bottom: a cheerful blocky chef robot wearing a tall hat, standing at a stove actively stirring a pot — busy and purposeful — speech bubble above says "I do the actual cooking. Read, chop, taste, fix." MIDDLE PANEL labelled "Skill" at bottom: a recipe card pinned to a corkboard, no robot, just the card with lines of text on it — slightly tilted, static, clearly not doing anything — speech bubble says "I don\'t cook. I just hold the recipe." RIGHT PANEL labelled "Subagent" at bottom: a smaller blocky robot helper at its OWN separate cutting board, not at the main stove, holding a little result bowl confidently — speech bubble says "On it, Chef. I\'ll prep and bring back just the bowl." Bold cartoon outlines, warm clay and amber tones, each panel in a rounded card with a coral border, same visual style as the agent mascot',
    alt: 'Three-panel kitchen comic: the agent chef cooks, the skill is a pinned recipe card, and the subagent is a prep cook at a separate station who brings back the finished bowl',
  },
  // ── Module 2 · Skills ─────────────────────────────────────────────────────
  {
    id: 'skill-as-recipe',
    kind: 'teaching',
    aspect: '16:9',
    teaches: 'A Skill is a recipe card the agent consults only when cooking that specific dish — it knows every card is there each session, but only reads the one that matches the current task.',
    prompt:
      'a two-panel comic strip with a clear left-to-right narrative. LEFT PANEL labelled "Every session" at the bottom: a cheerful blocky chef robot in its kitchen casting a quick glance at a corkboard on the wall covered in many recipe cards — each card shows only a short title label ("Release Notes", "Code Review", "Deploy Checklist"). The robot scans them casually without stopping, not opening any card, going about normal work. RIGHT PANEL labelled "When the task matches" at the bottom: the same chef robot is actively cooking, and has now plucked ONE specific recipe card off the corkboard and holds it fully open, reading the detailed instructions intently. That one card is visually highlighted — slightly larger, a warm glow — while the others stay on the corkboard in the background. The contrast: casual daily scan on the left, focused single-card reading on the right. Bold cartoon outlines, warm clay and amber tones, matching the existing kitchen comic style.',
    alt: 'Two panels: chef robot glancing at all recipe cards on a corkboard every session vs. reading one specific card fully open when cooking that dish',
  },

  // ── Module 3 · Subagents ──────────────────────────────────────────────────
  {
    id: 'subagent-at-work',
    kind: 'teaching',
    aspect: '16:9',
    teaches: 'A subagent does all the noisy intermediate work in its own isolated space, then returns only a clean summary — the main agent never leaves its workstation or sees the mess.',
    prompt:
      'a left-to-right three-beat comic strip inside a single wide panel. BEAT 1 (left third): a main chef robot at a busy stove with pots and pans, clearly occupied — says in a speech bubble "Fetch all the PRs for this week." A smaller eager runner robot with a blank notepad stands ready beside it. BEAT 2 (center third): the runner robot is off in its own separate corner of the kitchen, surrounded by messy intermediate work — small stacks of paper, cards, API result scraps. The runner scribbles furiously on its notepad. The main chef in the background continues calmly cooking, uninterrupted and unaware of the mess. BEAT 3 (right third): the runner robot returns to the main chef and hands over a single neat folded note card. The runner says in a speech bubble "40 PRs, sorted, ready." The main chef looks pleased and focused. Bold cartoon outlines, warm clay and amber tones, matching the existing kitchen comic style.',
    alt: 'Three-beat comic: main chef dispatches a runner; runner does messy PR-fetching work in its own corner; runner returns with one clean summary card',
  },

  {
    id: 'release-notes-assistant',
    kind: 'teaching',
    aspect: '16:9',
    teaches: 'The Release Notes Assistant turns many messy merged pull requests into one clean, readable changelog.',
    prompt:
      'a left-to-right "input → transform → output" comic. On the LEFT, a chaotic, toppling pile of mismatched paper cards labelled only by little icons (merge arrows, bug, sparkle) — messy and overwhelming. In the CENTER, a tidy friendly mascot robot at a small workbench cheerfully feeding the cards through itself like a helpful machine. On the RIGHT, a single crisp, neatly formatted changelog document emerging clean and orderly, a small proud sparkle on it. Clear left-to-right flow arrows, bold cartoon outlines, the contrast between messy-left and tidy-right obvious at a glance',
    alt: 'A messy pile of merged pull-request cards flowing through the assistant robot and out as one clean changelog',
  },
];
