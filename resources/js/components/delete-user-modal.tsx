import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import type { User } from '@/types/user';
import { router } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface DeleteUserModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User | null;
    onSuccess?: () => void;
    isSame: boolean;
    isLastAdmin: boolean;
}

export function DeleteUserModal({
    open,
    onOpenChange,
    user,
    onSuccess,
    isSame,
    isLastAdmin,
}: DeleteUserModalProps) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        if (!user) return;

        setProcessing(true);

        router.delete(`/users/${user.id}`, {
            onSuccess: () => {
                setProcessing(false);
                onOpenChange(false);
                onSuccess?.();
                if (isSame) {
                    router.post(logout().url);
                } else {
                    router.reload({ only: ['users'] });
                }
            },
            onError: () => {
                setProcessing(false);
            },
        });
    };

    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <DialogTitle>Confirmar exclusão</DialogTitle>
                            <DialogDescription>
                                Esta ação não pode ser desfeita.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="py-4">
                    {isSame && (
                        <p className="rounded bg-yellow-500 p-2 text-sm font-semibold text-white">
                            Você está prestes a excluir a conta que você está
                            conectado!
                        </p>
                    )}
                    {isLastAdmin && (
                        <p className="mt-4 rounded bg-red-500 p-2 text-sm font-semibold text-white">
                            Este é o último usuário do tipo Administrador. Caso
                            removido, o acesso a funcionalidades será limitado.
                        </p>
                    )}

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                        Tem certeza que deseja excluir o usuário {" "}
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {user.name}
                        </span>
                        ?
                    </p>

                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Todos os dados relacionados serão permanentemente
                        removidos.
                    </p>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={processing}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={processing}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {processing && <Spinner />}
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
