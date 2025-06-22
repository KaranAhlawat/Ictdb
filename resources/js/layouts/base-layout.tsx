import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import RootLayout from '@/layouts/root';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { FormEvent, ReactNode } from 'react';

export default function BaseLayout({ children }: { children: ReactNode }) {
    const {
        auth: { user },
        ziggy: { location }
    } = usePage<SharedData>().props;

    const form = useForm();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('account.logout'));
    };

    const isAuthFormPage = location.endsWith('login') || location.endsWith('register');

    return (
        <RootLayout>
            <div className="flex min-h-screen flex-col">
                <Navbar>
                    {user ? (
                        <>
                            <p className="text-sm">
                                Hi, <span className="font-bold">{user.name}</span>
                            </p>
                            <form onSubmit={handleSubmit}>
                                <Button type="submit" variant={'outline'} size={'icon'}>
                                    <LogOut />
                                </Button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Button variant="secondary">
                                <Link href={route('account.show.login')}>Login</Link>
                            </Button>
                            <Button variant="secondary">
                                <Link href={route('account.show.register')}>Register</Link>
                            </Button>
                        </>
                    )}
                </Navbar>
                <main className={cn('grid flex-1 p-5', isAuthFormPage && "place-items-center")}>
                    {children}
                </main>
            </div>
        </RootLayout>
    );
}
