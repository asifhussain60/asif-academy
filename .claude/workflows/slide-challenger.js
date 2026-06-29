export const meta = {
  name: 'slide-challenger',
  description: 'Adversarial QA loop for one or more teaching slides — runs until zero critical/major defects',
  whenToUse: 'Run after authoring or editing any slide. Pass args: { slideIds: ["sk-1", "pd-1"] } to scope to specific slides, or omit args to check all Phase B slides.',
  phases: [
    { title: 'Challenge', detail: 'One adversarial agent per slide — actively tries to break it' },
    { title: 'Judge', detail: 'Verify each finding against source files; discard hallucinated evidence' },
    { title: 'Fix', detail: 'Apply minimal in-pattern fixes for every confirmed critical/major defect' },
    { title: 'Re-challenge', detail: 'Re-run adversarial checks on fixed slides to confirm clean' },
  ],
};

// ── Engine rules the challenger must know ──────────────────────────────────────
const RULES = `
## Engine rules — treat any violation as a defect

### RULE 1 · steps:N alignment (CRITICAL — has caused bugs twice)
A slide with \`steps: N\` allows step indices 0..N-1.
- Count the slide's talkingPoints arrays → must equal N exactly.
- Find the highest step index K used in the diagram (\`s >= K\`, \`s === K\`, \`show={s >= K}\`) → slide needs steps >= K+1.
- Find the widget registry entry's \`steps\` value → slide needs steps >= that value.
- If any of these three counts disagree → steps:N bug.

### RULE 2 · Tooltip format
\`[[display text|details_key]]\` — display is FIRST, key is SECOND.
Wrong order \`[[key|display]]\` will render the key as visible text.
Check every \`[[\` in: prose \`md\`, callout \`md\`, and every talkingPoints bullet string.

### RULE 3 · Image block shape
\`{ kind: 'image', src: 'image-id', alt: '...', size: 'sm|md|lg|full' }\`
The field is \`src\`, not \`imageId\`. Any use of \`imageId\` is a defect.

### RULE 4 · CodeLang
Valid: 'bash' | 'ts' | 'tsx' | 'json' | 'jsonc' | 'md' | 'yaml' | 'diff' | 'text'
'markdown' is NOT valid — must be 'md'.

### RULE 5 · talkingPoints — no stage directions
Every bullet must be read-aloud script — what the presenter says to the audience.
Stage-direction anti-patterns (ALL are defects):
- "press →", "click the tile", "advance the diagram", "step through"
- "show X", "demonstrate Y", "point to Z"
- "Start by…", "Begin with…", "Now click…"
- Any meta-reference: "on this slide", "in this diagram", "of this module"
- Any descriptive label before the sentence: "Key idea:", "Quick myth-bust:", "The punchline:"

### RULE 6 · Teaching standard
- Exactly one idea per slide (if two, it's a defect).
- Headline is a full-sentence assertion, NOT a topic label. Labels end without a verb.
- Every slide has exactly ONE focal visual: a diagram OR an image, never both, never zero.
- faqs array: exactly 3 entries, each answer has at least one **bolded** punchline.
- Content body text minimum 18px — prose blocks must use size: 'lg' or 'base'; 'sm' is only for captions.

### RULE 7 · SVG marker direction
Forward arrow (path goes left→right, markerEnd): shape \`M0,0 L7,3.5 L0,7 Z\`, refX=6.
Back arrow (path goes right→left, markerEnd): SAME shape \`M0,0 L7,3.5 L0,7 Z\`, refX=6.
orient="auto" rotates 180° on a rightward→leftward path, flipping the right-pointing shape to point left.
WRONG: using \`M7,0 L0,3.5 L7,7 Z\` with refX=1 for a back-arrow path — rotation makes it point the wrong way.

### RULE 8 · talkingPoints voice
Default voice is "we/us/let's" — not "you" (except at a power/payoff beat).
Each step must open with the audience's question (implicit or explicit), then answer it.
Steps must chain — each answer sets up the next step's question.
`;

const DEFECT_SCHEMA = {
  type: 'object',
  required: ['slideId', 'defects'],
  properties: {
    slideId: { type: 'string' },
    defects: {
      type: 'array',
      items: {
        type: 'object',
        required: ['severity', 'rule', 'description', 'evidence', 'fix'],
        properties: {
          severity: { type: 'string', enum: ['critical', 'major', 'minor'] },
          rule: { type: 'string', enum: ['steps-N', 'tooltip-format', 'image-block-shape', 'code-lang', 'stage-direction', 'teaching-standard', 'svg-marker', 'talking-points-voice', 'other'] },
          description: { type: 'string' },
          evidence: { type: 'string', description: 'Exact quoted text or code from the file that proves the defect' },
          fix: { type: 'string', description: 'Exact change required — specific enough to implement without guessing' },
        },
      },
    },
  },
};

const JUDGE_SCHEMA = {
  type: 'object',
  required: ['verified'],
  properties: {
    verified: {
      type: 'array',
      items: {
        type: 'object',
        required: ['slideId', 'rule', 'severity', 'description', 'fix', 'real'],
        properties: {
          slideId: { type: 'string' },
          rule: { type: 'string' },
          severity: { type: 'string' },
          description: { type: 'string' },
          fix: { type: 'string' },
          real: { type: 'boolean' },
          reason: { type: 'string', description: 'Why real=true or false' },
        },
      },
    },
  },
};

const FIX_SCHEMA = {
  type: 'object',
  required: ['slideId', 'rule', 'applied', 'summary'],
  properties: {
    slideId: { type: 'string' },
    rule: { type: 'string' },
    applied: { type: 'boolean' },
    summary: { type: 'string' },
    blockedReason: { type: 'string' },
  },
};

const LESSONS_PATH = '/Users/asifhussain/PROJECTS/asif-academy/src/curricula/claude-code/lessons.ts';
const DIAGRAMS_DIR = '/Users/asifhussain/PROJECTS/asif-academy/src/curricula/claude-code/diagrams/';
const WIDGETS_INDEX = '/Users/asifhussain/PROJECTS/asif-academy/src/curricula/claude-code/widgets/index.ts';
const REPO = '/Users/asifhussain/PROJECTS/asif-academy';

// Resolve which slide IDs to check
const targetIds = (args && args.slideIds && args.slideIds.length > 0) ? args.slideIds : null;

// Discover slide IDs from lessons.ts if not provided
const SLIDE_DISCOVERY_SCHEMA = {
  type: 'object',
  required: ['slides'],
  properties: {
    slides: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'title', 'steps'],
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          steps: { type: 'number' },
          diagramId: { type: 'string' },
          widgetId: { type: 'string' },
          imageId: { type: 'string' },
        },
      },
    },
  },
};

let slidesToCheck;
if (targetIds) {
  slidesToCheck = targetIds.map(id => ({ id }));
} else {
  const discovery = await agent(
    `Read ${LESSONS_PATH} and return a list of ALL slide objects (id, title, steps, and the first visual found: diagramId or widgetId or imageId). Look for all objects that have an \`id:\` field nested inside a \`slides:\` array.`,
    { label: 'discover-slides', schema: SLIDE_DISCOVERY_SCHEMA }
  );
  slidesToCheck = discovery?.slides ?? [];
}

log(`Checking ${slidesToCheck.length} slide(s): ${slidesToCheck.map(s => s.id).join(', ')}`);

// ── Loop until clean ──────────────────────────────────────────────────────────
let iteration = 0;
const MAX_ITERATIONS = 4;
let remainingSlides = slidesToCheck;
let allFixesSummary = [];

while (remainingSlides.length > 0 && iteration < MAX_ITERATIONS) {
  iteration++;
  log(`Iteration ${iteration}: challenging ${remainingSlides.length} slide(s)`);

  // Phase 1: Challenge
  phase('Challenge');
  const challengeResults = await parallel(remainingSlides.map(slide => () =>
    agent(
      `You are an adversarial QA challenger. Your ONLY job is to find REAL defects. Do not be encouraging. Do not summarize what works. Find what breaks.

Slide ID: **${slide.id}**

${RULES}

## Steps
1. Read the full slide definition from ${LESSONS_PATH} — search for \`id: '${slide.id}'\`.
2. If the slide has a diagram, read the diagram .tsx file from ${DIAGRAMS_DIR}.
3. Check the widget registry at ${WIDGETS_INDEX} for the widget's declared \`steps\` value.
4. Apply every rule above. For Rule 1 (steps:N): count talkingPoints arrays, find max diagram step index, find widget steps value — all three must agree with the slide's \`steps\` config.
5. Quote exact evidence from the file for every defect you report.

Return only real, evidenced defects. Zero defects is a valid answer.`,
      { label: `challenge-${iteration}:${slide.id}`, phase: 'Challenge', schema: DEFECT_SCHEMA }
    )
  ));

  const allReported = challengeResults.filter(Boolean).flatMap(r => r.defects);
  const actionable = allReported.filter(d => d.severity === 'critical' || d.severity === 'major');

  if (actionable.length === 0) {
    log(`Iteration ${iteration}: all ${remainingSlides.length} slides CLEAN — no critical/major defects`);
    break;
  }

  log(`Iteration ${iteration}: ${actionable.length} critical/major defects reported — judging`);

  // Phase 2: Judge
  phase('Judge');
  const judgment = await agent(
    `Judge these reported defects. Cross-check each against the actual source files. Discard any where the evidence is wrong or the defect was already fixed.

## Reported defects
${JSON.stringify(actionable, null, 2)}

## Rules to apply
${RULES}

## Files to read
- ${LESSONS_PATH} — for slide configs, talkingPoints, blocks
- ${DIAGRAMS_DIR}<diagramId>.tsx — for step indices used in SVG
- ${WIDGETS_INDEX} — for widget registry steps values

For every defect: read the file, find the quoted evidence, confirm it exists and matches the rule violation. Set real=true only if the evidence is present in the file right now.`,
    { label: `judge-${iteration}`, phase: 'Judge', schema: JUDGE_SCHEMA }
  );

  const confirmed = (judgment?.verified ?? []).filter(d => d.real && (d.severity === 'critical' || d.severity === 'major'));
  log(`Iteration ${iteration}: ${confirmed.length} confirmed real defects`);

  if (confirmed.length === 0) {
    log('Judge found no real defects — slides are clean');
    break;
  }

  // Phase 3: Fix
  phase('Fix');
  const fixResults = await parallel(confirmed.map(defect => () =>
    agent(
      `Fix this confirmed defect. Minimal change only — do not refactor surrounding code.

## Defect
Slide: ${defect.slideId}
Rule violated: ${defect.rule}
Severity: ${defect.severity}
Description: ${defect.description}
Evidence: ${defect.evidence}
Required fix: ${defect.fix}

## Constraints
- Edit ONLY the minimal lines needed.
- Never edit engine files (src/engine/, src/blocks/) or diagram primitives.
- For steps:N: change both the slide's \`steps\` field AND ensure talkingPoints array count matches.
- For tooltip format: [[display|key]] — display text first, key second.
- For image block: use \`src\` not \`imageId\`.
- After editing: run \`cd "${REPO}" && npm run typecheck 2>&1 | tail -8\` and confirm it passes.

Return JSON confirming what was changed.`,
      { label: `fix-${iteration}:${defect.slideId}:${defect.rule}`, phase: 'Fix', schema: FIX_SCHEMA }
    )
  ));

  allFixesSummary.push(...fixResults.filter(Boolean));

  // Prepare for next iteration — only re-check slides that had real defects
  const fixedSlideIds = new Set(confirmed.map(d => d.slideId));
  remainingSlides = remainingSlides.filter(s => fixedSlideIds.has(s.id));

  log(`Iteration ${iteration} complete — re-challenging ${remainingSlides.length} slide(s) next round`);
}

if (iteration >= MAX_ITERATIONS && remainingSlides.length > 0) {
  log(`WARNING: hit ${MAX_ITERATIONS}-iteration cap with ${remainingSlides.length} slides still having defects`);
}

// Final typecheck
phase('Re-challenge');
const typecheckResult = await agent(
  `Run the final typecheck and summarize Phase B slide health.

1. Run: cd "${REPO}" && npm run typecheck 2>&1
2. If errors, read the relevant files and report the exact error locations.
3. If clean, confirm: "typecheck PASS".
4. List all fixes applied in this run: ${JSON.stringify(allFixesSummary.map(f => f.slideId + ':' + f.rule), null, 2)}

Return a short summary paragraph.`,
  { label: 're-challenge-verify', phase: 'Re-challenge' }
);

return {
  iterations: iteration,
  totalFixesApplied: allFixesSummary.length,
  slidesChallenged: slidesToCheck.length,
  fixesBySlide: allFixesSummary,
  finalVerify: typecheckResult,
};
