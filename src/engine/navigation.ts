import type { Lesson, Module, Slide, Tutorial } from './types';

/** A resolved (module, lesson) pair in curriculum order. */
export interface LessonRef {
  moduleId: string;
  lessonId: string;
  lesson: Lesson;
  module: Module;
}

export interface Position {
  moduleId: string;
  lessonId: string;
  slideIndex: number;
}

/** Flat, curriculum-ordered list of lessons — used to cross lesson/module boundaries. */
export function lessonOrder(t: Tutorial): LessonRef[] {
  return t.modules.flatMap((module) =>
    module.lessonIds
      .map((lessonId) => {
        const lesson = t.lessons[lessonId];
        return lesson ? { moduleId: module.id, lessonId, lesson, module } : null;
      })
      .filter((x): x is LessonRef => x !== null),
  );
}

export function totalSlides(t: Tutorial): number {
  return lessonOrder(t).reduce((n, r) => n + r.lesson.slides.length, 0);
}

export function totalMinutes(t: Tutorial): number {
  return lessonOrder(t).reduce(
    (n, r) => n + r.lesson.slides.reduce((m, s) => m + (s.estMinutes ?? 0), 0),
    0,
  );
}

export function getModule(t: Tutorial, moduleId: string): Module | undefined {
  return t.modules.find((m) => m.id === moduleId);
}

export function getLessonRef(t: Tutorial, moduleId: string, lessonId: string): LessonRef | undefined {
  return lessonOrder(t).find((r) => r.moduleId === moduleId && r.lessonId === lessonId);
}

export function getSlide(t: Tutorial, pos: Position): Slide | undefined {
  return getLessonRef(t, pos.moduleId, pos.lessonId)?.lesson.slides[pos.slideIndex];
}

/** Stable key for the visited map / progress (namespaced by tutorial). */
export function slideKey(tutorialId: string, pos: Position, slideId: string): string {
  return `${tutorialId}/${pos.moduleId}/${pos.lessonId}/${slideId}`;
}

export function firstPosition(t: Tutorial): Position | null {
  const first = lessonOrder(t)[0];
  return first ? { moduleId: first.moduleId, lessonId: first.lessonId, slideIndex: 0 } : null;
}

/** Next slide across lesson/module boundaries, or null at the very end. */
export function nextSlidePosition(t: Tutorial, pos: Position): Position | null {
  const order = lessonOrder(t);
  const ref = order.find((r) => r.moduleId === pos.moduleId && r.lessonId === pos.lessonId);
  if (!ref) return null;
  if (pos.slideIndex < ref.lesson.slides.length - 1) {
    return { ...pos, slideIndex: pos.slideIndex + 1 };
  }
  const next = order[order.indexOf(ref) + 1];
  return next ? { moduleId: next.moduleId, lessonId: next.lessonId, slideIndex: 0 } : null;
}

/** Previous slide across boundaries, or null at the start. */
export function prevSlidePosition(t: Tutorial, pos: Position): Position | null {
  const order = lessonOrder(t);
  const ref = order.find((r) => r.moduleId === pos.moduleId && r.lessonId === pos.lessonId);
  if (!ref) return null;
  if (pos.slideIndex > 0) return { ...pos, slideIndex: pos.slideIndex - 1 };
  const prev = order[order.indexOf(ref) - 1];
  return prev
    ? { moduleId: prev.moduleId, lessonId: prev.lessonId, slideIndex: prev.lesson.slides.length - 1 }
    : null;
}

/** Global 1-based slide number for the footer counter. */
export function globalSlideNumber(t: Tutorial, pos: Position): number {
  let n = 0;
  for (const ref of lessonOrder(t)) {
    if (ref.moduleId === pos.moduleId && ref.lessonId === pos.lessonId) return n + pos.slideIndex + 1;
    n += ref.lesson.slides.length;
  }
  return n + 1;
}

/** Total steps a slide drives (max of its own steps and any declared by visuals). Min 1. */
export function slideStepCount(slide: Slide): number {
  return Math.max(1, slide.steps ?? 1);
}

/** One entry per slide, in curriculum order — powers the footer jump-to-slide dropdown. */
export interface SlideOutlineEntry {
  position: Position;
  globalNo: number;
  moduleTitle: string;
  /** The slide's headline (first heading block), falling back to its id. */
  label: string;
}

export function slideOutline(t: Tutorial): SlideOutlineEntry[] {
  const out: SlideOutlineEntry[] = [];
  let n = 0;
  for (const ref of lessonOrder(t)) {
    ref.lesson.slides.forEach((slide, slideIndex) => {
      n += 1;
      const heading = slide.blocks.find((b) => b.kind === 'heading');
      const label = heading && 'text' in heading ? heading.text : slide.id;
      out.push({
        position: { moduleId: ref.moduleId, lessonId: ref.lessonId, slideIndex },
        globalNo: n,
        moduleTitle: ref.module.title,
        label,
      });
    });
  }
  return out;
}
