import { ReactNode } from "react";

export interface MobileMenuItemProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  badgeContent?: string | number;
  badgeVariant?: "primary" | "outline";
  buttonVariant?:
    | "link"
    | "primary"
    | "secondary"
    | "black"
    | "destructive"
    | "outline"
    | "ghost"
    | "wrapper";
  isMobile?: boolean;
  mobileClasses?: string;
}

export interface MobileMenuSectionProps {
  title: string;
  children: ReactNode;
}
