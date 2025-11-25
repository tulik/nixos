import type { LucideIcon } from 'lucide-react';
import { Blocks, Command, Lightbulb, Package, RefreshCcw, Settings2, ShieldCheck } from 'lucide-react';
import type { ConceptIconName } from '../types';

export const conceptIconMap: Record<ConceptIconName, LucideIcon> = {
    ReproducibleIcon: RefreshCcw,
    DeclarativeIcon: Blocks,
    ReliableIcon: ShieldCheck,
    PackageIcon: Package,
    ConfigIcon: Settings2,
    ShellIcon: Command,
};

export const fallbackConceptIcon = Lightbulb;
