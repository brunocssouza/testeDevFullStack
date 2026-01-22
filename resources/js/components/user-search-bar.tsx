import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { UserPlus } from 'lucide-react';

interface UserSearchBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    userCount: number;
    onCreateClick: () => void;
}

export function UserSearchBar({
    searchValue,
    onSearchChange,
    userCount,
    onCreateClick,
}: UserSearchBarProps) {
    return (
        <div className="mb-4 inline-flex w-full rounded border px-4">
            <div className="my-4 flex flex-2/6 flex-col">
                <Label
                    htmlFor="name"
                    className="text-sm text-gray-600 dark:text-gray-400"
                >
                    Buscar nome
                </Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    value={searchValue}
                    className="mt-2 rounded-sm border-2 py-4 font-light text-black"
                    onChange={(e) => onSearchChange(e.currentTarget.value)}
                />
            </div>
            <div className="flex flex-2/6 flex-col items-center justify-center rounded-r-lg bg-white p-4 dark:bg-slate-900">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Usuários encontrados
                </p>
                <p className="text-lg font-bold">{userCount}</p>
            </div>
            <div className="flex flex-2/6 items-center justify-end">
                <Button
                    onClick={onCreateClick}
                    className="bg-green-600 transition-colors hover:bg-green-700"
                >
                    <UserPlus />
                    Cadastrar novo
                </Button>
            </div>
        </div>
    );
}
