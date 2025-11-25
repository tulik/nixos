import type { ClassNameProps } from '../types';

const AppIcon = ({ className = "w-8 h-8" }: ClassNameProps) => {
    return (
        <img
            src="/logo.svg"
            alt="Logo"
            className={className}
        />
    );
};

export default AppIcon;
