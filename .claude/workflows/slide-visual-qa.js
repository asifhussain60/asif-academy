export const meta = {
  name: 'slide-visual-qa',
  description: 'Visual QA of all slides in a teaching deck — screenshots every slide and step, flags defects holistically',
  whenToUse: 'Run after authoring or editing slides to catch visual regressions before presenting. Usage: Workflow({ name: "slide-visual-qa", args: { serverId: "<id>", slideCount: 34 } })',
  phases: [
    { title: 'QA sweep', detail: 'Navigate every slide, screenshot each step, check against 8 visual rules' },
    { title: 'Fix plan', detail: 'Compile defects by severity and generate source-level fix recommendations' },
  ],
};

/**
 * args shape (all optional):
 *   serverId    — preview server ID (run `preview_list` to find it)
 *   slideCount  — total slides in the deck (default: 34)
 *   stepsPerSlide — max steps to test per slide (default: 3)
 *   startSlide  — first slide to review (default: 1, useful for re-checking a range)
 *   endSlide    — last slide to review (default: slideCount)
 */
const serverId   = args?.serverId    ?? '5fda4164-6873-40ed-96c4-6542c0aaf89f';
const TOTAL      = args?.slideCount  ?? 34;
const STEPS_MAX  = args?.stepsPerSlide ?? 3;
const startSlide = args?.startSlide  ?? 1;
const endSlide   = args?.endSlide    ?? TOTAL;

// Navigation helpers injected into the browser each time helpers are lost
const NAV_HELPERS = `
window.__qa_goto = function(n) {
  const sel = document.querySelector('select');
  const fk = Object.keys(sel).find(k => k.startsWith('__reactFiber'));
  let fiber = sel[fk]; while (fiber) {
    if (fiber.memoizedProps?.onChange) { fiber.memoizedProps.onChange({ target: { value: String(n) } }); return 'ok'; }
    fiber = fiber.return;
  } return 'failed';
};
window.__qa_step = function() {
  const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === '→');
  return btn ? (btn.click(), 'stepped') : 'no-button';
};
'ready';
`.trim();

// The 8-rule checklist — kept here so subagents see it in their context
const QA_RULES = `
VISUAL QA RULES — apply every rule to every screenshot:

1. FRAUNCES_TITLE  [critical]  The golden italic Fraunces question title must appear at the top of
   every slide EXCEPT slide 1 (the Welcome slide). Its absence means a heading block is missing the
   question: field. Fail if: only a bold Inter heading is visible with no golden italic above it.

2. RAW_TEMPLATE    [critical]  No [[...]] literal strings may be visible anywhere in the rendered
   content. These indicate renderInline is not being called on a title or body field.

3. BOLD_TEMPLATE   [critical]  No **[[...]]** patterns visible — bold wrapping blocks the parser.
   The [[...]] inside will show literally. Fix: remove the ** wrapper.

4. PLACEHOLDER_WIDGET [major]  No "interactive widget placeholder · step N of N" text may be visible.
   This means a Phase-B stub widget is still registered as PlaceholderWidget.

5. CONTENT_OVERFLOW [major]    No card border, tile, code block, or text may be visually clipped
   by the bottom footer bar. The footer is the dark strip showing the slide number and arrow buttons.
   Fail if any content is cut off where it meets the footer.

6. EMPTY_REGION    [major]     A slide with more than ~30% blank dark space and no diagram/image
   placeholder likely has a missing image asset. Fail if a large empty area has no content.

7. SVG_OVERLAP     [major]     Diagram boxes, labels, or arrows must not collide or overlap each
   other in a way that makes text unreadable.

8. TINY_TEXT       [minor]     Body paragraph text must be visibly at least ~16–18px. Fail if
   paragraph content appears noticeably smaller than normal reading size.
`;

// ── Phase 1: QA sweep ──────────────────────────────────────────────────────
phase('QA sweep');
log(`Sweeping slides ${startSlide}–${endSlide} (${endSlide - startSlide + 1} slides)…`);

// Generate one analysis task per slide — they run sequentially inside the agent
// because the browser is shared. We use pipeline over slide numbers.
const slideNumbers = [];
for (let i = startSlide; i <= endSlide; i++) slideNumbers.push(i);

const DEFECT_SCHEMA = {
  type: 'object',
  required: ['slide', 'defects'],
  properties: {
    slide:   { type: 'number' },
    defects: {
      type: 'array',
      items: {
        type: 'object',
        required: ['step', 'rule', 'severity', 'description'],
        properties: {
          step:        { type: 'number' },
          rule:        { type: 'string' },
          severity:    { type: 'string', enum: ['critical', 'major', 'minor'] },
          description: { type: 'string' },
        },
      },
    },
  },
};

// Each slide gets its own agent that screenshots all steps and returns structured defects.
// Pipeline runs them sequentially (no browser conflicts) but overlaps analysis.
const slideResults = await pipeline(
  slideNumbers,

  // Stage 1 — screenshot and analyse one slide
  async (slideNo) => {
    const result = await agent(
      `You are a visual QA reviewer for one slide in a teaching deck.
Your job: navigate to slide ${slideNo}, screenshot it at every step, and report every visual defect.

## Preview server
Server ID: ${serverId}
Use ToolSearch with query "Claude_Preview" to load preview tools before doing anything.

## Navigation helpers
After loading preview tools, call preview_eval with this script to inject helpers:
\`\`\`
${NAV_HELPERS}
\`\`\`
If eval ever returns TypeError (helpers lost after navigation), re-inject them.

## Steps
1. Navigate: preview_eval → window.__qa_goto(${slideNo}); window.location.href
2. Screenshot step 0: call preview_screenshot
3. For each step 1..${STEPS_MAX}:
   a. preview_eval → window.__qa_step(); window.location.href
   b. If the step counter in the URL did NOT advance, stop — no more steps.
   c. preview_screenshot

## For each screenshot, apply ALL 8 rules:
${QA_RULES}

## Return your findings
Return a structured result: slide number, and an array of defects found across all steps.
Each defect must include: step number, rule ID, severity (critical/major/minor), and a one-sentence description of what you see.
If a slide has zero defects, return an empty defects array.`,
      { label: `qa-slide-${slideNo}`, phase: 'QA sweep', schema: DEFECT_SCHEMA }
    );
    if (result) log(`Slide ${slideNo}: ${result.defects.length === 0 ? '✓ clean' : `${result.defects.length} defect(s)`}`);
    return result;
  }
);

// ── Phase 2: Fix plan ──────────────────────────────────────────────────────
phase('Fix plan');

const allDefects = slideResults
  .filter(Boolean)
  .flatMap(r => r.defects.map(d => ({ slide: r.slide, ...d })));

const critical = allDefects.filter(d => d.severity === 'critical');
const major    = allDefects.filter(d => d.severity === 'major');
const minor    = allDefects.filter(d => d.severity === 'minor');

log(`Total defects: ${allDefects.length} (${critical.length} critical, ${major.length} major, ${minor.length} minor)`);

const fixPlan = await agent(
  `You are a teaching-deck QA engineer reviewing defect findings.

## Defects found
${JSON.stringify(allDefects, null, 2)}

## Source files
The slide data lives in:
- src/curricula/claude-code/lessons.ts       — slide blocks, prose text, image sizes
- src/blocks/Tiles.tsx                        — tile title rendering (pass through renderInline)
- src/blocks/Heading.tsx                      — heading component (question: prop = Fraunces title)
- src/curricula/claude-code/widgets/index.ts  — widget registry (PlaceholderWidget stubs)

## Task
For each defect group (by rule), write ONE concise fix recipe:
- Which file and what to change
- Example before/after if helpful
- Why this fixes the root cause

Group by severity. Start with critical.

Then write a 2-sentence executive summary: how many slides are clean, what the top fix priority is.`,
  { label: 'fix-plan', phase: 'Fix plan' }
);

const cleanCount = slideResults.filter(Boolean).filter(r => r.defects.length === 0).length;
const dirtySlides = slideResults.filter(Boolean).filter(r => r.defects.length > 0).map(r => r.slide);

return {
  summary: {
    slideRange: `${startSlide}–${endSlide}`,
    totalChecked: slideNumbers.length,
    cleanSlides: cleanCount,
    dirtySlides,
    defectCounts: { critical: critical.length, major: major.length, minor: minor.length },
  },
  defects: allDefects,
  fixPlan,
};
