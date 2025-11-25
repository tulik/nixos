import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { TutorialProvider } from '../contexts/TutorialContext';

/**
 * Custom render function that wraps components with all necessary providers
 */
function customRender(
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) {
    const AllProviders = ({ children }: { children: React.ReactNode }) => {
        return (
            <ThemeProvider>
                <TutorialProvider>{children}</TutorialProvider>
            </ThemeProvider>
        );
    };

    return render(ui, { wrapper: AllProviders, ...options });
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react';

// Override render with our custom version
export { customRender as render };
