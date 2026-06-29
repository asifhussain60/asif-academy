import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Tutorial, SlideCtx } from '@/engine/types';
import {
  firstPosition,
  getSlide,
  nextSlidePosition,
  prevSlidePosition,
  globalSlideNumber,
  totalSlides as countSlides,
  slideStepCount,
  slideOutline,
  type Position,
} from '@/engine/navigation';
import { SlideRenderer } from '@/engine/SlideRenderer';
import { TutorialProvider } from './TutorialProvider';
import { DeckControlsProvider } from './DeckControls';
import { useDeck } from './store';
import { useDeckKeyboard } from './keyboard';
import { Sidebar } from '@/ui/Sidebar';
import { Footer } from '@/ui/Footer';
import { QaPanel } from '@/ui/QaPanel';
import { TalkingPointsPanel } from '@/ui/TalkingPointsPanel';
import { broadcastPosition } from '@/presenter/usePresenterSync';

export function DeckShell({ tutorial }: { tutorial: Tutorial }) {
  const navigate = useNavigate();
  const params = useParams();
  const { theme, qaOpen, notesOpen, visited } = useDeck();
  const store = useDeck();

  const pos: Position = {
    moduleId: params.moduleId ?? '',
    lessonId: params.lessonId ?? '',
    slideIndex: Number(params.slideIndex ?? 0),
  };
  const step = Number(params.step ?? 0);
  const slide = getSlide(tutorial, pos);
  const totalSteps = slide ? slideStepCount(slide) : 1;
  const slideTotal = useMemo(() => countSlides(tutorial), [tutorial]);
  const outline = useMemo(() => slideOutline(tutorial), [tutorial]);

  const urlFor = useCallback(
    (p: Position, s: number) => `/t/${tutorial.id}/m/${p.moduleId}/l/${p.lessonId}/${p.slideIndex}/${s}`,
    [tutorial.id],
  );

  // Redirect invalid positions to the start.
  useEffect(() => {
    if (!slide) {
      const first = firstPosition(tutorial);
      if (first) navigate(urlFor(first, 0), { replace: true });
    }
  }, [slide, tutorial, navigate, urlFor]);

  // Mark visited + broadcast to the presenter window on every position/step change.
  useEffect(() => {
    if (!slide) return;
    store.markVisited(`${tutorial.id}/${pos.moduleId}/${pos.lessonId}/${slide.id}`);
    store.startTimer();
    broadcastPosition({ tutorialId: tutorial.id, ...pos, step });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorial.id, pos.moduleId, pos.lessonId, pos.slideIndex, step, slide?.id]);

  const next = useCallback(() => {
    if (!slide) return;
    if (step < totalSteps - 1) navigate(urlFor(pos, step + 1));
    else {
      const n = nextSlidePosition(tutorial, pos);
      if (n) navigate(urlFor(n, 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide, step, totalSteps, pos, tutorial, navigate, urlFor]);

  const back = useCallback(() => {
    if (step > 0) navigate(urlFor(pos, step - 1));
    else {
      const p = prevSlidePosition(tutorial, pos);
      if (p) navigate(urlFor(p, 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, pos, tutorial, navigate, urlFor]);

  const nextSlide = useCallback(() => {
    const n = nextSlidePosition(tutorial, pos);
    if (n) navigate(urlFor(n, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorial, pos, navigate, urlFor]);

  const prevSlide = useCallback(() => {
    const p = prevSlidePosition(tutorial, pos);
    if (p) navigate(urlFor(p, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorial, pos, navigate, urlFor]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };
  const openPresenter = () => {
    const w = 540;
    const h = 840;
    const left = Math.max(0, (window.screen?.availWidth ?? 1440) - w - 16);
    window.open(`/present/${tutorial.id}`, 'cc-present', `width=${w},height=${h},left=${left},top=48`);
  };

  // Lets an in-slide visual (e.g. a diagram tile) jump the slide step, which broadcasts the new
  // position to the open /present window — so clicking a tile updates the read-aloud script.
  const goToStep = (s: number) => {
    if (!slide) return;
    navigate(urlFor(pos, Math.max(0, Math.min(s, totalSteps - 1))));
  };

  useDeckKeyboard({
    next,
    back,
    nextSlide,
    prevSlide,
    toggleFullscreen,
    toggleTheme: store.toggleTheme,
    toggleSidebar: store.toggleSidebar,
    toggleQa: store.toggleQa,
    toggleNotes: store.toggleNotes,
    openPresenter,
    toggleOverlay: () => store.setQa(false),
    escape: () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else {
        store.setQa(false);
        store.setNotes(false);
      }
    },
    captureKeys: Boolean(slide?.captureKeys),
  });

  if (!slide) return null;

  const ctx: SlideCtx = { step, totalSteps, isPresenter: false, details: slide.details };

  const visitedCount = Object.keys(visited).filter((k) => k.startsWith(`${tutorial.id}/`)).length;
  const progressPct = Math.min(100, Math.round((visitedCount / slideTotal) * 100));

  return (
    <TutorialProvider tutorial={tutorial}>
      <div className="flex h-dvh w-full overflow-hidden bg-bg text-fg">
        <Sidebar
          tutorial={tutorial}
          current={{ moduleId: pos.moduleId, lessonId: pos.lessonId }}
          go={(moduleId, lessonId) => navigate(urlFor({ moduleId, lessonId, slideIndex: 0 }, 0))}
          progressPct={progressPct}
        />
        <div className="relative flex min-w-0 flex-1 flex-col">
          {!store.sidebarOpen && (
            <button
              onClick={store.toggleSidebar}
              title="Show contents (o)"
              className="absolute left-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface/80 text-fg-muted backdrop-blur transition-colors hover:border-fg-subtle hover:text-fg"
            >
              ☰
            </button>
          )}
          <main className="relative min-h-0 flex-1">
            <DeckControlsProvider value={{ goToStep }}>
              <SlideRenderer slide={slide} ctx={ctx} />
            </DeckControlsProvider>
            <QaPanel faqs={slide.faqs} open={qaOpen} />
            <TalkingPointsPanel slide={slide} open={notesOpen} step={step} onGoToStep={goToStep} />
          </main>
          <Footer
            slideNo={globalSlideNumber(tutorial, pos)}
            slideTotal={slideTotal}
            slides={outline}
            onJump={(p) => navigate(urlFor(p, 0))}
            step={step}
            totalSteps={totalSteps}
            onPrev={back}
            onNext={next}
            onToggleSidebar={store.toggleSidebar}
            onToggleTheme={store.toggleTheme}
            onToggleQa={store.toggleQa}
            onToggleNotes={store.toggleNotes}
            onFullscreen={toggleFullscreen}
            onPresent={openPresenter}
            theme={theme}
            qaOpen={qaOpen}
            notesOpen={notesOpen}
          />
        </div>
      </div>
    </TutorialProvider>
  );
}
