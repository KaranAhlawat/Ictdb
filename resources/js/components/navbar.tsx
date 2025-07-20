import { cn } from '@/lib/utils';
import type { ReactNode, Ref } from 'react';

export default function Navbar({ children, className, ref }: { children?: ReactNode; className?: string; ref?: Ref<HTMLElement | null> }) {
    return (
        <nav
            ref={ref}
            className={cn('sticky top-0 border-b bg-background/75 p-4 shadow-sm backdrop-blur-2xl backdrop-saturate-200 backdrop-filter', className)}
        >
            {children}
        </nav>
    );
}
