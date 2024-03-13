import MobileSidemenu from "@/components/mobile-sidemenu";
import UserButtons from "@/components/user_buttons";
import Image from "next/image";
import Link from "next/link";
import MockupLogo from "../../../../public/assets/svg/mockup-logo.svg";

const LoggedInHeaderButtons = () => {
  return (
    <>
      <Link href="/dashboard" className="size-fit">
        <Image priority src={MockupLogo} alt="Logo" width={180} height={180} />
      </Link>

      <UserButtons className="hidden h-full items-center lg:flex" />
      <MobileSidemenu className="flex lg:hidden">
        <UserButtons className="flex w-full justify-around border-t p-3" />
      </MobileSidemenu>
    </>
  );
};

export default LoggedInHeaderButtons;
