
import { ThemeProvider } from './contexts/ThemeContext';
import { TutorialProvider, useTutorial } from './contexts/TutorialContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import TutorialStep from './components/TutorialStep';
import AppIcon from './components/AppIcon';
import ThemeToggle from './components/ThemeToggle';
import { StartCard } from './components/StartCard';
import { CompletionCard } from './components/CompletionCard';

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
              <AppIcon className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-700 ease-out hover:scale-110 hover:rotate-12" />
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
