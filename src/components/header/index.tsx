"use client";

import useScrollDirection from "hooks/useScrollDirection";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import HeaderButtons from "./components/header_buttons";

const Header = () => {
  const isScrollingDown = useScrollDirection();

  const hiddenHeaderClasses =
    "sticky h-16 flex inset-x-0 top-0 z-20 ease-in-out duration-500 transition-transform -translate-y-full items-center justify-between w-full gap-x-2 top-0 z-50";
  const showingHeaderClasses =
    "sticky h-16 flex inset-x-0 top-0 z-20 ease-in-out duration-500 transition-transform translate-y-0 items-center justify-between w-full gap-x-2 top-0 z-50";

  return (
    <SessionProvider>
      <header
        className={cn(
          isScrollingDown ? hiddenHeaderClasses : showingHeaderClasses,
          "border-b border-[#121212]/30 px-4 backdrop-blur lg:px-12 xl:px-32 2xl:gap-x-12 2xl:px-80",
        )}
      >
        {/* TODO: Make this better */}
        <HeaderButtons />
      </header>
    </SessionProvider>
  );
};

export default Header;
