/* eslint-disable import/order */
import DropdownMenuAlternative from '@/components/ui/dropdownmenu-alternative';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    cpf?: string;
    created_at: string;
}

interface DashboardProps {
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ users }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-6">
                    <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
                    <div className="inline-flex w-full">
                        <div className="flex-1 rounded-l-lg border bg-white p-4 dark:bg-slate-900">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Atualmente logado como
                            </p>
                            <p className="text-lg font-semibold">
                                {auth.user?.role}
                            </p>
                        </div>
                        <div className="flex-1 rounded-r-lg border bg-white p-4 dark:bg-slate-900">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Total de Usuários
                            </p>
                            <p className="text-3xl font-bold">{users.length}</p>
                        </div>
                    </div>
                </div>

                <div className="overflow-auto rounded-lg border bg-white dark:bg-slate-900">
                    <ul>
                        {users.map((user) => (
                            <li
                                key={user.id}
                                className="border-b bg-slate-100 hover:bg-gray-50"
                            >
                                <div className="inline-flex w-full">
                                    <div className="flex-1 rounded-l-lg p-4">
                                        <p className="text-sm text-gray-600">
                                            {user.email}
                                        </p>
                                        <p className="text-lg font-semibold">
                                            {user.name}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center px-4">
                                        <DropdownMenuAlternative></DropdownMenuAlternative>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
