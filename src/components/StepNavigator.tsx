import { useTutorial } from '../contexts/TutorialContext';
import { tutorialSteps } from '../data/tutorialSteps';

export default function StepNavigator() {
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
