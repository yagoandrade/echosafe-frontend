import { Badge } from "@/components/ui/badge";
import { Button } from "../../../button";
import Link from "next/link";
import type { MenuItemProps } from "./types";

const MenuItem: React.FC<MenuItemProps> = ({ href, icon, children, badgeContent, badgeVariant, buttonVariant = "link" }) => {
  return (
    <div className="flex w-full items-center gap-x-3">
      <Button
        asChild
        variant={buttonVariant}
        size="fullWidth"
        className={`justify-start gap-x-4 ${buttonVariant === "primary" ? 'justify-center' : ''}`}
      >
        <Link href={href}>
          {icon}
          {children}
        </Link>
      </Button>
      {badgeContent && (
        <Badge
          variant={badgeVariant || "outline"}
          className={`${
            badgeVariant === "primary" ? "size-7 rounded-full text-sm" : "hidden size-fit xl:flex"
          } pointer-events-none`}
        >
          {badgeContent}
        </Badge>
      )}
    </div>
  );
};

export default MenuItem;
