import { Button } from "@/components/ui/button";
import { Archive } from "lucide-react";
import Link from "next/link";

const SidemenuArchivedReportsButton = () => {
  return (
    <Button
      variant="sidemenu"
      size="sm"
      className="justify-start gap-x-3 px-6"
      asChild
    >
      <Link href="/archived">
        <Archive className="h-4 w-4" />
        <p>Archived Reports</p>
      </Link>
    </Button>
  );
};

export default SidemenuArchivedReportsButton;
