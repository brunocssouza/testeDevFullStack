import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "./button";
import { DropdownItem } from "./dropdown-item";

interface DropdownMenuAlternativeProps {
    onEdit?: () => void;
    onRemove?: () => void;
}

export default function DropdownMenuAlternative({ onEdit, onRemove }: DropdownMenuAlternativeProps) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button variant="outline" className="bg-gray-500 text-white font-light hover:bg-gray-700 hover:text-white">
                    Ações
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white shadow-md px-2 space-y-2 py-2 animate-fade-in">
                <DropdownItem onClick={onEdit}>Editar</DropdownItem>
                <DropdownItem onClick={onRemove}>Remover</DropdownItem>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}