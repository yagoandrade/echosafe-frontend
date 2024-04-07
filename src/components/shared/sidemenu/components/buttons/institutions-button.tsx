import { Button } from "@/components/ui/button";
import { School } from "lucide-react";
import Link from "next/link";

const SidemenuManageInstitutionsButton = () => {
  return (
    <Button
      variant="sidemenu"
      size="sm"
      className="justify-start gap-x-3 px-6"
      asChild
    >
      <Link href="/manage-institutions">
        <School className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
        <p>My Institutions</p>
      </Link>
    </Button>
  );
};

export default SidemenuManageInstitutionsButton;
