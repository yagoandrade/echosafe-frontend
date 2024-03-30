"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { Card, CardFooter } from "../ui/card";
import { UserNav } from "../user-nav";
import { motion } from "framer-motion";

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
    "hidden lg:flex min-h-full flex flex-col sticky w-80 font-medium px-4 py-6 xl:p-8 gap-y-8 border-r border-[#303146]";

  return (
    <motion.aside
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={sideMenuDefaultClassName}
      data-testid="sidemenu"
    >
      <Card className="mt-auto">
        <CardFooter className="flex justify-around p-3">
          <UserNav user={session?.user} isExtended />
        </CardFooter>
      </Card>
    </motion.aside>
  );
};

export default Sidemenu;
