import { ArrowRight } from 'lucide-react';
import { tutorialIntro } from '../data/tutorialSteps';
import { conceptIconMap, fallbackConceptIcon } from '../constants/conceptIcons';

export function StartCard({ onStart, totalSteps }: { onStart: () => void; totalSteps: number }) {
    const IntroIcon = tutorialIntro.concept?.icon
        ? conceptIconMap[tutorialIntro.concept.icon] ?? fallbackConceptIcon
        : fallbackConceptIcon;

    return (
        <div className="premium-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-nix-blue/6 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4 mb-6">
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-nix-blue/80">Start</p>
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
                    <div className="absolute top-0 left-0 w-24 h-24 bg-nix-blue/8 rounded-full blur-2xl" aria-hidden="true" />

                    <div className="flex items-center gap-3 mb-3 relative">
                        <div className="p-2 rounded-xl bg-nix-blue/10 text-nix-blue" aria-hidden="true">
                            <IntroIcon className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg text-nix-blue tracking-tight">Unix Concept: {tutorialIntro.concept.title}</span>
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
