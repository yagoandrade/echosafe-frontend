"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { UserNav } from "../../user-nav";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import Logo from "@/../public/assets/svg/logo.svg";
import LightLogo from "@/../public/assets/svg/light-logo.svg";

import { useTheme } from "next-themes";
import SidemenuButtons from "./components/sidemenu-buttons";

const Sidemenu = () => {
  const { data: session } = useSession();
  const { theme } = useTheme();

  const sideMenuDefaultClassName =
    "hidden lg:flex min-h-full h-screen fixed left-0 flex flex-col sticky w-[240px] font-medium px-4 py-6 xl:p-0 gap-y-8";

  return (
    <aside className={sideMenuDefaultClassName} data-testid="sidemenu">
      <Card className="flex h-full w-full flex-col gap-y-0.5 rounded-none bg-transparent p-0">
        <CardHeader className="space-y-3">
          <Link href="/dashboard" className="h-fit lg:min-w-fit">
            <Image
              priority
              src={
                theme === "dark"
                  ? (LightLogo as StaticImageData)
                  : (Logo as StaticImageData)
              }
              alt="Logo"
              width={120}
              height={120}
            />
          </Link>
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-y-0.5 overflow-auto p-0.5">
          <SidemenuButtons />
        </CardContent>
        {session?.user && (
          <CardFooter className="mt-auto flex justify-around p-0.5">
            <UserNav user={session?.user} isExtended />
          </CardFooter>
        )}
      </Card>
    </aside>
  );
};

export default Sidemenu;
