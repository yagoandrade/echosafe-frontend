"use client";

import { Menu, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Logo from "@/../public/assets/svg/logo.svg";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { Button } from "../../ui/button";

interface MobileSidemenuProps {
  children: React.ReactNode;
}

const MobileSidemenu = ({ children }: MobileSidemenuProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="flex px-2 py-1 md:hidden ml-1" variant="ghost">
          <Menu color="#cccdda" size="1rem" />
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 z-40 bg-black/40" />

        <DrawerContent className="dark:bg-gradient-to-b dark:from-[#2a2b3a] dark:to-[#191a23] w-10/12 bg-white lg:w-2/3">
          <div className="flex size-full flex-col">
            <DrawerTitle className="flex w-full items-center justify-between p-4">
              <Link href="/" className="m-auto h-fit">
                <Image
                  priority
                  src={Logo as StaticImageData} // Explicitly specify the type of the Logo variable
                  alt="Mock up logo"
                  width={150}
                  height={100}
                />
              </Link>
              <DrawerClose>
                <X color="#cccdda" />
              </DrawerClose>
            </DrawerTitle>

            {/* TODO: Add content here */}
            <div className="flex h-full flex-col overflow-y-scroll"></div>

            <DrawerFooter className="mb-0 p-3 ">{children}</DrawerFooter>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default MobileSidemenu;
