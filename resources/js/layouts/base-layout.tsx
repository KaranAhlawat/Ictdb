import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RootLayout from '@/layouts/root';
import { cn, debounce } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { ChangeEvent, FormEvent, ReactNode } from 'react';

export default function BaseLayout({ children }: { children: ReactNode }) {
    const {
        auth: { user },
        ziggy: { location },
    } = usePage<SharedData>().props;

    const form = useForm();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('account.logout'));
    };

    const isAuthFormPage = location.endsWith('login') || location.endsWith('register');

    return (
        <RootLayout>
            <div className="min-h-screen">
                <Navbar
                    middle={
                        <div className={'mx-auto flex max-w-lg items-center justify-center gap-4'}>
                            <Input
                                type={'text'}
                                placeholder={'Search by title, speaker, or tag'}
                                name={'q'}
                                className={'flex-1'}
                                defaultValue={new URLSearchParams(window.location.search).get('q') ?? ''}
                                onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
                                    router.get('/', { q: e.target.value }, { preserveState: true, replace: true });
                                }, 200)}
                            />
                        </div>
                    }
                >
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
                <main className={cn('grid pb-5', isAuthFormPage && 'place-items-center')}>{children}</main>
            </div>
        </RootLayout>
    );
}
