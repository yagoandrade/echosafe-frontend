import { ArrowRight } from "lucide-react";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="flex w-full justify-between border-b border-[#e5e6e9] px-4 py-1.5 text-sm font-light text-[#a09b95] dark:border-[#303146] lg:px-12 xl:px-32 2xl:gap-x-12 2xl:px-80">
      <span className="flex items-center gap-x-1">
        <p>NVIDIA H100 GPUs are now available, for as low as $9.90</p>
        <ArrowRight size="1.2rem" strokeWidth={2} />
      </span>
      <span className="space-x-3">
        <Link href="#">About</Link>
        <Link href="#">Blog</Link>
        <Link href="#">Help</Link>
        <Link href="#">Documentation</Link>
        <Link href="/api/auth/signin?csrf=true">Log in</Link>
      </span>
    </div>
  );
};

export default TopBar;
