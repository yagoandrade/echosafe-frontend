"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidemenuMembersButton = () => {
  const pathname = usePathname();

  return (
    <Button
      variant="sidemenu"
      size="sm"
      className={cn(
        "flex justify-start gap-x-3 px-6",
        pathname === "/members" &&
          "dark:bg-primary-background bg-primary-foreground dark:bg-opacity-10",
      )}
      asChild
    >
      <Link href="/members">
        <UsersRound className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
        <p>Members</p>
      </Link>
    </Button>
  );
};

export default SidemenuMembersButton;
