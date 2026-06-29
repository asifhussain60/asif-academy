import { createBrowserRouter, useParams } from 'react-router-dom';
import { getTutorial } from '@/curricula';
import { DeckShell } from './DeckShell';
import { CatalogPage } from './CatalogPage';
import { PresenterWindow } from '@/presenter/PresenterWindow';
import { AdminGuard } from '@/auth/AdminGuard';

function TutorialRoute() {
  const { tutorialId } = useParams();
  const tutorial = getTutorial(tutorialId);
  if (!tutorial) return <Missing what={`tutorial "${tutorialId}"`} />;
  return <DeckShell tutorial={tutorial} />;
}

function Missing({ what }: { what: string }) {
  return (
    <div className="grid h-dvh place-items-center bg-bg text-fg">
      <div className="text-center">
        <p className="font-display text-2xl">Not found</p>
        <p className="mt-1 text-fg-subtle">No {what}.</p>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  { path: '/', element: <CatalogPage /> },
  { path: '/t/:tutorialId', element: <TutorialRoute /> },
  { path: '/t/:tutorialId/m/:moduleId/l/:lessonId/:slideIndex/:step?', element: <TutorialRoute /> },
  { path: '/present/:tutorialId', element: <AdminGuard><PresenterWindow /></AdminGuard> },
  { path: '*', element: <Missing what="page" /> },
]);
