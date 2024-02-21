import Image from "next/image";
import Link from "next/link";
import MockupLogo from "../../../../public/assets/svg/mockup-logo.svg";

const LoadingHeaderButtons = () => {
  return (
    <Link href="/dashboard" className="size-fit">
      <Image priority src={MockupLogo} alt="Logo" width={180} height={180} />
    </Link>
  );
};

export default LoadingHeaderButtons;
