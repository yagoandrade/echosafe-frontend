import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { CheckCheck, Mail } from "lucide-react";
import Avatar from "../avatar";
import { Button } from "../button";
import { mockData } from "./mock";

export default function Inbox() {
  let numberOfUnreadMessages = 2;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 pt-3 outline-0">
        <div className="relative inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-white outline-none">
          <Mail color="#3f3f46" className="size-6" />
          <span className="sr-only">Caixa de Entrada</span>
          <div
            className={cn(
              "absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#4F46E5] border border-white rounded-full -top-2 -end-2 dark:border-gray-900",
              numberOfUnreadMessages === 0 && "hidden",
              numberOfUnreadMessages >= 100 && "w-fit px-1"
            )}
          >
            {numberOfUnreadMessages < 100 ? numberOfUnreadMessages : "99+"}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-mt-1">
        <DropdownMenuLabel>
          Caixa de Entrada ({numberOfUnreadMessages})
        </DropdownMenuLabel>
        <div className="max-h-[53vh] max-w-[22rem] overflow-y-auto">
          {mockData.map((message) => {
            const datetime = new Date(message.date);
            const date = datetime.toLocaleDateString();
            const time = datetime
              .toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })
              .toLowerCase();

            return (
              <div key={message.id}>
                <DropdownMenuSeparator className="w-full" />
                <DropdownMenuItem className="flex cursor-pointer gap-x-4">
                  <Avatar src={message.sender.avatarImgSrc} />
                  <div className="space-y-1">
                    <div className="flex w-full justify-between gap-x-3">
                      <span className="space-y-1">
                        <p className="text-xs font-light">
                          #{message.reportId}
                        </p>
                        <p className="text-sm font-bold">
                          {message.sender.fullName}
                        </p>
                      </span>
                      <p className="text-xs text-[#71717A]">{`${date} às ${time}`}</p>
                    </div>
                    <p className="w-full text-sm">{message.content}</p>
                  </div>
                </DropdownMenuItem>
              </div>
            );
          })}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button variant="primary" size="fullWidth" className="gap-x-4">
            <CheckCheck />
            Marcar todas como lidas
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
