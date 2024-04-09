import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";

const SidemenuSettingsButton = () => {
  return (
    <Button
      variant="sidemenu"
      size="sm"
      className="justify-start gap-x-3 px-6"
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
