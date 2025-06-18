import ModeToggle from '@/components/ModeToggle';

export default function Navbar({ children }: { children?: React.ReactNode }) {
    return (
        <nav className="sticky top-0 flex items-center gap-x-4 bg-muted p-4">
            <h1 className="flex-1 text-xl font-bold">
                <span className="mr-2 bg-primary px-2 py-1 text-primary-foreground">ict</span>
                db
            </h1>
            {children}
            <ModeToggle />
        </nav>
    );
}
