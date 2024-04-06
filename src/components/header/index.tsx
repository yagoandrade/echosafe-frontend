"use client";

import useScrollDirection from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";
import HeaderButtons from "./components/header_buttons";
import TopBar from "../shared/top-bar";

const Header = () => {
  const isScrollingDown = useScrollDirection();

  const hiddenHeaderClasses =
    "sticky h-12 flex inset-x-0 top-0 z-20 ease-in-out duration-500 transition-transform -translate-y-full items-center justify-between w-full gap-x-2 top-0 z-50";
  const showingHeaderClasses =
    "sticky h-12 flex inset-x-0 top-0 z-20 ease-in-out duration-500 transition-transform translate-y-0 items-center justify-between w-full gap-x-2 top-0 z-50";

  return (
    <>
      <TopBar />
      <header
        className={cn(
          showingHeaderClasses,
          "border-b border-[#ffffff14] bg-[#ffffff10] px-4 shadow-sm backdrop-blur-md dark:border-[#ffffff14] dark:bg-[#ffffff03] lg:px-12 xl:px-32 2xl:gap-x-12 2xl:px-80",
        )}
      >
        {/* TODO: Make this better */}
        <HeaderButtons />
      </header>
    </>
  );
};

export default Header;
