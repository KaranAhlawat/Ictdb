import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from '@/components/ui/sidebar';
import AccountLayout from '@/layouts/account-layout';
import { Link } from '@inertiajs/react';
import { Pen, User } from 'lucide-react';
import { ReactNode } from 'react';

function AppSidebar({ height }: { height: number }) {
    return (
        <Sidebar className={`top-[${height}px] h-[calc(100svh - ${height}px)]`}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Account Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={route().current('account.dashboard.show')}>
                                    <Link href={route('account.dashboard.show')}>
                                        <User />
                                        Account Details
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={route().current('account.dashboard.contributions')}>
                                    <Link href={route('account.dashboard.contributions')}>
                                        <Pen />
                                        My Contributions
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export default function UserDashLayout({ children }: { children: ReactNode }) {
    return (
        <AccountLayout>
            {(height) => (
                <SidebarProvider
                    style={{
                        minHeight: `calc(100svh - ${height}px)`,
                    }}
                >
                    <AppSidebar height={height} />
                    <main className={'p-4 w-full'}>{children}</main>
                </SidebarProvider>
            )}
        </AccountLayout>
    );
}
