import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export default function Navbar({ children, className }: { children?: ReactNode; className?: string }) {
    return <nav className={cn('sticky top-0 bg-muted p-4', className)}>{children}</nav>;
}
