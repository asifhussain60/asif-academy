import type { Module } from '@/engine/types';

/**
 * The curriculum spine: 7 modules, simplest → hardest, paced to a 30–50 min talk.
 * Module-level pacing budget (rough minutes; see PACING.md):
 *   1 Foundations ~17 (adds models, context window, building-blocks) · 2 Skills ~7 ·
 *   3 Subagents ~5 · 4 Extending ~8 · 5 Choosing ~3 · 6 Models ~3 (now just the
 *   choosing decision; lineup moved to Foundations) · 7 Real-world ~9   → ~52 min ceiling.
 */
export const curriculum: Module[] = [
  {
    id: '01-foundations',
    title: 'Foundations',
    blurb: 'What Claude Code is, how the agent thinks, and the core vocabulary.',
    lessonIds: [
      'welcome-showcase',
      'what-is-claude-code',
      'the-agentic-loop',
      'models-foundations',
      'context-window',
      'memory-hierarchy',
      'building-blocks',
      'slash-commands',
    ],
  },
  {
    id: '02-skills',
    title: 'Skills',
    blurb: 'Package reusable expertise the agent loads on demand.',
    lessonIds: ['skill-anatomy', 'progressive-disclosure', 'build-a-skill-lab'],
  },
  {
    id: '03-subagents',
    title: 'Subagents',
    blurb: 'Delegate work into isolated context windows.',
    lessonIds: ['why-subagents', 'context-isolation', 'subagent-config'],
  },
  {
    id: '04-extending',
    title: 'Extending Claude Code',
    blurb: 'Hooks, MCP, plan mode, settings, plugins.',
    lessonIds: ['hooks-lifecycle', 'mcp', 'plan-mode', 'settings-permissions', 'plugins'],
  },
  {
    id: '05-decision',
    title: 'Choosing the Right Tool',
    blurb: 'Skills vs Subagents vs Slash vs MCP vs Hooks.',
    lessonIds: ['the-decision-matrix'],
  },
  {
    id: '06-models',
    title: 'Models',
    blurb: 'Choosing a model per task — the cost/speed tradeoff (the lineup is taught in Foundations).',
    lessonIds: ['model-lineup', 'model-picker-lab'],
  },
  {
    id: '07-realworld',
    title: 'Real-World Builds',
    blurb: 'Two end-to-end builds, then the Agent SDK.',
    lessonIds: ['code-review-skill', 'research-subagent', 'agent-sdk-intro'],
  },
];
