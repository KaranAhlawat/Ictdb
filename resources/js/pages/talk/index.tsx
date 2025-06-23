import { AppPagination } from '@/components/app-pagination';
import { TalkCard } from '@/components/talk-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BaseLayout from '@/layouts/base-layout';
import { debounce } from '@/lib/utils';
import { PaginationData } from '@/types';
import { Talk } from '@/types/domain';
import { Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { ChangeEvent, ReactElement } from 'react';

interface TalkListProps {
    pagination: PaginationData<Talk>;
    fields: { q?: string };
}

export default function Index({ pagination: { data: talks, links, next_page_url, prev_page_url }, fields }: TalkListProps) {
    let list = (
        <div className="py-4">
            <h1 className={'text-center text-lg text-muted-foreground'}>
                <span className={'font-medium text-primary'}>Whoops!</span> Didn't find anything
            </h1>
        </div>
    );

    if (talks.length) {
        list = (
            <div className="py-4">
                <ul className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    {talks.map((talk) => (
                        <TalkCard key={talk.id} talk={talk} />
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className={'mx-auto max-w-7xl min-w-4xl pt-4'}>
            {/* Search and new input */}
            <div className={'flex items-center gap-4'}>
                <Input
                    type={'text'}
                    placeholder={'Search by title, author, or tag'}
                    name={'q'}
                    className={'flex-1'}
                    defaultValue={fields.q ?? ''}
                    onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
                        router.get('/', { q: e.target.value }, { preserveState: true, replace: true });
                    }, 250)}
                />
                <Link href={route('talk.create')}>
                    <Button className={'flex flex-row items-center gap-2'}>
                        <Plus />
                        Add a talk
                    </Button>
                </Link>
            </div>

            {/* Talks grid */}
            {list}

            {/* Pagination links */}
            <AppPagination links={links} next_page_url={next_page_url} prev_page_url={prev_page_url} />
        </div>
    );
}

Index.layout = (p: ReactElement) => <BaseLayout children={p} />;
