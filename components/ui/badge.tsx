import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:text-xs",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        primary:
          "flex items-center justify-center border-transparent bg-[#4F46E5] text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline:
          "border-2 border-[#4F46E5] font-medium text-[#4F46E5] text-foreground",
        open: "gap-x-1 bg-[#fff] py-1 text-xs text-[#000]",
        under_review: "gap-x-1 bg-[#FEF9C3] py-1 text-xs text-[#423606]",
        waiting: "gap-x-1 bg-[#ffc771] py-1 text-xs text-[#7e3610]",
        resolved: "gap-x-1 bg-[#94F9B9] py-1 text-xs text-[#366F4B]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
