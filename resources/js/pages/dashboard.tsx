/* eslint-disable import/order */
import { Button } from '@/components/ui/button';
import DropdownMenuAlternative from '@/components/ui/dropdownmenu-alternative';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';

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

    const [usersFiltered, setUsersFiltered] = useState(users);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-6">
                    <div className="inline-flex w-full">
                        <div className="flex-1 rounded-l-lg border bg-white p-4 dark:bg-slate-900">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Atualmente logado como
                            </p>
                            <p className="text-lg font-semibold">
                                {auth.user?.role}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-auto rounded-lg bg-white dark:bg-slate-900">
                    <h1 className="mb-4 text-2xl font-bold">Usuários</h1>

                    <div className="mb-4 inline-flex w-full rounded border px-4">
                        <div className="my-4 flex flex-2/6 flex-col">
                            <Label htmlFor="name" className="text-sm text-gray-600 dark:text-gray-400">Buscar nome</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                className="mt-2 rounded-sm border-2 py-4 font-light text-black"
                                onChange={(e) =>
                                    setUsersFiltered(
                                        users.filter((user) =>
                                            user.name
                                                .toLocaleLowerCase()
                                                .includes(
                                                    e.currentTarget.value.toLowerCase(),
                                                ),
                                        ),
                                    )
                                }
                            ></Input>
                        </div>
                        <div className="flex-2/6 rounded-r-lg bg-white p-4 dark:bg-slate-900 flex justify-center flex-col items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Usuários encontrados
                            </p>
                            <p className="text-lg font-bold">{usersFiltered.length}</p>
                        </div>
                        <div className="flex flex-2/6 items-center justify-end">
                            <Button className="bg-green-600 hover:bg-green-700 transition-colors">
                                <UserPlus></UserPlus>
                                Cadastrar novo
                            </Button>
                        </div>
                    </div>

                    <ul>
                        {usersFiltered.map((user) => (
                            <li
                                key={user.id}
                                className="border-b bg-slate-100 hover:bg-gray-50"
                            >
                                <div className="inline-flex w-full">
                                    <div className="flex flex-1/12 justify-center rounded-l-lg p-4">
                                        <div className="flex size-14 items-center justify-center rounded-full bg-orange-500">
                                            <svg
                                                viewBox="0 0 15 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                                                    fill="currentColor"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    className="text-white"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="flex-10/12 rounded-l-lg p-4">
                                        <p className="text-sm">{user.email}</p>
                                        <p className="text-xl font-medium">
                                            {user.name}
                                        </p>
                                    </div>
                                    <div className="flex flex-1/12 items-center justify-center px-4">
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
