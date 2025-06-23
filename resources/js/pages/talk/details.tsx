import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BaseLayout from '@/layouts/base-layout';
import { SharedData } from '@/types';
import { Talk } from '@/types/domain';
import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft, SquareArrowOutUpRight } from 'lucide-react';
import { ReactElement } from 'react';

interface DetailsProps {
    talk: Talk;
}

export default function Details({ talk }: DetailsProps) {
    const {
        auth: { user },
    } = usePage<SharedData>().props;

    return (
        <div className={'grid grid-cols-1 place-items-center'}>
            <div className={'mx-auto flex max-w-4xl min-w-2xl flex-col gap-6'}>
                <div className={'flex justify-between'}>
                    <Button variant={'ghost'} className={'w-fit'} onClick={() => window.history.back()}>
                        <ChevronLeft />
                        Back
                    </Button>
                    {talk.user.id === user?.id ? (
                        <Link href={route('talk.show.edit', { talk: talk.slug })}>
                            <Button>Edit</Button>
                        </Link>
                    ) : null}
                </div>
                <img className={'aspect-auto w-full'} src={`${talk.thumbnail}/maxresdefault.jpg`} alt={'Talk image'} />
                <div className={'flex items-center gap-6'}>
                    <h1 className={'text-3xl font-bold'}>{talk.title}</h1>
                    <div className={'flex gap-2'}>
                        {talk.tags.map((tag) => (
                            <Link key={tag} href={route('talk.index', { _query: { q: tag } })}>
                                <Badge className={'min-w-16'}>{tag}</Badge>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={'items-place flex w-full items-center justify-between'}>
                    <p className={'font-semibold text-muted-foreground italic'}>by {talk.speaker ?? 'unknown'}</p>
                    <Button variant={'outline'} className={'self-end'}>
                        <a href={talk.link} target={'_blank'} rel={'noopener noreferrer'} className={'flex gap-2'}>
                            Watch
                            <SquareArrowOutUpRight />
                        </a>
                    </Button>
                </div>
                {talk.description ? <p className={'text-justify font-serif'}>{talk.description}</p> : null}
                <p className={'pt-10 text-sm text-muted-foreground'}>
                    Added by <span className={'text-primary'}>{talk.user.name}</span> on{' '}
                    <span className={'text-primary'}>
                        {Intl.DateTimeFormat('en-US', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        }).format(new Date(talk.created_at))}
                    </span>
                </p>
            </div>
        </div>
    );
}

Details.layout = (p: ReactElement) => <BaseLayout>{p}</BaseLayout>;
