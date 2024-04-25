import { useTheme } from "next-themes";
import { type StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/assets/svg/logo.svg";
import LightLogo from "@/../public/assets/svg/light-logo.svg";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { type UserSubscriptionPlan } from "types";

interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

export function HeaderSection({
  title,
  subtitle,
  subscriptionPlan,
}: Readonly<HeaderSectionProps>) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-12 flex w-full flex-wrap items-center justify-between gap-2">
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
        <div className="flex gap-x-2">
          <Button variant="provider" asChild>
            <Link href="/api/auth/signout" className="mt-5">
              Sign out
            </Link>
          </Button>

          {subscriptionPlan?.title && (
            <Button variant="primary" asChild>
              <Link href="/dashboard" className="mt-5">
                Go to EchoSafe®
                <ArrowRight size="1rem" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <h2 className="text-3xl font-semibold md:text-4xl lg:text-[40px]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-6 text-balance text-lg text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
