"use client";
import { AuthContext, IAuthContext } from "@/context/AuthContext";
import useScrollDirection from "@/hooks/useScrollDirection";
import useTokenVerifier from "@/hooks/useTokenVerifier";
import { cn } from "@/lib/utils";
import { useCurrentUserStore } from "@/store/currentUser";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import LoadingHeaderButtons from "./components/loading_header_buttons";
import LoggedInHeaderButtons from "./components/logged_in_header_buttons";
import LoggedOutHeaderButtons from "./components/logged_out_header_buttons";
import { IHeaderProps } from "./types";

const Header: React.FC<IHeaderProps> = () => {
  const { userData } = useCurrentUserStore();
  const { loading } = useContext(AuthContext) as IAuthContext;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookie] = useCookies();

  const pathname = usePathname();
  const isScrollingDown = useScrollDirection();

  const isHeaderVisible = pathname !== "/authentication";

  const hasUserData = !!userData.id;

  const hiddenHeaderClasses =
    "sticky h-16 flex inset-x-0 top-0 z-20 ease-in-out duration-500 transition-transform -translate-y-full items-center justify-between w-full gap-x-2 top-0 z-50";
  const showingHeaderClasses =
    "sticky h-16 flex inset-x-0 top-0 z-20 ease-in-out duration-500 transition-transform translate-y-0 items-center justify-between w-full gap-x-2 top-0 z-50";

  useTokenVerifier();
  useEffect(() => {
    setIsLoggedIn(!!cookie.access_token);
  }, [cookie.access_token]);

  return isHeaderVisible ? (
    <header
      className={cn(
        isScrollingDown && !hasUserData
          ? hiddenHeaderClasses
          : showingHeaderClasses,
        hasUserData
          ? "bg-white border-b border-[#e5e6e9] px-6 lg:px-10 2xl:gap-x-36"
          : "bg-[#f8f4f2]/50 backdrop-blur border-b border-[#e5e6e9]/30 px-4 lg:px-12 xl:px-32 2xl:px-80 2xl:gap-x-12"
      )}
    >
      {getHeaderButtons(loading, isLoggedIn)}
    </header>
  ) : null;
};

function getHeaderButtons(loading: boolean, hasUserData: boolean) {
  if (loading) return <LoadingHeaderButtons />;
  if (!hasUserData) return <LoggedOutHeaderButtons />;
  return <LoggedInHeaderButtons />;
}

export default Header;
