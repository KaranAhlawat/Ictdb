import { Link } from '@inertiajs/react';

export default function HomeNavLink() {
    return (
        <Link href={route('talk.index')}>
            <h1 className="text-xl font-bold">
                <span className="mr-2 bg-primary px-2 py-1 text-primary-foreground">ict</span>
                db
            </h1>
        </Link>
    );
}
