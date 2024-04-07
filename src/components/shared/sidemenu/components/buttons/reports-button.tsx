import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";

const SidemenuReportsButton = () => {
  const reports = {
    count: 5,
  };

  return (
    <Button
      variant="sidemenu"
      size="sm"
      className="justify-start gap-x-3 px-6"
      asChild
    >
      <Link href="/reports">
        <MessagesSquare className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
        <p>Reports</p>
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#575bc7] text-xs text-white">
          <p>{reports.count > 99 ? "+99" : reports.count}</p>
        </span>
      </Link>
    </Button>
  );
};

export default SidemenuReportsButton;
