import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidemenuCreateReportButtonProps {
  className?: string;
}

const SidemenuCreateReportButton = ({
  className,
}: SidemenuCreateReportButtonProps) => {
  const pathname = usePathname();

  return (
    <Button
      variant="sidemenu"
      size="sm"
      className={cn(
        "flex w-full justify-start gap-x-3 px-6 text-muted-foreground",
        pathname === "/report/create" &&
          "border-primary-background border bg-primary-foreground font-medium text-[#1994ff]",
        className,
      )}
      asChild
    >
      <Link href="/report/create">
        <MessageSquarePlus className="h-4 w-4" />
        <p>Create a Report</p>
      </Link>
    </Button>
  );
};

export default SidemenuCreateReportButton;
