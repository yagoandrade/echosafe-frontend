"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function NotFound() {
  const router = useRouter();
  const { callbackUrl } = useParams();

  if (callbackUrl && typeof callbackUrl === "string") {
    router.push(callbackUrl);
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </>
  );
}
