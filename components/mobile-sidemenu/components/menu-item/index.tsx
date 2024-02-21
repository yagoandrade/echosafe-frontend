import Link from "next/link";
import { Button } from "@/components/button";
import { DrawerClose } from "@/components/ui/drawer";
import { MobileMenuItemProps } from "./types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const MenuItem: React.FC<MobileMenuItemProps> = ({
  href,
  icon,
  children,
  badgeContent,
  badgeVariant,
  buttonVariant = "link",
  mobileClasses,
}) => {
  return (
    <DrawerClose className="flex w-full items-center gap-x-3" asChild>
      <Button
        asChild
        variant={buttonVariant}
        size="fullWidth"
        className={cn(
          buttonVariant === "primary"
            ? "justify-center"
            : `justify-start gap-x-4 px-4 rounded-none py-8 active:scale-[1] active:text-[#4F46E5] text-decoration- ${mobileClasses}`
        )}
      >
        <Link href={href}>
          {icon}
          {children}
          {badgeContent && (
            <Badge
              variant={badgeVariant ?? "outline"}
              className={"pointer-events-none absolute right-0 mr-4"}
            >
              {badgeContent}
            </Badge>
          )}
        </Link>
      </Button>
    </DrawerClose>
  );
};

export default MenuItem;
