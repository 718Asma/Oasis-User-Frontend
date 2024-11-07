import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bell } from "lucide-react";

export function Notification() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Bell className="h-6 w-6" />
                    <div className="absolute top-[33px] right-[115px] h-2 w-2 bg-red-500 rounded-full"></div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    Notification 1
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}