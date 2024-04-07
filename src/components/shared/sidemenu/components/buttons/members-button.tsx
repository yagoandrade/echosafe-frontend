import { Button } from "@/components/ui/button";
import { UsersRound } from "lucide-react";
import Link from "next/link";

const SidemenuMembersButton = () => {
  return (
    <Button
      variant="sidemenu"
      size="sm"
      className="justify-start gap-x-3 px-6"
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
