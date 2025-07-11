import HomeNavLink from '@/components/home-nav-link';
import ModeToggle from '@/components/mode-toggle';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Home } from 'lucide-react';
import type { ReactNode } from 'react';
import RootLayout from './root';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <RootLayout>
            <div className="flex min-h-screen flex-col">
                <Navbar className="flex items-center justify-between gap-2">
                    <HomeNavLink />
                    <div className={'flex-1'}></div>
                    <ModeToggle />
                    <Button variant="outline" className={'px-2'}>
                        <Link href={route('talk.index')}>
                            <Home />
                        </Link>
                    </Button>
                </Navbar>
                <main className="grid flex-1 place-items-center px-5">{children}</main>
            </div>
        </RootLayout>
    );
}
