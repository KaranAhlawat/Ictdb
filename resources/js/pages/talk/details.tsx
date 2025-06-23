import { Button } from '@/components/ui/button';
import BaseLayout from '@/layouts/base-layout';
import { Talk } from '@/types/domain';
import { ChevronLeft, SquareArrowOutUpRight } from 'lucide-react';
import { ReactElement } from 'react';

interface DetailsProps {
    talk: Talk;
}

export default function Details({ talk }: DetailsProps) {
    return (
        <div className={'grid grid-cols-1 place-items-center'}>
            <div className={'mx-auto flex max-w-4xl min-w-2xl flex-col gap-6'}>
                <img className={'aspect-auto w-full'} src={`${talk.thumbnail}/maxresdefault.jpg`} alt={'Talk image'} />
                <h1 className={'text-3xl font-bold'}>{talk.title}</h1>
                <div className={'items-place flex w-full items-center justify-between'}>
                    <p className={'font-semibold text-muted-foreground italic'}>by {talk.speaker ?? 'unknown'}</p>
                    <Button variant={'outline'} className={'self-end'}>
                        <a href={talk.link} target={'_blank'} rel={'noopener noreferrer'} className={'flex gap-2'}>
                            Watch
                            <SquareArrowOutUpRight />
                        </a>
                    </Button>
                </div>
                {talk.description ? (
                    <>
                        <h2 className={'text-xl font-semibold text-muted-foreground'}>Description</h2>
                        <p className={'text-justify'}>{talk.description}</p>
                    </>
                ) : null}
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
                <Button variant={'ghost'} className={'w-fit'} onClick={() => window.history.back()}>
                    <ChevronLeft />
                    Back
                </Button>
            </div>
        </div>
    );
}

Details.layout = (p: ReactElement) => <BaseLayout>{p}</BaseLayout>;
