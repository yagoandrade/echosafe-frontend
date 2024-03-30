import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "duration-50 flex h-10 w-full rounded-md border border-[#313248] bg-[#151621] px-3 py-2 text-sm text-[#e7e8f4] transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#4b4e6a] hover:border-[#3c3c4c] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
