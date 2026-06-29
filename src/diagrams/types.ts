/** Every diagram is a pure function of the current slide sub-step. */
export interface DiagramProps {
  /** 0-based sub-step from slide navigation; diagrams reveal/animate against it. */
  step: number;
  /** Optional per-slide params from the diagram block. */
  params?: Record<string, unknown>;
}
