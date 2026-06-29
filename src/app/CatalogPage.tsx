import { Navigate, Link } from 'react-router-dom';
import { tutorials } from '@/curricula';
import type { Tutorial } from '@/engine/types';

function CurriculumCard({ tutorial }: { tutorial: Tutorial }) {
  const totalLessons = Object.keys(tutorial.lessons).length;
  return (
    <Link
      to={`/t/${tutorial.id}`}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:border-accent hover:bg-surface-2 hover:shadow-lg"
    >
      <div>
        <h2 className="font-display text-2xl font-semibold text-fg group-hover:text-accent transition-colors duration-200">
          {tutorial.title}
        </h2>
        {tutorial.blurb && (
          <p className="mt-2 text-base text-fg-muted leading-relaxed">{tutorial.blurb}</p>
        )}
      </div>
      <div className="mt-auto flex items-center gap-4 text-sm text-fg-subtle">
        <span>{tutorial.modules.length} modules</span>
        <span>·</span>
        <span>{totalLessons} lessons</span>
      </div>
    </Link>
  );
}

export function CatalogPage() {
  const all = Object.values(tutorials);

  // Single curriculum — skip the picker and go straight to the deck.
  if (all.length === 1) {
    return <Navigate to={`/t/${all[0].id}`} replace />;
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-12 text-center">
          <h1 className="font-display text-4xl font-semibold text-fg">Asif Academy</h1>
          <p className="mt-3 text-lg text-fg-muted">Choose a curriculum to begin.</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          {all.map((t) => (
            <CurriculumCard key={t.id} tutorial={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
