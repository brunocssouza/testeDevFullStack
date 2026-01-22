import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({ children, title }: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-linear-to-r from-zinc-800 from-0% via-neutral-500 via-50% to-zinc-800 to-100% p-6 md:p-10">
            <header className="absolute top-0 left-0 z-50 w-full">
                <nav className="flex items-center justify-between px-6 py-4">
                    <Link href={home()} className="flex items-center gap-2">
                        <img
                            src="/logo_senac.png"
                            alt="Logo"
                            className="h-12 w-auto"
                        />
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            href={'#'}
                            className="text-sm font-medium text-white hover:opacity-80"
                        >
                            Política de Privacidade
                        </Link>
                        <span className="text-white">|</span>
                        <Link
                            href={'#'}
                            className="text-sm font-medium text-white hover:opacity-80"
                        >
                            Termos de Uso
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="w-8/12 rounded-2xl bg-linear-to-r from-amber-600 from-0% via-amber-600 via-25% to-amber-400 to-100% px-4 py-2 lg:w-3/12">
                <div className="flex flex-col gap-8 px-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex items-center justify-center rounded-md">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="h-full w-full"
                                />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-medium tracking-widest text-white">
                                {title}
                            </h1>
                        </div>
                    </div>
                    {children}
                </div>
            </div>

            <footer className="absolute bottom-0 left-0 z-50 w-full">
                <div className="flex items-center px-6 py-4 text-sm text-white">
                    <span className='flex-1/3'></span>
                    <span className='flex-1/3 text-center'>Desenvolvido por Senac RS</span>

                    <div className="flex justify-end gap-4 flex-1/3">
                        <Button className="rounded-4xl bg-linear-to-r from-amber-600 from-0% via-amber-600 via-25% to-amber-400 to-100% px-6 transition-all duration-300 hover:-translate-y-1">
                            <span className='font-extrabold'>?</span>AJUDA
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
