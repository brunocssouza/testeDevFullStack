import { canDeleteUser, canEditUser } from '@/lib/permissions';
import type { User } from '@/types/user';
import { UserListItem } from './user-list-item';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onRemove: (user: User) => void;
    currentUserId?: number;
    currentUserRole?: string;
}

export function UserList({
    users,
    onEdit,
    onRemove,
    currentUserId,
    currentUserRole,
}: UserListProps) {
    return (
        <div className="overflow-auto rounded-lg bg-white dark:bg-slate-900">
            <h1 className="mb-4 text-2xl font-bold">Usuários</h1>
            {users.length === 0 ? (
                <p className="p-4 text-center text-gray-500">
                    Nenhum usuário encontrado
                </p>
            ) : (
                <ul className="space-y-2">
                    {users.map((user) => {
                        const canEdit = canEditUser(
                            currentUserRole,
                            currentUserId,
                        );
                        const canDelete = canDeleteUser(currentUserRole);

                        return (
                            <UserListItem
                                key={user.id}
                                user={user}
                                onEdit={onEdit}
                                onRemove={onRemove}
                                canEdit={canEdit}
                                canDelete={canDelete}
                            />
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
