import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SidemenuSearchButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="sidemenu"
        size="sm"
        className={cn(
          "justify-start gap-x-3 px-6",
          open &&
            "dark:bg-primary-background bg-primary-foreground dark:bg-opacity-10",
        )}
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
        <p>Search</p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <Link href="/institution/create">
              <CommandItem>Create a Institution</CommandItem>
            </Link>
            <Link href="/report/create">
              <CommandItem>Create a Report</CommandItem>
            </Link>
            <Link href="/dashboard">
              <CommandItem>Dashboard</CommandItem>
            </Link>
            <Link href="/institutions">
              <CommandItem>Manage Institutions</CommandItem>
            </Link>
            <Link href="/members">
              <CommandItem>Members</CommandItem>
            </Link>
            <Link href="/reports">
              <CommandItem>Reports</CommandItem>
            </Link>
            <Link href="/settings">
              <CommandItem>Settings</CommandItem>
            </Link>
            <Link href="/auth/api/signout">
              <CommandItem>Sign Out</CommandItem>
            </Link>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SidemenuSearchButton;
