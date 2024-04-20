import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidemenuPricingButton = () => {
  const pathname = usePathname();

  return (
    <Button
      variant="sidemenu"
      size="sm"
      className={cn(
        "flex w-full justify-start gap-x-3 px-6 text-muted-foreground dark:text-[#cbccd9]",
        pathname === "/pricing" &&
          "dark:bg-primary-background border-primary-background border bg-primary-foreground font-medium text-[#1994ff] dark:border-primary-foreground dark:bg-opacity-10",
      )}
      asChild
    >
      <Link href="/pricing">
        <BadgeDollarSign className="h-4 w-4" />
        <p>Pricing</p>
      </Link>
    </Button>
  );
};

export default SidemenuPricingButton;
