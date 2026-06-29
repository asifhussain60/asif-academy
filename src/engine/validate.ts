import type { Block, Tutorial } from './types';
import { runtimeDiagramRegistry } from '@/diagrams/runtimeRegistry';
import { runtimeWidgetRegistry } from '@/widgets/runtimeRegistry';

/**
 * Light import-time shape check. A malformed tutorial should fail fast with a clear console
 * warning, not render a blank slide. Non-throwing (warns) so one bad reference never blanks the app.
 */
export function validateTutorial(t: Tutorial): void {
  const problems: string[] = [];

  // Image ids declared in the manifest are intentional, even if their PNG hasn't been generated
  // yet — the ImageBlock renders a placeholder until then. Only an id that's in neither the
  // assets map nor the manifest is a genuine authoring mistake.
  const manifestIds = new Set((t.images ?? []).map((img) => img.id));

  const lessonIds = new Set(Object.keys(t.lessons));
  for (const m of t.modules) {
    for (const lid of m.lessonIds) {
      if (!lessonIds.has(lid)) problems.push(`module "${m.id}" references missing lesson "${lid}"`);
    }
  }

  const walk = (blocks: Block[], where: string) => {
    for (const b of blocks) {
      if (b.kind === 'diagram' && !(b.diagramId in runtimeDiagramRegistry)) {
        problems.push(`${where}: unknown diagramId "${b.diagramId}"`);
      } else if (b.kind === 'widget' && !(b.widgetId in runtimeWidgetRegistry)) {
        problems.push(`${where}: unknown widgetId "${b.widgetId}"`);
      } else if (b.kind === 'image' && t.assets && !(b.src in t.assets)) {
        // src may be an explicit URL, a generated asset, or a manifest id pending generation.
        // Flag only bare ids that are also undeclared in the manifest — a real authoring typo.
        if (!/[./]/.test(b.src) && !manifestIds.has(b.src)) {
          problems.push(`${where}: image id "${b.src}" not in assets or images manifest`);
        }
      } else if (b.kind === 'two-column') {
        walk(b.left, where);
        walk(b.right, where);
      }
    }
  };

  // talkingPoints are a verbatim read-aloud script — never UI/stage directions. Flag the clear
  // offenders (telling the presenter to drive the deck) so a non-conforming script warns at load.
  // Conservative on purpose: only unambiguous UI directions, so it never trips a real spoken line.
  const STAGE_DIRECTION =
    /\b(press|click|tap|hit)\b[^.!?]*\b(arrow|→|key|tile|button|space\b|enter\b|next|advance)\b|\b(step|advance|scroll) (the |through )?(diagram|slide|deck|widget)\b|\bnext slide\b/i;
  const lintScript = (tp: unknown, where: string) => {
    if (tp == null) return;
    const steps = Array.isArray(tp) ? tp : [tp];
    for (const step of steps) {
      const bullets = Array.isArray(step) ? step : [step];
      for (const bullet of bullets) {
        if (typeof bullet === 'string' && STAGE_DIRECTION.test(bullet)) {
          problems.push(
            `${where}: talkingPoints reads like a stage direction ("${bullet.slice(0, 48)}…") — write what's said aloud (see the teaching-script skill)`,
          );
        }
      }
    }
  };

  for (const lesson of Object.values(t.lessons)) {
    for (const slide of lesson.slides) {
      const where = `${t.id}/${lesson.id}/${slide.id}`;
      walk(slide.blocks, where);
      lintScript(slide.talkingPoints, where);
    }
  }

  if (problems.length) {
    console.warn(`[tutorial:${t.id}] ${problems.length} issue(s):\n - ${problems.join('\n - ')}`);
  }
}
