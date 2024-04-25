"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

const TopBar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex w-full justify-between flex-wrap border-b border-[#e5e6e9] px-4 py-1.5 text-sm font-light text-[#a09b95] dark:border-[#303146] lg:px-12 2xl:px-32 2xl:gap-x-12 2xl:px-80">
      <span className="flex items-center gap-x-1">
        <p>Plans for FEDERAL UNIVERSITIES starting as low as $9.90 per month</p>
        <ArrowRight size="1.2rem" strokeWidth={2} />
      </span>
      <span className="space-x-3">
        <Button
          variant="link"
          className="h-fit cursor-default p-0 font-light text-[#a09b95] hover:underline"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Change theme
        </Button>
        <Link href="#" className="cursor-default hover:underline">
          About
        </Link>
        <Link href="#" className="cursor-default hover:underline">
          Blog
        </Link>
        <Link href="#" className="cursor-default hover:underline">
          Help
        </Link>
        <Link href="#" className="cursor-default hover:underline">
          Documentation
        </Link>
        <Link href="#" className="cursor-default hover:underline">
          Contact
        </Link>

        <Link
          href="/api/auth/signin?csrf=true"
          className="cursor-default hover:underline"
        >
          Log in
        </Link>
      </span>
    </div>
  );
};

export default TopBar;
