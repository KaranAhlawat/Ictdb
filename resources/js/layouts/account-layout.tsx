import { AccountLinks } from '@/components/account-links';
import HomeNavLink from '@/components/home-nav-link';
import ModeToggle from '@/components/mode-toggle';
import Navbar from '@/components/navbar';
import RootLayout from '@/layouts/root';
import { ReactNode, useCallback, useState } from 'react';

export default function AccountLayout({ children }: { children: ((height: number) => ReactNode) | ReactNode }) {
    const [navHeight, setNavHeight] = useState(0);

    const measureNav = useCallback((nav: HTMLElement | null) => {
        if (nav) {
            setNavHeight(nav.getBoundingClientRect().height);
        }
    }, []);

    return (
        <RootLayout>
            <div className="min-h-screen">
                <Navbar ref={measureNav} className="flex items-center justify-between gap-2">
                    <HomeNavLink />
                    <div className="flex items-center gap-2">
                        <AccountLinks />
                        <ModeToggle />
                    </div>
                </Navbar>
                <main>{typeof children === 'function' ? children(navHeight) : children}</main>
            </div>
        </RootLayout>
    );
}
