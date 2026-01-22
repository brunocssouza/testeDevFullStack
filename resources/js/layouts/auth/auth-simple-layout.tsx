import { Link } from '@inertiajs/react';

import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-linear-to-r from-zinc-800 from-0% via-neutral-500 via-50% to-zinc-800 to-100% p-6 md:p-10">
            <div className="w-3/12 rounded-2xl bg-linear-to-r from-amber-600 from-0% via-amber-600 via-25% to-amber-400 to-100% px-4 py-2">
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
                            <h1 className="text-2xl font-medium text-white tracking-widest">{title}</h1>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
