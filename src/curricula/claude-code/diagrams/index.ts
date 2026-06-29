import type { ComponentType } from 'react';
import type { DiagramProps } from '@/diagrams/types';
import { PlaceholderDiagram } from '@/diagrams/PlaceholderDiagram';
import { AgenticLoopDiagram } from './AgenticLoopDiagram';
import { BuildingBlocksDiagram } from './BuildingBlocksDiagram';
import { ContextStackDiagram } from './ContextStackDiagram';
import { ContextWindowDiagram } from './ContextWindowDiagram';
import { LlmVsModelDiagram } from './LlmVsModelDiagram';
import { LoopControlFlowDiagram } from './LoopControlFlowDiagram';
import { MemoryHierarchyDiagram } from './MemoryHierarchyDiagram';
import { ModelLineupDiagram } from './ModelLineupDiagram';
import { SkillAnatomyDiagram } from './SkillAnatomyDiagram';
import { AgentMdFieldsDiagram } from './AgentMdFieldsDiagram';
import { SubagentIsolationDiagram } from './SubagentIsolationDiagram';
import { PlanModeFlowDiagram } from './PlanModeFlowDiagram';
import { AssistantPipelineDiagram } from './AssistantPipelineDiagram';
import { SkillTriggerDiagram } from './SkillTriggerDiagram';
import { SdkVsInteractiveDiagram } from './SdkVsInteractiveDiagram';
import { PermissionModesDiagram } from './PermissionModesDiagram';
import { SettingsScopeDiagram } from './SettingsScopeDiagram';

/**
 * Diagram components owned by the claude-code tutorial. Registered into the runtime registry at
 * startup via `Tutorial.diagrams` — no engine folder edits needed to add a new tutorial.
 */
export const claudeCodeDiagrams: Record<string, ComponentType<DiagramProps>> = {
  'agentic-loop': AgenticLoopDiagram,
  'loop-control-flow': LoopControlFlowDiagram,
  'context-stack': ContextStackDiagram,
  'memory-hierarchy': MemoryHierarchyDiagram,
  'llm-vs-model': LlmVsModelDiagram,
  'model-lineup': ModelLineupDiagram,
  'building-blocks': BuildingBlocksDiagram,
  'context-window': ContextWindowDiagram,
  'skill-anatomy': SkillAnatomyDiagram,
  'agent-md-fields': AgentMdFieldsDiagram,
  'subagent-isolation': SubagentIsolationDiagram,
  'plan-mode-flow': PlanModeFlowDiagram,
  'assistant-pipeline': AssistantPipelineDiagram,
  'skill-trigger': SkillTriggerDiagram,
  'sdk-vs-interactive': SdkVsInteractiveDiagram,
  'permission-modes': PermissionModesDiagram,
  'settings-scope': SettingsScopeDiagram,
  // Phase C stubs
  'decision-matrix': PlaceholderDiagram,
  'mcp-client-server': PlaceholderDiagram,
};
