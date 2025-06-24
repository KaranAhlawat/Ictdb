import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import RootLayout from '@/layouts/root';
import { cn, debounce } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { LogOut, Menu } from 'lucide-react';
import { ChangeEvent, FormEvent, ReactNode } from 'react';

export default function BaseLayout({ children }: { children: ReactNode }) {
    const page = usePage<SharedData>();
    const {
        auth: { user },
        ziggy: { location },
        filters,
    } = page.props;

    const form = useForm();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('account.logout'));
    };

    const isAuthFormPage = location.endsWith('login') || location.endsWith('register');

    return (
        <RootLayout>
            <div className="">
                <Navbar>
                    <div className={'flex-1'}>
                        <div className={'flex justify-end xl:hidden'}>
                            <Menu />
                        </div>
                        <div className={'hidden items-center gap-2 xl:visible xl:flex'}>
                            <Input
                                type={'text'}
                                placeholder={'Search by title or speaker'}
                                name={'q'}
                                className={'flex-1'}
                                defaultValue={filters.q ?? ''}
                                onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
                                    const params: Record<string, string> = {};
                                    if (filters.tags) {
                                        params['tags'] = filters.tags;
                                    }
                                    params['q'] = e.target.value;
                                    router.get('/', params, { replace: true, preserveState: true });
                                }, 200)}
                            />
                            <MultiSelect
                                options={page.props.tags?.map((t) => ({ label: t.name, value: t.name }))}
                                defaultValue={filters.tags?.split(',') ?? []}
                                onValueChange={debounce((values: string[]) => {
                                    const params: Record<string, string> = {};
                                    if (filters.q) {
                                        params['q'] = filters.q;
                                    }
                                    params['tags'] = values.join(',');
                                    router.get('/', params, { replace: true, preserveState: true });
                                }, 200)}
                                className={'xl:min-w-lg'}
                                placeholder={'Filter by tags'}
                                maxCount={6}
                            />
                            {user ? (
                                <>
                                    <Link href={route('account.show.dashboard')}>
                                        <p className="text-sm">
                                            Hi, <span className="font-bold">{user.name}</span>
                                        </p>
                                    </Link>
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
                        </div>
                    </div>
                </Navbar>
                <main className={cn('grid pb-5', isAuthFormPage && 'place-items-center')}>{children}</main>
            </div>
        </RootLayout>
    );
}
