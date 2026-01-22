import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login';
import { Form, Head } from '@inertiajs/react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status }: Props) {
    return (
        <AuthLayout
            title="FAÇA O SEU LOGIN"
            description="Enter your cpf and password below to log in"
        >
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Input
                                    id="cpf"
                                    type="text"
                                    name="cpf"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    placeholder="CPF"
                                    maxLength={'11'}
                                    theme={1}
                                />
                                
                            </div>

                            <div className="grid gap-2">
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Senha"
                                    theme={1}
                                />
                                <InputError message={errors.cpf && 'CPF inválido'} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 rounded-4xl bg-linear-to-r from-neutral-700 from-0% via-neutral-800 via-25% to-neutral-900 to-100% py-6 text-lg tracking-widest transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Acesse agora
                            </Button>
                        </div>

                        <a
                            href="#"
                            className="mb-4 text-center text-white hover:underline"
                        >
                            Esqueci meu login ou senha
                        </a>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
