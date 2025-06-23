import ModeToggle from '@/components/mode-toggle';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function Navbar({ children, middle }: { children?: ReactNode; middle?: ReactNode }) {
    return (
        <nav className="sticky top-0 flex items-center gap-x-4 bg-muted p-4">
            <Link href={route('talk.index')}>
                <h1 className="text-xl font-bold">
                    <span className="mr-2 bg-primary px-2 py-1 text-primary-foreground">ict</span>
                    db
                </h1>
            </Link>
            <div className={'flex-1'}>
                {middle}
            </div>
            {children}
            <ModeToggle />
        </nav>
    );
}
