import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard Admin', href: dashboard().url },
    { title: 'Manage Users', href: '/admin/users' },
];

interface User {
    id: number;
    name: string;
    email: string;
    usertype: 'admin' | 'owner' | 'user';
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

interface Pagination<T> {
    data: T[];
    links?: PaginationLink[];
    meta?: PaginationMeta;
}

interface Props {
    users: Pagination<User> | User[];
    filters: {
        search?: string;
    };
}

export default function UsersIndex({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get('/admin/users', { search }, { preserveState: true });
    };

    const userList: User[] = Array.isArray(users) ? users : users.data ?? [];

    const handleRoleChange = (id: number, newRole: User['usertype']) => {
        router.post(
            `/admin/users/${id}/role`,
            { usertype: newRole },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => console.log(`Role updated to ${newRole}`),
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users" />

            <div className="flex flex-col gap-8 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            User Management
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage registered users and their roles efficiently
                        </p>
                    </div>
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search name or email..."
                            className="w-64 rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                    <table className="w-full border-collapse text-sm">
                        <thead className="bg-muted/40 border-b border-border text-left">
                            <tr>
                                <th className="px-4 py-3 font-medium w-12">#</th>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Role</th>
                                <th className="px-4 py-3 font-medium">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.length > 0 ? (
                                userList.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-border hover:bg-muted/20 transition-colors"
                                    >
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-foreground">
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={user.usertype}
                                                onChange={(e) =>
                                                    handleRoleChange(user.id, e.target.value as User['usertype'])
                                                }
                                                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:ring-primary focus:outline-none"
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="owner">Owner</option>
                                                <option value="user">User</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-10 text-center text-muted-foreground"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!Array.isArray(users) && users.links && (
                    <div className="flex justify-center mt-4">
                        <div className="flex items-center gap-2 text-sm">
                            {users.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() =>
                                        link.url && router.visit(link.url, { preserveState: true })
                                    }
                                    className={`px-3 py-1.5 rounded-md ${
                                        link.active
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted text-foreground'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
