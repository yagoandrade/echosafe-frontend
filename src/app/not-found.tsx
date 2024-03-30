import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Cat, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex size-full min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-7 p-4">
        <h1 className="max-w-md text-xl font-semibold md:text-2xl">
          Don&apos;t panic! We&apos;ll get you back on track
        </h1>
        <Image
          src="https://i.imgflip.com/6855e0.jpg"
          alt="404-squirrel-offering-you-a-ride"
          width={450}
          height={450}
        />
        <div className="flex w-full max-w-md flex-wrap justify-center gap-2">
          <Button variant="primary" size="lg" className="w-full" asChild>
            <Link href="/">
              <span className="mr-auto">Take a ride to the homepage</span>
              <MoveRight size="1.25rem" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}