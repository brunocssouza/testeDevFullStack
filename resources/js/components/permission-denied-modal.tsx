import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';

interface PermissionDeniedModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    message?: string;
}

export function PermissionDeniedModal({
    open,
    onOpenChange,
    message = 'Você não tem permissão para realizar esta ação.',
}: PermissionDeniedModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                            <DialogTitle>Acesso negado</DialogTitle>
                            <DialogDescription>
                                Você não possui permissão suficiente.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {message}
                    </p>
                </div>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>
                        Entendi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
