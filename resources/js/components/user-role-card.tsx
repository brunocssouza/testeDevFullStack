interface UserRoleCardProps {
    role?: string;
}

export function UserRoleCard({ role }: UserRoleCardProps) {
    return (
        <div className="mb-6">
            <div className="inline-flex w-full">
                <div className="flex-1 rounded-l-lg border bg-white p-4 dark:bg-slate-900">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Atualmente logado como
                    </p>
                    <p className="text-lg font-semibold">{role}</p>
                </div>
            </div>
        </div>
    );
}
