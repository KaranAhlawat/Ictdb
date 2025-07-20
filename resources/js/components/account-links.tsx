import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
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
            <Link href={route('account.show.dashboard')} className={'text-nowrap'}>
                <p className="text-sm">
                    Hi, <span className="font-bold">{user.name}</span>
                </p>
            </Link>
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
