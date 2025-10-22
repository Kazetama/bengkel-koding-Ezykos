import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, Home, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const userType = auth?.user?.usertype ?? 'user';

    // Tentukan navigasi utama sesuai role
    let mainNavItems: NavItem[] = [];

    if (userType === 'admin') {
        mainNavItems = [
            {
                title: 'Dashboard Admin',
                href: '/admin/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Manage Users',
                href: '/admin/users',
                icon: Folder,
            },
        ];
    } else if (userType === 'owner') {
        mainNavItems = [
            {
                title: 'Dashboard Owner',
                href: '/owner/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Data Kos',
                href: '/owner/kos',
                icon: Home,
            },
        ];
    } else {
        mainNavItems = [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ];
    }

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
