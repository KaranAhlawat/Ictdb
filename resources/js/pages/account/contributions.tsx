import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UserDashLayout from '@/layouts/user-dash-layout';
import { Talk } from '@/types/domain';
import { Link, router } from '@inertiajs/react';
import { Pen, SquareArrowOutUpRight, Trash } from 'lucide-react';

function onDeleteTalk(talk: Talk) {
    if (confirm('Are you sure you want to delete this talk?')) {
        router.delete(route('talk.destroy', { talk }));
    }
}

function Contributions({ talks }: { talks: Talk[] }) {
    return (
        <UserDashLayout>
            <div className={'flex flex-col gap-2'}>
                {talks.map((talk) => (
                    <Card className={'mx-auto w-full max-w-4xl'}>
                        <CardContent className={'flex items-center gap-4'}>
                            <img
                                className={'aspect-auto w-32 rounded-t-xl object-cover'}
                                src={`${talk.thumbnail}/hqdefault.jpg`}
                                alt={'Talk image'}
                            />
                            <div className={'flex flex-1 flex-col'}>
                                <h2 className={'text-xl font-bold'}>{talk.title}</h2>
                                <p>{talk.speaker}</p>
                            </div>
                            <div className={'flex flex-col gap-2'}>
                                <Button variant={'outline'} className={'md:self-end'}>
                                    <a href={talk.link} target={'_blank'} rel={'noopener noreferrer'} className={'flex gap-2'}>
                                        Watch
                                        <SquareArrowOutUpRight />
                                    </a>
                                </Button>
                                <div className={'flex flex-row gap-2'}>
                                    <Button size={'icon'}>
                                        <Link href={route('talk.show.edit', { talk })}>
                                            <Pen />
                                        </Link>
                                    </Button>
                                    <Button onClick={() => onDeleteTalk(talk)} variant={'destructive'} size={'icon'}>
                                        <Trash />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </UserDashLayout>
    );
}

export default Contributions;
