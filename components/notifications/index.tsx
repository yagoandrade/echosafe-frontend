import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { Bell } from "lucide-react";

export default function Notifications() {
  let quantity = 2;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 pt-3 outline-0">
        <div className="relative inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-white outline-none">
          <Bell color="#3f3f46" className="size-6" />
          <span className="sr-only">Notificações</span>
          <div
            className={cn(
              "absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#4F46E5] border border-white rounded-full -top-2 -end-2 dark:border-gray-900",
              quantity === 0 && "hidden",
              quantity >= 100 && "w-fit px-1"
            )}
          >
            {quantity < 100 ? quantity : "99+"}
          </div>
        </div>
      </DropdownMenuTrigger>
      {/* TODO: Readicionar quando tivermos o módulo de notificações pronto <DropdownMenuContent className="-mt-1">
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent> */}
    </DropdownMenu>
  );
}
