"use client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Logo from "@/../public/assets/svg/logo.svg";
import LightLogo from "@/../public/assets/svg/light-logo.svg";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import MobileSidemenu from "@/components/shared/mobile-sidemenu";
import { useRouter } from "next/navigation";

const HeaderButtons = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { theme } = useTheme();

  return (
    <>
      <Link href="/" className="h-fit lg:min-w-fit">
        <Image
          priority
          src={
            theme === "dark"
              ? (LightLogo as StaticImageData)
              : (Logo as StaticImageData)
          }
          alt="Logo"
          width={130}
          height={130}
        />
      </Link>

      <section className="hidden w-fit gap-x-2 md:flex">
        <HeaderContent />
      </section>

      <MobileSidemenu>
        <HeaderContent />
      </MobileSidemenu>
    </>
  );
};

const HeaderContent = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/api/auth/register");
  };

  const handleSignIn = () => {
    router.push("/api/auth/signin?csrf=true");
  };

  return (
    <>
      <Button variant="link" size="sm" onClick={handleSignIn}>
        Billing
      </Button>

      {/*
        // Log in removed from here, as it's already part of the TopBar component
      <Button variant="link" size="sm" onClick={handleSignIn}>
        Log in
      </Button> */}
      <Button variant="primary" size="sm" onClick={handleRegister}>
        Sign up
      </Button>
    </>
  );
};

export default HeaderButtons;
