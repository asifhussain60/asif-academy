import clsx from 'clsx';
import type { Block, SlideCtx } from './types';
import { Heading } from '@/blocks/Heading';
import { Prose } from '@/blocks/Prose';
import { Callout } from '@/blocks/Callout';
import { CodeBlock } from '@/blocks/CodeBlock';
import { List } from '@/blocks/List';
import { Tiles } from '@/blocks/Tiles';
import { Spacer } from '@/blocks/Spacer';
import { ImageBlock } from '@/blocks/ImageBlock';
import { DiagramBlock } from '@/blocks/DiagramBlock';
import { WidgetBlock } from '@/blocks/WidgetBlock';

export function BlockRenderer({ block, ctx }: { block: Block; ctx: SlideCtx }) {
  const details = ctx.details;
  switch (block.kind) {
    case 'heading':
      return <Heading text={block.text} eyebrow={block.eyebrow} level={block.level} question={block.question} details={details} />;
    case 'prose':
      return <Prose md={block.md} size={block.size} details={details} />;
    case 'callout':
      return <Callout tone={block.tone} md={block.md} label={block.label} details={details} />;
    case 'list':
      return <List items={block.items} ordered={block.ordered} marker={block.marker} details={details} />;
    case 'tiles':
      return <Tiles tiles={block.tiles} columns={block.columns} details={details} />;
    case 'code':
      return (
        <CodeBlock
          lang={block.lang}
          code={block.code}
          filename={block.filename}
          highlight={block.highlight}
          revealSteps={block.revealSteps}
          step={ctx.step}
        />
      );
    case 'image':
      return <ImageBlock src={block.src} alt={block.alt} caption={block.caption} size={block.size} />;
    case 'diagram':
      return <DiagramBlock diagramId={block.diagramId} params={block.params} caption={block.caption} step={ctx.step} />;
    case 'widget':
      return <WidgetBlock widgetId={block.widgetId} params={block.params} ctx={ctx} />;
    case 'spacer':
      return <Spacer size={block.size} />;
    case 'two-column': {
      const [l, r] = block.ratio ?? [1, 1];
      return (
        <div
          className="grid shrink-0 items-start gap-7 md:gap-9"
          style={{ gridTemplateColumns: `minmax(0, ${l}fr) minmax(0, ${r}fr)` }}
        >
          <div className="space-y-4">
            {block.left.map((b, i) => (
              <BlockRenderer key={i} block={b} ctx={ctx} />
            ))}
          </div>
          <div className="space-y-4">
            {block.right.map((b, i) => (
              <BlockRenderer key={i} block={b} ctx={ctx} />
            ))}
          </div>
        </div>
      );
    }
    case 'custom':
      return <div className={clsx()}>{block.render(ctx)}</div>;
    default:
      return null;
  }
}
