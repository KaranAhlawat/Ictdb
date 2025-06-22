import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import BaseLayout from '@/layouts/base-layout';
import { Talk } from '@/types/domain';
import { Link } from '@inertiajs/react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { ReactElement } from 'react';

interface TalkListProps {
    talks: Talk[];
}

function AddTalk() {
    return (
        <Button>
            <Link href={route('talk.create')}>Submit a talk</Link>
        </Button>
    );
}

export default function TalkList({ talks }: TalkListProps) {
    let list = (
        <div className="py-4">
            <h1 className={'text-xl text-muted-foreground'}>
                <span className={'font-bold'}>Talks?</span> Oh, we like to keep things <i className={'font-bold'}>mysteriously</i> underwhelming.
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
        <div className={'mx-auto max-w-7xl pt-4'}>
            <AddTalk />
            {list}
        </div>
    );
}

function TalkCard({ talk }: { talk: Talk }) {
    return (
        <Card className="flex flex-col pt-0 min-w-sm">
            <CardHeader className={'p-0'}>
                <img className={'w-full rounded-t-lg'} src={'https://placehold.co/300x200'} alt={'Talk image'} />
            </CardHeader>
            <CardContent>
                <Button variant={'link'} className={'px-0'}>
                    <Link href={route('talk.show', { talk: talk.id })}>{talk.title}</Link>
                </Button>
            </CardContent>
            <CardFooter className={'flex justify-between'}>
                <p className="text-sm text-muted-foreground">{talk.speaker}</p>
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

TalkList.layout = (p: ReactElement) => <BaseLayout children={p} />;
