import { useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Terminal,
} from 'lucide-react';
import type { TutorialStepProps } from '../types';
import { conceptIconMap, fallbackConceptIcon } from '../constants/conceptIcons';

const TutorialStep = ({ step, onNext, onPrev, isFirst, isLast, stepIndex, totalSteps }: TutorialStepProps) => {
    const IconComponent = step.concept?.icon
        ? conceptIconMap[step.concept.icon] ?? fallbackConceptIcon
        : fallbackConceptIcon;

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            const tag = target.tagName.toLowerCase();
            const isInput = ['input', 'textarea', 'select'].includes(tag) || (target as any).isContentEditable;
            if (isInput) return;
            if (e.key === 'ArrowLeft' && !isFirst) {
                onPrev();
            } else if (e.key === 'ArrowRight' && !isLast) {
                onNext();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isFirst, isLast, onPrev, onNext]);

    return (
        <div className="premium-card p-8 md:p-12 relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-nix-blue/6 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4 mb-5">
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary relative tracking-tight">
                    {step.title}
                </h2>
                <div className="px-3 py-1 rounded-full bg-surface text-text-secondary text-sm font-semibold border border-border/70 shadow-sm">
                    Step {stepIndex + 1} / {totalSteps}
                </div>
            </div>

            <div className="prose prose-invert max-w-none mb-10 text-text-secondary text-base md:text-lg leading-relaxed relative">
                <p className="whitespace-pre-line">{step.description}</p>
            </div>

            {step.command && (
                <div className="no-select bg-zinc-900 rounded-xl border border-zinc-700/50 overflow-hidden mb-10 relative group transition-all duration-300 hover:border-zinc-600/60 hover:shadow-2xl">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-zinc-800 to-zinc-800/95 border-b border-zinc-700/50">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                            <span className="text-xs text-zinc-400 font-mono font-semibold tracking-wider">TERMINAL</span>
                        </div>
                        <div className="flex gap-2" aria-hidden="true">
                            <div className="w-3 h-3 rounded-full bg-red-500/70 transition-all duration-300 group-hover:bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/70 transition-all duration-300 group-hover:bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500/70 transition-all duration-300 group-hover:bg-green-500" />
                        </div>
                    </div>
                    {/* Terminal Content */}
                    <div className="p-5 md:p-6 overflow-x-auto bg-gradient-to-br from-zinc-900 to-zinc-900/95">
                        <pre className="font-mono text-sm md:text-base text-nix-light leading-relaxed">
                            <code>{step.command.trim()}</code>
                        </pre>
                    </div>
                </div>
            )}

            {step.concept && (
                <div className="glass-card p-7 mb-10 relative overflow-hidden group transition-all duration-500 hover:shadow-lg">
                    {/* Icon glow effect */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-nix-blue/8 rounded-full blur-2xl group-hover:bg-nix-blue/15 transition-all duration-700" />

                    <div className="flex items-center gap-3 mb-4 relative">
                        <div className="p-2 rounded-xl bg-nix-blue/10 text-nix-blue transition-all duration-300 group-hover:bg-nix-blue/15 group-hover:scale-105" aria-hidden="true">
                            <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-lg md:text-xl text-nix-blue tracking-tight">Unix Concept: {step.concept.title}</span>
                    </div>
                    <p className="text-text-secondary leading-relaxed text-base md:text-lg relative">
                        {step.concept.text}
                    </p>
                </div>
            )}

            <div className="flex justify-between items-center pt-8 pb-10 border-t border-border/50 relative">
                <button
                    className={`premium-button flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base ${isFirst
                        ? 'opacity-40 cursor-not-allowed'
                        : ''
                        }`}
                    onClick={onPrev}
                    disabled={isFirst}
                    aria-label="Previous step"
                >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    Previous
                </button>

                <button
                    className="gradient-primary flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base shadow-lg"
                    onClick={onNext}
                    aria-label={isLast ? 'Finish tutorial' : 'Next step'}
                >
                    {isLast ? 'Finish' : 'Next'}
                    {!isLast && <ChevronRight className="w-5 h-5" aria-hidden="true" />}
                </button>
            </div>
        </div>
    );
};

export default TutorialStep;
