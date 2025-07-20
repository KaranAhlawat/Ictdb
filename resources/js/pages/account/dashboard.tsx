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

function AppSidebar({ height }: { height: number }) {
    return (
        <Sidebar className={`top-[${height}px] h-[calc(100svh - ${height}px)]`}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Account Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={route().current('account.show.dashboard')}>
                                    <Link href={route('account.show.dashboard')}>
                                        <User />
                                        Account Details
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={route().current('account.show.login')}>
                                    <Link href={route('account.show.dashboard')}>
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

export default function Dashboard() {
    return (
        <AccountLayout>
            {(height) => (
                <SidebarProvider
                    style={{
                        minHeight: `calc(100svh - ${height}px)`,
                    }}
                >
                    <AppSidebar height={height} />
                    <main className={'p-4'}>
                        <h1>User dashboard</h1>
                    </main>
                </SidebarProvider>
            )}
        </AccountLayout>
    );
}
