import { Form, router } from '@inertiajs/react';
import { PatternFormat } from 'react-number-format';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/users';

interface UserModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: 'create' | 'edit';
    user?: any;
    onSuccess?: (isEdit: boolean) => void;
    currentUserRole: string | undefined;
}

export function UserModal({
    open,
    onOpenChange,
    mode = 'create',
    user,
    onSuccess,
    currentUserRole,
}: UserModalProps) {
    const isEdit = mode === 'edit';
    const isSuperior = user?.role == "Administrador" && currentUserRole != "Administrador"

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Editar usuário' : 'Criar nova conta'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? 'Atualize os dados do usuário'
                            : 'Preencha os dados abaixo para cadastrar um novo usuário'}
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...(isEdit
                        ? {
                              action: `/users/${user?.id}`,
                              method: 'put',
                          }
                        : store.form())}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-4"
                    transform={(data) => {
                        const transformed = {
                            ...data,
                            cpf: data.cpf?.replace(/\D/g, '') || '', // remove tudo que não é dígito
                        };
                        // Remove password fields if empty in edit mode
                        if (isEdit && !data.password) {
                            delete transformed.password;
                            delete transformed.password_confirmation;
                        }
                        return transformed;
                    }}
                    onSuccess={() => {
                        onOpenChange(false);
                        router.reload({ only: ['users'] });
                        onSuccess?.(isEdit);
                    }}
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Nome completo"
                                        defaultValue={isEdit ? user?.name : ''}
                                        disabled={isSuperior}
                                        className="text-black"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@example.com"
                                        defaultValue={isEdit ? user?.email : ''}
                                        disabled={isSuperior}
                                        className="text-black"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="cpf">CPF</Label>
                                    <PatternFormat
                                        format="###.###.###-##"
                                        mask={'_'}
                                        id="cpf"
                                        type="text"
                                        required
                                        autoComplete="off"
                                        name="cpf"
                                        placeholder="000.000.000-00"
                                        defaultValue={isEdit ? user?.cpf : ''}
                                        disabled={isSuperior}
                                        className="md:text-md tracking flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-6 text-base font-normal text-black shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:text-foreground placeholder:text-white focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
                                    />
                                    <InputError message={errors.cpf} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="role">
                                        Nível de permissão
                                    </Label>
                                    <select
                                        name="role"
                                        defaultValue={isEdit ? user?.role : ''}
                                        disabled={isSuperior}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base text-black shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="Administrador">
                                            Administrador
                                        </option>
                                        <option value="Moderador">
                                            Moderador
                                        </option>
                                        <option value="Leitor">Leitor</option>
                                    </select>
                                    <InputError message={errors.role} />
                                </div>
                                {!isEdit && (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">Senha</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                autoComplete="new-password"
                                                name="password"
                                                placeholder="Senha"
                                                className="text-black"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password_confirmation">
                                                Confirmar senha
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                required
                                                autoComplete="new-password"
                                                name="password_confirmation"
                                                placeholder="Confirmar senha"
                                                className="text-black"
                                            />
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                            />
                                        </div>
                                    </>
                                )}
                                {isEdit && (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">
                                                Nova senha (opcional)
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                autoComplete="new-password"
                                                name="password"
                                                placeholder="Deixe em branco para manter a senha atual"
                                                className="text-black"
                                                disabled={isSuperior}
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password_confirmation">
                                                Confirmar nova senha
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                autoComplete="new-password"
                                                name="password_confirmation"
                                                placeholder="Confirmar nova senha"
                                                className="text-black"
                                                disabled={isSuperior}
                                            />
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                            />
                                        </div>
                                    </>
                                )}

                                <Button
                                    type="submit"
                                    className="mt-2 w-full bg-green-600 hover:bg-green-700"
                                    disabled={processing || isSuperior}
                                >
                                    {processing && <Spinner />}
                                    {isEdit ? 'Atualizar' : 'Criar conta'}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
