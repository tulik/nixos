import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../ThemeToggle';

describe('ThemeToggle', () => {
    it('renders theme toggle button', () => {
        render(<ThemeToggle />);

        const buttons = screen.getAllByRole('button');
        // ThemeToggle is the first button
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('toggles theme when clicked', async () => {
        const user = userEvent.setup();
        render(<ThemeToggle />);

        const buttons = screen.getAllByRole('button');
        const themeButton = buttons[0];
        expect(themeButton).toBeDefined();

        const root = document.documentElement;
        const hadDarkClass = root.classList.contains('dark');

        await user.click(themeButton!); // Non-null assertion safe after the expect above

        const hasDarkClass = root.classList.contains('dark');
        expect(hasDarkClass).not.toBe(hadDarkClass);
    });

    it('shows correct icon for theme', () => {
        render(<ThemeToggle />);

        const buttons = screen.getAllByRole('button');
        const themeButton = buttons[0];

        // Button should contain either Sun or Moon icon (lucide-react)
        expect(themeButton?.querySelector('svg')).toBeInTheDocument();
    });
});
