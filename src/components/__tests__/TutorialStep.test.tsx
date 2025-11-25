import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';

import TutorialStep from '../TutorialStep';
import type { TutorialStep as TutorialStepType, TutorialStepProps } from '../../types';

const mockStep: TutorialStepType = {
    id: 'test-step',
    title: 'Test Step Title',
    description: 'Test step description',
    command: 'echo "test command"',
    concept: {
        title: 'Test Concept',
        text: 'Test concept explanation',
        icon: 'PackageIcon',
    },
};

const renderStep = (override: Partial<TutorialStepProps> = {}) => {
    const props: TutorialStepProps = {
        step: mockStep,
        onNext: vi.fn(),
        onPrev: vi.fn(),
        isFirst: false,
        isLast: false,
        stepIndex: 0,
        totalSteps: 5,
        ...override,
    };

    return render(<TutorialStep {...props} />);
};

describe('TutorialStep', () => {
    it('renders step title and description', () => {
        renderStep();

        expect(screen.getByText('Test Step Title')).toBeInTheDocument();
        expect(screen.getByText('Test step description')).toBeInTheDocument();
    });

    it('renders command when present', () => {
        renderStep();

        expect(screen.getByText(/echo "test command"/)).toBeInTheDocument();
        expect(screen.getByText('TERMINAL')).toBeInTheDocument();
    });

    it('renders concept when present', () => {
        renderStep();

        expect(screen.getByText(/Unix Concept: Test Concept/)).toBeInTheDocument();
        expect(screen.getByText('Test concept explanation')).toBeInTheDocument();
    });

    it('calls onNext when next button clicked', async () => {
        const user = userEvent.setup();
        const onNext = vi.fn();

        renderStep({ onNext });

        await user.click(screen.getByRole('button', { name: /next/i }));
        expect(onNext).toHaveBeenCalledOnce();
    });

    it('calls onPrev when previous button clicked', async () => {
        const user = userEvent.setup();
        const onPrev = vi.fn();

        renderStep({ onPrev });

        await user.click(screen.getByRole('button', { name: /previous/i }));
        expect(onPrev).toHaveBeenCalledOnce();
    });

    it('disables previous button when isFirst is true', () => {
        renderStep({ isFirst: true });

        const prevButton = screen.getByRole('button', { name: /previous/i });
        expect(prevButton).toBeDisabled();
    });

    it('shows finish text when isLast is true', () => {
        renderStep({ isLast: true, stepIndex: 4 });
        expect(screen.getByRole('button', { name: /finish/i })).toBeInTheDocument();
    });

    it('navigates with arrow keys', async () => {
        const user = userEvent.setup();
        const onNext = vi.fn();
        const onPrev = vi.fn();
        renderStep({ onNext, onPrev });
        await user.keyboard('{ArrowRight}');
        expect(onNext).toHaveBeenCalledOnce();
        await user.keyboard('{ArrowLeft}');
        expect(onPrev).toHaveBeenCalledOnce();
    });

    it('does not navigate left when first step', async () => {
        const user = userEvent.setup();
        const onPrev = vi.fn();
        renderStep({ onPrev, isFirst: true });
        await user.keyboard('{ArrowLeft}');
        expect(onPrev).not.toHaveBeenCalled();
    });
});
