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
import { type DefaultSession } from "next-auth";
import Link from "next/link";

interface UserNavProps {
  user: DefaultSession["user"];
  isExtended: boolean;
}

export function UserNav({ user, isExtended = false }: Readonly<UserNavProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 gap-x-3 rounded-full"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user?.image ?? ""}
              alt={`${user?.name ?? "User"}'s avatar`}
            />
          </Avatar>
          {isExtended && (
            <span className="text-sm">
              <p className="font-normal text-[#cbccd9]">{user?.name}</p>
              <p className="font-light text-[#949da7]">{user?.email}</p>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border border-[#303146] bg-gradient-to-b from-[#252634] to-[#16171a]"
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
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
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
