import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword
}: Props) {
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
                                />
                                <InputError message={errors.cpf} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Senha"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Lembrar-me</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 py-6 bg-linear-to-r from-neutral-700 from-0% via-neutral-800 via-25% to-neutral-900 to-100% rounded-4xl tracking-widest text-lg"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Acesse agora
                            </Button>
                        </div>

                        <a href="#" className="hover:underline text-white text-center mb-4">Esqueci meu login ou senha</a>
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
