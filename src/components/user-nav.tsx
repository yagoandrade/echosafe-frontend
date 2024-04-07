import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import { type DefaultSession } from "next-auth";
import Link from "next/link";

interface UserNavProps {
  user: DefaultSession["user"];
  isExtended?: boolean;
}

export function UserNav({ user, isExtended = false }: Readonly<UserNavProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="sidemenu" size="fullSize" className="gap-x-3">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={user?.image ?? ""}
              alt={`${user?.name ?? "User"}'s avatar`}
            />
          </Avatar>
          {isExtended && (
            <p className="w-full truncate text-sm font-medium text-primary dark:text-[#cbccd9]">
              {user?.name}
            </p>
          )}
          <ChevronsUpDown className="h-4 w-4 min-w-fit text-muted-foreground dark:text-[#cbccd9]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border border-[#e4e4e7] dark:border-[#303146] dark:bg-gradient-to-b dark:from-[#252634] dark:to-[#16171a]"
        align="center"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name ?? "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ?? "me@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Invite a member
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>Create a Institution</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="/api/auth/signout">
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
