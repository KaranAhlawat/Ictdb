import { Link } from '@inertiajs/react';
import { Home } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav className="sticky top-0 flex items-center bg-muted p-4">
                <h1 className="flex-1 text-xl font-bold">
                    <span className="mr-2 bg-primary px-2 py-1 text-primary-foreground">ict</span>
                    db
                </h1>
                {/* CHANGE */}
                <Link href={'#'}>
                    <Home size={24} />
                </Link>
            </nav>
            <main>{children}</main>
        </div>
    );
}
