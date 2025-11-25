import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import { ErrorBoundary } from '../ErrorBoundary';

const ThrowError = () => {
    throw new Error('Test error');
};

const WorkingComponent = () => <div>Working content</div>;

describe('ErrorBoundary', () => {
    it('renders children when there is no error', () => {
        render(
            <ErrorBoundary>
                <WorkingComponent />
            </ErrorBoundary>
        );

        expect(screen.getByText('Working content')).toBeInTheDocument();
    });

    it('renders error fallback when an error occurs', () => {
        // Suppress console.error for this test
        const consoleError = console.error;
        console.error = () => { };

        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByText(/We encountered an unexpected error/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();

        // Restore console.error
        console.error = consoleError;
    });

    it('renders custom fallback if provided', () => {
        const consoleError = console.error;
        console.error = () => { };

        const customFallback = <div>Custom error message</div>;

        render(
            <ErrorBoundary fallback={customFallback}>
                <ThrowError />
            </ErrorBoundary>
        );

        expect(screen.getByText('Custom error message')).toBeInTheDocument();

        console.error = consoleError;
    });
});
