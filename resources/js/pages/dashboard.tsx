/* eslint-disable import/order */
import { UserList } from '@/components/user-list';
import { UserModal } from '@/components/user-modal';
import { UserRoleCard } from '@/components/user-role-card';
import { UserSearchBar } from '@/components/user-search-bar';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, SharedData } from '@/types';
import type { User } from '@/types/user';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
    const [searchValue, setSearchValue] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        setUsersFiltered(users);
    }, [users]);

    useEffect(() => {
        if (searchValue.trim() === '') {
            setUsersFiltered(users);
        } else {
            setUsersFiltered(
                users.filter((user) =>
                    user.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()),
                ),
            );
        }
    }, [searchValue, users]);

    const handleCreateClick = () => {
        setEditingUser(null);
        setModalOpen(true);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setModalOpen(true);
    };

    const handleRemove = (user: User) => {
        // TODO: Implementar remoção
        console.log('Remove user:', user);
    };

    const handleModalClose = (open: boolean) => {
        setModalOpen(open);
        if (!open) {
            setEditingUser(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <UserRoleCard role={auth.user?.role} />

                <UserSearchBar
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    userCount={usersFiltered.length}
                    onCreateClick={handleCreateClick}
                />

                <UserList
                    users={usersFiltered}
                    onEdit={handleEdit}
                    onRemove={handleRemove}
                />

                <UserModal
                    mode={editingUser ? 'edit' : 'create'}
                    open={modalOpen}
                    onOpenChange={handleModalClose}
                    user={editingUser}
                />
            </div>
        </AppLayout>
    );
}
