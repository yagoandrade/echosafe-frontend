import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Avatar as AvatarComponent, AvatarImage } from "../ui/avatar";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(function Avatar({ className, ...props }, ref) {
  return (
    <AvatarComponent ref={ref} className={className}>
      <AvatarImage {...props} />
    </AvatarComponent>
  );
});

export default Avatar;
