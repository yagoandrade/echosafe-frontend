import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";

interface SidemenuCreateReportButtonProps {
  className?: string;
}

const SidemenuCreateReportButton = ({
  className,
}: SidemenuCreateReportButtonProps) => {
  return (
    <Button
      variant="sidemenu"
      size="sm"
      className={cn("justify-start gap-x-3 px-6", className)}
      asChild
    >
      <Link href="/report/create">
        <MessageSquarePlus className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
        <p>Create a Report</p>
      </Link>
    </Button>
  );
};

export default SidemenuCreateReportButton;
