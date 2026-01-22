import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

type Props = {
  status?: string;
  canResetPassword: boolean;
  canRegister: boolean;
};

export default function Login({ status }: Props) {
  const form = useForm({
    cpf: '',
    password: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post('/login'); // ou route('login.store')
  };

  return (
    <AuthLayout
      title="FAÇA O SEU LOGIN"
      description="Enter your cpf and password below to log in"
    >
      <Head title="Log in" />

      <form onSubmit={submit} className="flex flex-col gap-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Input
              id="cpf"
              type="text"
              name="cpf"
              value={form.data.cpf}
              onChange={(e) => form.setData('cpf', e.target.value)}
              required
              autoFocus
              tabIndex={1}
              placeholder="CPF"
              maxLength={11}
              theme={1}
            />
            <InputError message={form.errors.cpf && 'CPF inválido'} />
          </div>

          <div className="grid gap-2">
            <Input
              id="password"
              type="password"
              name="password"
              value={form.data.password}
              onChange={(e) => form.setData('password', e.target.value)}
              required
              tabIndex={2}
              autoComplete="current-password"
              placeholder="Senha"
              theme={1}
            />
            <InputError message={form.errors.password} />
          </div>

          <Button
            type="submit"
            className="mt-4 rounded-4xl bg-linear-to-r from-neutral-700 from-0% via-neutral-800 via-25% to-neutral-900 to-100% py-6 text-lg tracking-widest transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
            tabIndex={4}
            disabled={form.processing}
          >
            {form.processing && <Spinner />}
            Acesse agora
          </Button>
        </div>

        <a
          href="#"
          className="mb-4 text-center text-white hover:underline"
        >
          Esqueci meu login ou senha
        </a>
      </form>

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}
    </AuthLayout>
  );
}
