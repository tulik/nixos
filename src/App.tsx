
import { ArrowRight, RotateCcw } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { TutorialProvider, useTutorial } from './contexts/TutorialContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import TutorialStep from './components/TutorialStep';
import NixOSIcon from './components/NixOSIcon';
import ThemeToggle from './components/ThemeToggle';
import { tutorialSteps, tutorialIntro, tutorialOutro } from './data/tutorialSteps';
import { conceptIconMap, fallbackConceptIcon } from './constants/conceptIcons';

function StepNavigator() {
  const { currentStepIndex, goToStep } = useTutorial();

  return (
    <div className="flex flex-col items-center gap-3 mb-8">
      <div className="flex justify-center gap-2 flex-wrap">
        {tutorialSteps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => goToStep(index)}
            className={`group relative h-2 rounded-full transition-all duration-500 ease-out ${index === currentStepIndex
              ? 'w-12 bg-brand-blue shadow-lg shadow-brand-blue/30'
              : 'w-2 bg-surface-hover hover:bg-brand-light hover:w-3'
              }`}
            aria-label={`Go to step ${index + 1}: ${step.title}`}
            title={step.title}
          >
            <span className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium text-white bg-brand-dark/95 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-20 shadow-lg">
              {step.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StartCard({ onStart, totalSteps }: { onStart: () => void; totalSteps: number }) {
  const IntroIcon = tutorialIntro.concept?.icon
    ? conceptIconMap[tutorialIntro.concept.icon] ?? fallbackConceptIcon
    : fallbackConceptIcon;

  return (
    <div className="premium-card p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-brand-blue/6 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue/80">Start</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">{tutorialIntro.title}</h2>
        </div>
        <div className="px-3 py-1 rounded-full bg-surface text-text-secondary text-sm font-semibold border border-border/70 shadow-sm">
          {totalSteps} steps
        </div>
      </div>

      <p className="text-text-secondary text-base md:text-lg leading-relaxed whitespace-pre-line mb-8">
        {tutorialIntro.description}
      </p>

      {tutorialIntro.concept && (
        <div className="glass-card p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-brand-blue/8 rounded-full blur-2xl" aria-hidden="true" />

          <div className="flex items-center gap-3 mb-3 relative">
            <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue" aria-hidden="true">
              <IntroIcon className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-brand-blue tracking-tight">Unix Concept: {tutorialIntro.concept.title}</span>
          </div>
          <p className="text-text-secondary leading-relaxed relative">{tutorialIntro.concept.text}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-4 border-t border-border/60">
        <p className="text-text-secondary text-sm md:text-base">
          Follow focused steps with short breaks to install Nix manually and understand each moving part.
        </p>
        <button
          className="gradient-primary flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base shadow-lg"
          onClick={onStart}
          aria-label="Begin"
        >
          Begin
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function CompletionCard({ onRestart }: { onRestart: () => void }) {
  const OutroIcon = tutorialOutro.concept?.icon
    ? conceptIconMap[tutorialOutro.concept.icon] ?? fallbackConceptIcon
    : fallbackConceptIcon;

  return (
    <div className="premium-card p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-brand-blue/6 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue/80">Finish</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">{tutorialOutro.title}</h2>
        </div>
        <div className="px-3 py-1 rounded-full bg-surface text-text-secondary text-sm font-semibold border border-border/70 shadow-sm">
          Completed
        </div>
      </div>

      <p className="text-text-secondary text-base md:text-lg leading-relaxed whitespace-pre-line mb-8">
        {tutorialOutro.description}
      </p>

      {tutorialOutro.concept && (
        <div className="glass-card p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-brand-blue/8 rounded-full blur-2xl" aria-hidden="true" />

          <div className="flex items-center gap-3 mb-3 relative">
            <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue" aria-hidden="true">
              <OutroIcon className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-brand-blue tracking-tight">Unix Concept: {tutorialOutro.concept.title}</span>
          </div>
          <p className="text-text-secondary leading-relaxed relative">{tutorialOutro.concept.text}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-border/60">
        <p className="text-text-secondary text-sm md:text-base">
          Verify with <code className="px-2 py-1 rounded-md border border-border bg-surface text-sm font-mono">nix --version</code> and revisit any step if something feels off.
        </p>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            className="gradient-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-base shadow-lg flex-1 md:flex-none"
            onClick={onRestart}
            aria-label="Restart tutorial"
          >
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const {
    currentStep,
    progress,
    goToNext,
    goToPrevious,
    hasNext,
    hasPrevious,
    currentStepIndex,
    totalSteps,
    isAtStart,
    isAtEnd,
    restartTutorial,
    startTutorial
  } = useTutorial();

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-blue selection:text-white transition-colors duration-300">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-surface z-50">
        <div
          className="h-full progress-bar-glow transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--brand-blue) 0%, var(--brand-accent) 50%, var(--brand-light) 100%)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 max-w-4xl flex-grow relative">
        <div className="absolute top-6 right-4 md:right-0 z-10">
          <ThemeToggle />
        </div>

        <header className="text-center mb-20 space-y-6 animate-fade-in">
          <div className="inline-block">
            <h1 className="inline-flex items-center justify-center gap-5 text-5xl md:text-7xl font-bold text-text-primary">
              <NixOSIcon className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-700 ease-out hover:scale-110 hover:rotate-12" />
              <span className="bg-gradient-to-br from-text-primary to-text-secondary bg-clip-text">Nix on macOS</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-normal leading-relaxed tracking-tight">
            A manual installation guide to understand the Unix underpinnings
          </p>
        </header>

        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {isAtStart ? (
            <StartCard onStart={startTutorial} totalSteps={totalSteps} />
          ) : isAtEnd ? (
            <CompletionCard
              onRestart={restartTutorial}
            />
          ) : (
            <>
              <StepNavigator />
              <TutorialStep
                step={currentStep}
                onNext={goToNext}
                onPrev={goToPrevious}
                isFirst={!hasPrevious}
                isLast={!hasNext}
                stepIndex={currentStepIndex}
                totalSteps={totalSteps}
              />
            </>
          )}
        </div>

        <footer className="text-center mt-24 text-text-muted text-sm">
          <p>Created for educational purposes</p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TutorialProvider>
          <AppContent />
        </TutorialProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
