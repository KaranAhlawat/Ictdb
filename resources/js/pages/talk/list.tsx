import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BaseLayout from '@/layouts/base-layout';
import { SquareArrowOutUpRight } from 'lucide-react';
import { ReactElement } from 'react';

interface Talk {
    id: string;
    title: string;
    link: string;
    speaker?: string;
    description?: string;
}

interface TalkListProps {
    talks: Talk[];
}

export default function TalkList({ talks }: TalkListProps) {
    return (
        <div className="mx-auto max-w-2xl py-10">
            <ul className="flex flex-col gap-16">
                {talks.map((talk) => (
                    <TalkCard key={talk.id} talk={talk} />
                ))}
            </ul>
        </div>
    );
}

function TalkCard({ talk }: { talk: Talk }) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="truncate">{talk.title}</CardTitle>
                <CardAction>
                    <Button variant="link" size="sm">
                        <a href={talk.link}>
                            <SquareArrowOutUpRight />
                        </a>
                    </Button>
                </CardAction>
            </CardHeader>
            {talk.description ? <CardContent className="flex-1">{talk.description}</CardContent> : null}
            <CardFooter>
                <p className="text-sm text-muted-foreground">{talk.speaker}</p>
            </CardFooter>
        </Card>
    );
}

TalkList.layout = (p: ReactElement) => <BaseLayout children={p} />;
