import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";

interface DropdownItemProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

export function DropdownItem({ children, onClick, className = "" }: DropdownItemProps) {
    return (
        <DropdownMenu.Item
            onClick={onClick}
            className={`px-2 py-2 text-sm cursor-pointer rounded flex items-center gap-2 outline-none hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700 transition-colors ${className}`}
        >
            {children}
        </DropdownMenu.Item>
    );
}
