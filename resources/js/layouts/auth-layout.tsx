import Navbar from '@/components/Navbar';
import RootLayout from './root';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <RootLayout>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="grid flex-1 place-items-center px-5">{children}</main>
            </div>
        </RootLayout>
    );
}
