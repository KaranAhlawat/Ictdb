import BaseLayout from '@/layouts/base-layout';
import { ReactElement } from 'react';

export default function Dashboard() {
    return (
        <div>
            <h1>User dashboard</h1>
        </div>
    );
}

Dashboard.layout = (p: ReactElement) => <BaseLayout children={p} />;
