import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { TutorialContextValue, TutorialPhase } from '../types';
import { tutorialSteps } from '../data/tutorialSteps';

const TutorialContext = createContext<TutorialContextValue | undefined>(undefined);

const STORAGE_KEY = 'react-app-tutorial-progress';
const DEFAULT_PHASE: TutorialPhase = 'start';

type StoredProgress = {
    phase: TutorialPhase;
    stepIndex: number;
};

const clampIndex = (index: number) => Math.min(Math.max(index, 0), tutorialSteps.length - 1);

export function TutorialProvider({ children }: { children: ReactNode }) {
    const loadStoredProgress = (): StoredProgress => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return { phase: DEFAULT_PHASE, stepIndex: 0 };

            // Prefer structured storage; support legacy number-only value
            const parsed = JSON.parse(raw) as Partial<StoredProgress>;
            if (
                parsed &&
                typeof parsed === 'object' &&
                (parsed.phase === 'start' || parsed.phase === 'steps' || parsed.phase === 'end') &&
                typeof parsed.stepIndex === 'number'
            ) {
                return {
                    phase: parsed.phase,
                    stepIndex: clampIndex(parsed.stepIndex),
                };
            }

            const legacyIndex = parseInt(raw, 10);
            if (!isNaN(legacyIndex) && legacyIndex >= 0 && legacyIndex < tutorialSteps.length) {
                return { phase: 'steps', stepIndex: legacyIndex };
            }
        } catch (error) {
            console.error('Failed to load tutorial progress:', error);
        }
        return { phase: DEFAULT_PHASE, stepIndex: 0 };
    };

    const [state, setState] = useState<StoredProgress>(() => loadStoredProgress());

    // Save to localStorage whenever state changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Failed to save tutorial progress:', error);
        }
    }, [state]);

    const { phase } = state;
    const currentStepIndex = clampIndex(state.stepIndex);
    const currentStep = tutorialSteps[currentStepIndex];
    const totalSteps = tutorialSteps.length;
    const progress =
        phase === 'start'
            ? 0
            : phase === 'end'
                ? 100
                : ((currentStepIndex + 1) / totalSteps) * 100;
    const hasNext = phase === 'steps' && currentStepIndex < totalSteps - 1;
    const hasPrevious = phase === 'steps' && currentStepIndex > 0;
    const isAtStart = phase === 'start';
    const isAtEnd = phase === 'end';

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const startTutorial = () => {
        setState({ phase: 'steps', stepIndex: 0 });
        scrollToTop();
    };

    const restartTutorial = () => {
        setState({ phase: DEFAULT_PHASE, stepIndex: 0 });
        scrollToTop();
    };

    const goToNext = () => {
        if (isAtStart) {
            startTutorial();
            return;
        }
        if (hasNext) {
            setState((prev) => ({
                phase: 'steps',
                stepIndex: clampIndex(prev.stepIndex + 1),
            }));
        } else {
            setState((prev) => ({
                phase: 'end',
                stepIndex: clampIndex(prev.stepIndex),
            }));
        }
        scrollToTop();
    };

    const goToPrevious = () => {
        if (isAtStart) return;

        if (currentStepIndex > 0) {
            setState((prev) => ({
                phase: 'steps',
                stepIndex: clampIndex(prev.stepIndex - 1),
            }));
        } else {
            restartTutorial();
        }
        scrollToTop();
    };

    const goToStep = (index: number) => {
        if (index >= 0 && index < totalSteps) {
            setState({ phase: 'steps', stepIndex: clampIndex(index) });
            scrollToTop();
        }
    };

    const value: TutorialContextValue = {
        currentStepIndex,
        totalSteps,
        currentStep: currentStep!,
        progress,
        isAtStart,
        isAtEnd,
        phase,
        goToNext,
        goToPrevious,
        goToStep,
        restartTutorial,
        startTutorial,
        hasNext,
        hasPrevious,
    };

    return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
}

/**
 * Hook to access tutorial context
 * @throws {Error} If used outside TutorialProvider
 */
export function useTutorial(): TutorialContextValue {
    const context = useContext(TutorialContext);
    if (context === undefined) {
        throw new Error('useTutorial must be used within a TutorialProvider');
    }
    return context;
}
