"use client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Logo from "@/../public/assets/svg/light-logo.svg";

import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { useSession } from "next-auth/react";
import MobileSidemenu from "@/components/mobile-sidemenu";
import { useRouter } from "next/navigation";

const HeaderButtons = () => {
  return (
    <>
      <Link href="/" className="h-fit lg:min-w-fit">
        <Image
          priority
          src={Logo as StaticImageData}
          alt="Logo"
          width={150}
          height={150}
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
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleRegister = () => {
    router.push("/api/auth/register");
  };

  const handleSignIn = () => {
    router.push("/api/auth/signin?csrf=true");
  };

  return status === "authenticated" ? (
    <UserNav user={session?.user} />
  ) : (
    <>
      <Button variant="link" size="sm" onClick={handleSignIn}>
        Billing
      </Button>
      <Button variant="primary" size="sm" onClick={handleSignIn}>
        Log in
      </Button>
      <Button variant="provider" size="sm" onClick={handleRegister}>
        Sign up
      </Button>
    </>
  );
};

export default HeaderButtons;
