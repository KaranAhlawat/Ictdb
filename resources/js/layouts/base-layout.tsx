import HomeNavLink from '@/components/home-nav-link';
import ModeToggle from '@/components/mode-toggle';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import RootLayout from '@/layouts/root';
import { cn, debounce } from '@/lib/utils';
import { SharedData } from '@/types';
import { Tag } from '@/types/domain';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { LogOut, Menu } from 'lucide-react';
import { FormEvent, ReactNode, useState } from 'react';

function SearchAndFilter({ filters, tags }: { filters: Record<string, string>; tags: Tag[] }) {
    return (
        <>
            <Input
                type={'text'}
                placeholder={'Search by title or speaker'}
                name={'q'}
                defaultValue={filters.q ?? ''}
                onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
                    const params: Record<string, string> = {};
                    if (filters.tags) {
                        params['tags'] = filters.tags;
                    }
                    params['q'] = e.target.value;
                    router.get(route('talk.index'), params, { replace: true, preserveState: true });
                }, 200)}
            />
            <MultiSelect
                options={tags?.map((t) => ({ label: t.name, value: t.name }))}
                defaultValue={filters.tags?.split(',') ?? []}
                onValueChange={debounce((values: string[]) => {
                    const params: Record<string, string> = {};
                    if (filters.q) {
                        params['q'] = filters.q;
                    }
                    params['tags'] = values.join(',');
                    router.get(route('talk.index'), params, { replace: true, preserveState: true });
                }, 200)}
                className={'min-w-sm md:min-w-md'}
                placeholder={'Filter by tags'}
                maxCount={3}
            />
        </>
    );
}

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

    const [open, setOpen] = useState(false);

    const isAuthFormPage = location.endsWith('login') || location.endsWith('register');

    return (
        <RootLayout>
            <div className={'min-h-screen'}>
                {/* Mobile menu */}
                <Navbar className={'flex flex-col items-center gap-y-4 lg:hidden'}>
                    <div className="flex w-full justify-between">
                        <HomeNavLink />
                        <div className="flex items-center gap-2">
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
                            <Button variant={'outline'} size={'icon'} onClick={() => setOpen((p) => !p)}>
                                <Menu />
                            </Button>
                            <ModeToggle />
                        </div>
                    </div>
                    {open ? <SearchAndFilter filters={filters} tags={page.props.tags} /> : null}
                </Navbar>

                {/* Desktop menu */}
                <Navbar className={'hidden items-center gap-x-4 lg:flex'}>
                    <Link href={route('talk.index')}>
                        <h1 className="text-xl font-bold">
                            <span className="mr-2 bg-primary px-2 py-1 text-primary-foreground">ict</span>
                            db
                        </h1>
                    </Link>
                    <div className={'flex flex-1 items-center gap-2'}>
                        <SearchAndFilter filters={filters} tags={page.props.tags} />
                        {user ? (
                            <>
                                <p className="ml-1 text-sm whitespace-nowrap">
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
                    </div>
                    <ModeToggle />
                </Navbar>
                <main className={cn('p-4', { 'grid place-items-center': isAuthFormPage })}>{children}</main>
            </div>
        </RootLayout>
    );
}
