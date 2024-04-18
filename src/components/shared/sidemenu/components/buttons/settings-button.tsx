import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidemenuSettingsButton = () => {
  const pathname = usePathname();

  return (
    <Button
      variant="sidemenu"
      size="sm"
      className={cn(
        "flex w-full justify-start gap-x-3 px-6",
        pathname === "/settings" &&
          "dark:bg-primary-background bg-primary-foreground dark:bg-opacity-10",
      )}
      asChild
    >
      <Link href="/settings">
        <Settings className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
        <p>Settings</p>
      </Link>
    </Button>
  );
};

export default SidemenuSettingsButton;
