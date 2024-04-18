import { useTheme } from "next-themes";
import { type StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/assets/svg/logo.svg";
import LightLogo from "@/../public/assets/svg/light-logo.svg";

interface HeaderSectionProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export function HeaderSection({
  title,
  subtitle,
}: Readonly<HeaderSectionProps>) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center text-center">
      <Link href="/" className="mb-12 h-fit lg:min-w-fit">
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
      <h2 className="text-3xl md:text-4xl lg:text-[40px] font-semibold">{title}</h2>
      {subtitle ? (
        <p className="mt-6 text-balance text-lg text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
