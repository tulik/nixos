import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isLight = theme === 'light';

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle p-3.5 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-500 ease-out text-text-primary group relative overflow-hidden hover:border-nix-blue/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nix-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{ boxShadow: 'var(--shadow-md)' }}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
            aria-pressed={!isLight}
            title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
            data-theme={theme}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-nix-blue/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center gap-3">
                <div className="toggle-track h-6 w-12 rounded-full border border-border/70 bg-surface/80 flex items-center px-1 transition-all duration-500 ease-out">
                    <div
                        className={`toggle-thumb h-5 w-5 rounded-full bg-gradient-to-br from-nix-blue to-nix-accent text-white grid place-items-center shadow-md transition-all duration-500 ease-out ${isLight ? 'translate-x-0 rotate-0' : 'translate-x-5 rotate-12'
                            }`}
                    >
                        {isLight ? (
                            <Sun className="w-3.5 h-3.5 transition-transform duration-500 ease-out group-hover:rotate-12" />
                        ) : (
                            <Moon className="w-3.5 h-3.5 transition-transform duration-500 ease-out group-hover:-rotate-6" />
                        )}
                    </div>
                </div>
                <span className="text-sm font-semibold text-text-secondary hidden sm:inline transition-colors duration-300">
                    {isLight ? 'Light mode' : 'Dark mode'}
                </span>
            </div>
        </button>
    );
};

export default ThemeToggle;
