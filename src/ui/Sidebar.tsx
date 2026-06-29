import clsx from 'clsx';
import type { Tutorial } from '@/engine/types';
import { useDeck } from '@/app/store';

export function Sidebar({
  tutorial,
  current,
  go,
  progressPct,
}: {
  tutorial: Tutorial;
  current: { moduleId: string; lessonId: string };
  go: (moduleId: string, lessonId: string) => void;
  progressPct: number;
}) {
  const open = useDeck((s) => s.sidebarOpen);
  const toggleSidebar = useDeck((s) => s.toggleSidebar);

  return (
    <aside
      className={clsx(
        'flex h-full shrink-0 flex-col border-r border-border bg-surface/60 backdrop-blur transition-all duration-300',
        open ? 'w-72' : 'w-0 overflow-hidden',
      )}
    >
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-lg leading-tight text-fg">{tutorial.title}</p>
          <button
            onClick={toggleSidebar}
            title="Collapse contents (o)"
            className="-mr-1 -mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
          >
            «
          </button>
        </div>
        {tutorial.blurb && <p className="mt-1 text-xs leading-snug text-fg-subtle">{tutorial.blurb}</p>}
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="mt-1 font-mono text-[10px] text-fg-subtle">{progressPct}% explored</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {tutorial.modules.map((m, mi) => (
          <div key={m.id} className="mb-3">
            <p className="px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
              {String(mi + 1).padStart(2, '0')} · {m.title}
            </p>
            <ul>
              {m.lessonIds.map((lid) => {
                const lesson = tutorial.lessons[lid];
                if (!lesson) return null;
                const active = current.moduleId === m.id && current.lessonId === lid;
                return (
                  <li key={lid}>
                    <button
                      onClick={() => go(m.id, lid)}
                      className={clsx(
                        'w-full rounded-md px-2.5 py-1.5 text-left text-[13px] leading-snug transition-colors',
                        active ? 'bg-accent-soft font-medium text-fg' : 'text-fg-muted hover:bg-surface-2 hover:text-fg',
                      )}
                    >
                      {lesson.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
