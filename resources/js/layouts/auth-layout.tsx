import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Home } from 'lucide-react';
import RootLayout from './root';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <RootLayout>
            <div className="flex min-h-screen flex-col">
                <Navbar>
                    <div className={'flex-1'}></div>
                    <Button variant="outline">
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
