import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Talk } from '@/types/domain';
import { Link } from '@inertiajs/react';
import { SquareArrowOutUpRight } from 'lucide-react';

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
