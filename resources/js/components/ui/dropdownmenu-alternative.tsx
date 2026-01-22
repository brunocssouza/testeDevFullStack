import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "./button";
import { DropdownItem } from "./dropdown-item";

export default function DropdownMenuAlternative() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button variant="outline">
                    Options
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white p-4 shadow-md">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Duplicate</DropdownItem>
                <DropdownMenu.Separator />
                <DropdownItem>Archive</DropdownItem>

                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                        <DropdownItem>Move to project…</DropdownItem>
                        <DropdownItem>Move to folder…</DropdownItem>

                        <DropdownMenu.Separator />
                        <DropdownItem>Advanced options…</DropdownItem>
                    </DropdownMenu.SubContent>
                </DropdownMenu.Sub>

                <DropdownMenu.Separator />
                <DropdownItem>Share</DropdownItem>
                <DropdownItem>Add to favorites</DropdownItem>
                <DropdownMenu.Separator />
                <DropdownItem>Delete</DropdownItem>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}