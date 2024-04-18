"use client";

import { cn } from "@/lib/utils";
import HeaderButtons from "./components/header_buttons";
import TopBar from "../top-bar";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header = ({ isLoggedIn }: HeaderProps) => {
  const loggedOutHeaderClasses =
    "sticky h-12 flex inset-x-0 top-0 ease-in-out duration-500 transition-transform translate-y-0 items-center justify-between w-full gap-x-2 z-50 border-b border-[#ffffff14] bg-[#ffffff10] px-4 shadow-sm backdrop-blur-md dark:border-[#ffffff14] dark:bg-[#ffffff03] lg:px-12 xl:px-32 2xl:gap-x-12 2xl:px-80";

  return (
    <>
      {/* {!isLoggedIn && <TopBar />} */}
      <header className={cn(loggedOutHeaderClasses)}>
        <HeaderButtons />
      </header>
    </>
  );
};

export default Header;
