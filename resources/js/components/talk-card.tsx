import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Talk } from '@/types/domain';
import { Link } from '@inertiajs/react';
import { SquareArrowOutUpRight } from 'lucide-react';

const MAX_TAGS_ON_CARD = 3;

export function TalkCard({ talk }: { talk: Talk }) {
    return (
        <Card className="flex flex-col justify-between gap-0 pt-0 lg:min-w-sm">
            <CardHeader className={'px-0'}>
                <Link href={route('talk.show', { talk: talk.slug })}>
                    <img className={'h-full w-full rounded-t-xl object-cover'} src={`${talk.thumbnail}/hqdefault.jpg`} alt={'Talk image'} />
                </Link>
            </CardHeader>
            <CardContent className={'flex flex-1 flex-col gap-1'}>
                <Link href={route('talk.show', { talk: talk.slug })} className={'text-lg font-bold'}>
                    {talk.title}
                </Link>
                <div className={'flex items-center gap-1.5'}>
                    {talk.tags.slice(0, MAX_TAGS_ON_CARD).map((tag) => (
                        <Badge variant={'secondary'} key={tag.name} className="text-md md:text-sm">
                            {tag.name}
                        </Badge>
                    ))}
                    {talk.tags.length > MAX_TAGS_ON_CARD ? (
                        <span className={'text-muted-foreground md:text-xs'}>and {talk.tags.length - MAX_TAGS_ON_CARD} more</span>
                    ) : null}
                </div>
            </CardContent>
            <CardFooter className={'mt-4 flex justify-between'}>
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
