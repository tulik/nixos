/**
 * TypeScript type definitions for the Nix on macOS tutorial application
 */

/**
 * Represents a concept explanation within a tutorial step
 */
export type ConceptIconName =
    | 'ReproducibleIcon'
    | 'DeclarativeIcon'
    | 'ReliableIcon'
    | 'PackageIcon'
    | 'ConfigIcon'
    | 'ShellIcon';

export interface TutorialStepConcept {
    /** Title of the Unix concept being explained */
    title: string;
    /** Detailed explanation of the concept */
    text: string;
    /** Optional icon component name to display */
    icon?: ConceptIconName;
}

/**
 * Represents a single step in the Nix installation tutorial
 */
export interface TutorialStep {
    /** Unique identifier for the step */
    id: string;
    /** Display title of the step */
    title: string;
    /** Detailed description of what this step accomplishes */
    description: string;
    /** Optional shell command to execute for this step */
    command?: string;
    /** Optional Unix concept explanation */
    concept?: TutorialStepConcept;
}

/**
 * Theme options for the application
 */
export type Theme = 'light' | 'dark';

/**
 * High-level phase of the tutorial
 */
export type TutorialPhase = 'start' | 'steps' | 'end';

/**
 * Props for components that accept a className
 */
export interface ClassNameProps {
    className?: string;
}

/**
 * Props for the TutorialStep component
 */
export interface TutorialStepProps {
    /** The tutorial step to display */
    step: TutorialStep;
    /** Callback when user clicks next */
    onNext: () => void;
    /** Callback when user clicks previous */
    onPrev: () => void;
    /** Whether this is the first step */
    isFirst: boolean;
    /** Whether this is the last step */
    isLast: boolean;
    /** Zero-based index of the current step */
    stepIndex: number;
    /** Total number of real steps (excluding start/end) */
    totalSteps: number;
}

/**
 * Context value for tutorial state management
 */
export interface TutorialContextValue {
    /** Current step index */
    currentStepIndex: number;
    /** Total number of steps */
    totalSteps: number;
    /** Current tutorial step */
    currentStep: TutorialStep;
    /** Progress percentage (0-100) */
    progress: number;
    /** Whether the experience is on the landing slide */
    isAtStart: boolean;
    /** Whether the experience has moved to the closing slide */
    isAtEnd: boolean;
    /** Current high-level phase */
    phase: TutorialPhase;
    /** Navigate to next step */
    goToNext: () => void;
    /** Navigate to previous step */
    goToPrevious: () => void;
    /** Navigate to specific step by index */
    goToStep: (index: number) => void;
    /** Jump to the landing slide */
    restartTutorial: () => void;
    /** Begin the tutorial from the first real step */
    startTutorial: () => void;
    /** Whether there is a next step */
    hasNext: boolean;
    /** Whether there is a previous step */
    hasPrevious: boolean;
}

/**
 * Context value for theme management
 */
export interface ThemeContextValue {
    /** Current theme */
    theme: Theme;
    /** Toggle between light and dark theme */
    toggleTheme: () => void;
    /** Set theme explicitly */
    setTheme: (theme: Theme) => void;
}
