import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SharedData } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { CircleUserRound, LogOut, User } from 'lucide-react';
import { FormEvent } from 'react';

export function AccountLinks() {
    const page = usePage<SharedData>();
    const {
        auth: { user },
    } = page.props;

    const form = useForm();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route('account.logout'));
    };

    return user ? (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className={'rounded-full'} variant={'outline'} size={'icon'}>
                        <User />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Hi, {user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={route('account.dashboard.show')}>Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={route('account.dashboard.contributions')}>Contributions</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <form onSubmit={handleSubmit}>
                <Button type="submit" variant={'outline'} size={'icon'}>
                    <LogOut />
                </Button>
            </form>
        </>
    ) : (
        <>
            <Button variant="link">
                <Link href={route('account.show.login')}>Login</Link>
            </Button>
            <Button variant="link">
                <Link href={route('account.show.register')}>Register</Link>
            </Button>
        </>
    );
}
