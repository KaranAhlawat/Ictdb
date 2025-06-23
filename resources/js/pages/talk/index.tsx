import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import BaseLayout from '@/layouts/base-layout';
import { Talk } from '@/types/domain';
import { Link, useForm } from '@inertiajs/react';
import { Plus, SquareArrowOutUpRight } from 'lucide-react';
import { FormEvent, ReactElement } from 'react';

interface TalkListProps {
    talks: Talk[];
}

export default function Index({ talks }: TalkListProps) {
    const form = useForm({
        q: new URLSearchParams(window.location.search).get('q') ?? '',
    });

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

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.get('/');
    };

    return (
        <div className={'mx-auto max-w-7xl min-w-4xl pt-4'}>
            <div className={'flex items-center gap-4'}>
                <form className={'flex-1'} onSubmit={onSubmit}>
                    <Input
                        type={'text'}
                        placeholder={'Search by title, author, or description'}
                        name={'q'}
                        value={form.data.q}
                        onChange={(e) => form.setData('q', e.target.value)}
                    />
                </form>
                <Link href={route('talk.create')}>
                    <Button className={'flex flex-row items-center gap-2'}>
                        <Plus />
                        Add a talk
                    </Button>
                </Link>
            </div>
            {list}
        </div>
    );
}

function TalkCard({ talk }: { talk: Talk }) {
    return (
        <Card className="flex min-w-sm flex-col gap-0 pt-0">
            <CardHeader className={'p-0'}>
                <Link href={route('talk.show', { talk: talk.slug })}>
                    <img className={'w-full rounded-t-lg'} src={`${talk.thumbnail}/hqdefault.jpg`} alt={'Talk image'} />
                </Link>
            </CardHeader>
            <CardContent>
                <Button variant={'link'} className={'px-0'}>
                    <Link href={route('talk.show', { talk: talk.slug })} className={'font-semibold'}>
                        {talk.title}
                    </Link>
                </Button>
            </CardContent>
            <CardFooter className={'flex justify-between'}>
                <p className="text-sm text-muted-foreground">by {talk.speaker ?? 'unknown'}</p>
                <CardAction>
                    <Button variant="link" size="sm">
                        <a href={talk.link} target="_blank" rel="noopener noreferrer">
                            <SquareArrowOutUpRight />
                        </a>
                    </Button>
                </CardAction>
            </CardFooter>
        </Card>
    );
}

Index.layout = (p: ReactElement) => <BaseLayout children={p} />;
