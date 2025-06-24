import { AppPagination } from '@/components/app-pagination';
import { TalkCard } from '@/components/talk-card';
import { Button } from '@/components/ui/button';
import BaseLayout from '@/layouts/base-layout';
import { PaginationData } from '@/types';
import { Talk } from '@/types/domain';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface TalkListProps {
    pagination: PaginationData<Talk>;
}

export default function Index({ pagination: { data: talks, links, next_page_url, prev_page_url } }: TalkListProps) {
    return (
        <BaseLayout>
            <div className={'mx-auto flex max-w-7xl flex-col pt-4 xl:min-w-4xl'}>
                {/* New talk add */}
                <Link className={'self-end'} href={route('talk.create')}>
                    <Button className={'flex flex-row items-center gap-2'}>
                        <Plus />
                        Add a talk
                    </Button>
                </Link>

                {/* Talks grid */}
                <div className={'py-4'}>
                    {talks.length ? (
                        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
                            {talks.map((talk) => (
                                <TalkCard key={talk.id} talk={talk} />
                            ))}
                        </ul>
                    ) : (
                        <h1 className={'text-center text-muted-foreground'}>
                            <span className={'font-medium text-primary'}>Whoops!</span> Didn't find anything
                        </h1>
                    )}
                </div>

                {/* Pagination links */}
                <AppPagination links={links} next_page_url={next_page_url} prev_page_url={prev_page_url} />
            </div>
        </BaseLayout>
    );
}
