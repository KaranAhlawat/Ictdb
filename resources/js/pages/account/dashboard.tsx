import AccountLayout from '@/layouts/account-layout';
import { ReactElement } from 'react';

export default function Dashboard() {
    return (
        <div>
            <h1>User dashboard</h1>
        </div>
    );
}

Dashboard.layout = (p: ReactElement) => <AccountLayout children={p} />;
