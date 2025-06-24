import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Talk } from '@/types/domain';
import { Link } from '@inertiajs/react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MAX_TAGS_ON_CARD = 2;

export function TalkCard({ talk }: { talk: Talk }) {

    return (
        <Card className="flex min-w-sm flex-col gap-0 pt-0">
            <CardHeader className={'p-0'}>
                <Link href={route('talk.show', { talk: talk.slug })}>
                    <img className={'w-full rounded-t-lg'} src={`${talk.thumbnail}/hqdefault.jpg`} alt={'Talk image'} />
                </Link>
            </CardHeader>
            <CardContent>
                <Button variant={'link'} className={'px-0'}>
                    <Link href={route('talk.show', { talk: talk.slug })} className={'font-bold'}>
                        {talk.title}
                    </Link>
                </Button>
                <div className={'flex gap-1 items-center'}>
                    {talk.tags.slice(0, MAX_TAGS_ON_CARD).map(tag => (<Badge variant={'secondary'} key={tag.name}>{tag.name}</Badge>))}
                    {talk.tags.length > MAX_TAGS_ON_CARD ? <span className={'text-xs text-muted-foreground'}>and {talk.tags.length - MAX_TAGS_ON_CARD} more</span> : null}
                </div>
            </CardContent>
            <CardFooter className={'flex justify-between mt-2'}>
                <p className="text-sm font-medium text-muted-foreground">by {talk.speaker ?? 'unknown'}</p>
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
