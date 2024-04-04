"use client";
import localFont from "next/font/local";
import Image from "next/image";

import LandingPageImage1 from "@/../public/assets/images/landing-page-image-1.png";

import LandingPageGradientBackground from "./gradient_background";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import PayingUsersAvatar from "../shared/paying-users-avatars";
import LaurelRatings from "../shared/laurel-ratings";
import { InfiniteMovingCards } from "./infinite_moving_cards";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { testimonials } from "@/config/landing";

const recoletaBlack = localFont({
  src: "../../../public/assets/fonts/recoleta/recoleta-black.woff2",
  display: "swap",
});

const LandingPage = () => {
  return (
    <>
      <LandingPageGradientBackground />
      <main className="space-y-16 px-4 py-12">
        <section className="grid grid-cols-1 items-center gap-4 lg:grid-cols-12">
          <div className="col-span-6 space-y-6 opacity-90">
            <div className="space-y-3.5">
              <LaurelRatings />
              <h1 className="text-5xl font-bold">
                School safety, reinvented for{" "}
                <span style={recoletaBlack.style}>students</span> and{" "}
                <span style={recoletaBlack.style}>institutions</span>
              </h1>
              <h3 className="font-medium">
                Join EchoSafe®&apos;s mission to create safe and inclusive
                learning spaces. With our advanced tools for directors,
                coordinators, and psychologists to not only detect bullying, but
                also act effectively to prevent it.
              </h3>
              <PayingUsersAvatar />
              <div className="space-y-2 text-lg">
                <p>
                  💬 <u>100% Anonymous reporting</u> for all students
                </p>
                <p>
                  🤖 <u>Respond better to students</u> with a specialized AI to
                  auxiliate you
                </p>
                <p>
                  ❤️ <u>Get Psychological support</u> for impacted victims
                </p>
                {/* <p>
                  ❤️ <u>Identify the signs, mitigate risks,</u> and be proactive
                  in protecting each student
                </p> */}
                <p>
                  📈 <u>Keep track of recent occurrences</u> and talk directly
                  to the students involved
                </p>
                <p>
                  🌎 <u>Join EchoSafe® chat</u> and link with other schools
                  leading the future
                </p>
              </div>
            </div>

            <div className="space-y-2 lg:space-x-3 lg:space-y-0">
              <Button variant="provider" className="w-full lg:w-fit" asChild>
                <Link href="/api/auth/register">
                  Make My Students Safer Now
                  <ChevronRight size="1rem" strokeWidth="0.1rem" />
                </Link>
              </Button>
              <Button variant="link" className="w-full lg:w-fit" asChild>
                <a href="mailto:contact@echosafe.org">
                  Talk To Our Specialists
                  <ChevronRight size="1rem" strokeWidth="0.1rem" />
                </a>
              </Button>
            </div>
          </div>
          <div className="hidden lg:col-span-6 lg:flex">
            <Image
              src={LandingPageImage1}
              alt="EchoSafe.org"
              draggable={false}
            />
          </div>
        </section>

        <section>
          <Card className="space-y-3 rounded-3xl border-0">
            <CardHeader className="mt-4 text-center">
              <CardTitle
                className="text-3xl font-bold"
                style={recoletaBlack.style}
              >
                EchoSafe® technology is trusted by
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
              />
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
