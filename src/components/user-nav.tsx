"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { ChevronsUpDown } from "lucide-react";
import { type DefaultSession } from "next-auth";
import Link from "next/link";
import { toast } from "sonner";

interface UserNavProps {
  user: DefaultSession["user"];
  isExtended?: boolean;
}

export function UserNav({ user, isExtended = false }: Readonly<UserNavProps>) {
  const userRoleQuery = api.post.getUserRole.useQuery();
  const activeInstitutionFromDB = api.post.getActiveInstitution.useQuery();

  const handleCopyInstitutionCode = async () => {
    if (!activeInstitutionFromDB.data) {
      toast.error("No active institution");
      return;
    }

    await navigator.clipboard.writeText(activeInstitutionFromDB.data.code);
    toast.success(
      `The code of ${activeInstitutionFromDB.data.name} has been copied to clipboard`,
    );
  };

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
            <p className="truncate text-sm font-medium text-primary dark:text-[#cbccd9]">
              {user?.name}
            </p>
          )}
          <ChevronsUpDown className="ml-auto h-4 w-4 min-w-fit text-muted-foreground dark:text-[#cbccd9]" />
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
            {user?.email && (
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {userRoleQuery.data !== "STUDENT" && (
            <>
              <DropdownMenuItem onClick={handleCopyInstitutionCode}>
                Copy your Institution&apos;s Code
              </DropdownMenuItem>
              <Link href="/institution/create">
                <DropdownMenuItem>Create a Institution</DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="/api/auth/signout">
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
