"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { School } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidemenuManageInstitutionsButton = () => {
  const pathname = usePathname();

  return (
    <Button
      variant="sidemenu"
      size="sm"
      className={cn(
        "flex w-full justify-start gap-x-3 px-6",
        pathname === "/institutions" &&
          "dark:bg-primary-background bg-primary-foreground dark:bg-opacity-10",
      )}
      asChild
    >
      <Link href="/institutions">
        <School className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
        <p>My Institutions</p>
      </Link>
    </Button>
  );
};

export default SidemenuManageInstitutionsButton;
