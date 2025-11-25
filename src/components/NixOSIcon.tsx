import type { ClassNameProps } from '../types';

const NixOSIcon = ({ className = "w-8 h-8" }: ClassNameProps) => {
    return (
        <img
            src="/nixos/nix-snowflake.svg"
            alt="NixOS Logo"
            className={className}
        />
    );
};

export default NixOSIcon;
