"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { UserNav } from "../user-nav";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

import Logo from "@/../public/assets/svg/light-logo.svg";
import { Button } from "../ui/button";

const Sidemenu = () => {
  return (
    <SessionProvider>
      <SidemenuContent />
    </SessionProvider>
  );
};

const SidemenuContent = () => {
  const { data: session } = useSession();

  const sideMenuDefaultClassName =
    "hidden lg:flex min-h-full flex flex-col sticky w-80 font-medium px-4 py-6 xl:p-0 gap-y-8 border-r border-[#303146]";

  return (
    <motion.aside
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={sideMenuDefaultClassName}
      data-testid="sidemenu"
    >
      <Card className="flex h-full flex-col border-0 bg-transparent">
        <CardHeader className="mx-auto">
          <Link href="/" className="h-fit lg:min-w-fit">
            <Image priority src={Logo} alt="Logo" width={150} height={150} />
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="primary" className="w-full">
            Example Button 1
          </Button>
          <Button variant="secondary" className="w-full">
            Example Button 2
          </Button>
          <Button variant="provider" className="w-full">
            Example Button 3
          </Button>
          <Button variant="outline" className="w-full">
            Example Button 4
          </Button>
        </CardContent>
        <CardFooter className="mt-auto flex justify-around p-3">
          <UserNav user={session?.user} isExtended />
        </CardFooter>
      </Card>
    </motion.aside>
  );
};

export default Sidemenu;
