"use client";
import localFont from "next/font/local";
import Image, { type StaticImageData } from "next/image";

import LandingPageImage1 from "@/../public/assets/images/landing-page-image-1.png";

import LandingPageGradientBackground from "./gradient-background";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import LaurelRatings from "../shared/laurel-ratings";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import GoogleLogo from "@/../public/assets/svg/google-wordmark.svg";
import CourseraLogo from "@/../public/assets/svg/coursera.svg";
import UdemyLogo from "@/../public/assets/svg/Udemy_light.svg";
import GithubLogo from "@/../public/assets/svg/github-wordmark.svg";
import IBMLogo from "@/../public/assets/svg/ibm.svg";
import CloudflareLogo from "@/../public/assets/svg/cloudflare.svg";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { ContentGrid } from "./content-grid";

const recoletaBlack = localFont({
  src: "../../../public/assets/fonts/recoleta/recoleta-black.woff2",
  display: "swap",
});

const LandingPage = () => {
  return (
    <>
      <LandingPageGradientBackground />
      <main className="space-y-8 px-4 py-4 2xl:py-12">
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
              {/* <PayingUsersAvatar /> */}
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
          <Card className="my-4 space-y-0 rounded-2xl bg-white shadow-lg dark:border-[#2d4351] dark:bg-[#1e2c3a]">
            <CardHeader className="text-start">
              <CardTitle className="text-base font-light text-[#656565]">
                Trusted by students and institutions worldwide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mx-auto grid max-w-3xl gap-6 text-center text-center grayscale dark:grayscale-0 md:gap-8 lg:max-w-none lg:grid-cols-6">
                <Image
                  className="mx-auto my-auto h-auto max-h-[50px] w-fit max-w-[150px] object-contain"
                  src={GoogleLogo as StaticImageData}
                  alt=""
                />
                <Image
                  src={CourseraLogo as StaticImageData}
                  alt=""
                  className="mx-auto my-auto h-auto w-fit max-w-[150px] object-contain"
                />
                <Image
                  src={UdemyLogo as StaticImageData}
                  alt=""
                  className="mx-auto my-auto h-auto w-fit max-w-[150px] object-contain"
                />
                <Image
                  src={GithubLogo as StaticImageData}
                  alt=""
                  className="mx-auto my-auto h-auto w-fit max-w-[150px] object-contain"
                />
                <Image
                  src={IBMLogo as StaticImageData}
                  alt=""
                  className="mx-auto my-auto h-auto w-fit max-w-[150px] object-contain"
                />
                <Image
                  src={CloudflareLogo as StaticImageData}
                  alt=""
                  className="mx-auto my-auto h-auto w-fit max-w-[150px] object-contain"
                />
              </div>

              {/*
              // SOCIAL PROOF
              <div className="mx-auto grid max-w-3xl gap-6 text-center md:gap-8 lg:max-w-none lg:grid-cols-3 lg:grid-rows-2">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 md:text-base/relaxed">
                    Great company to work for. The environment is incredibly
                    collaborative and supportive. I feel valued and inspired
                    every day.
                  </p>
                  <div className="font-medium not-italic">
                    Samantha Thompson
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Product Manager
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 md:text-base/relaxed">
                    The leadership team truly cares about the well-being of the
                    employees. It's refreshing to be part of a company that
                    prioritizes work-life balance and professional growth.
                  </p>
                  <div className="font-medium not-italic">Alex Walker</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Software Engineer
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 md:text-base/relaxed">
                    I've been with the company for over five years, and I'm
                    still excited to come to work every morning. The culture of
                    innovation and the emphasis on continuous learning make this
                    a fantastic place to grow my career.
                  </p>
                  <div className="font-medium not-italic">Emily Parker</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Marketing Specialist
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 md:text-base/relaxed">
                    The company's commitment to diversity and inclusion is
                    evident in every aspect of our work. I feel empowered to
                    bring my authentic self to the table, knowing that my
                    contributions are valued.
                  </p>
                  <div className="font-medium not-italic">Malik Johnson</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    HR Business Partner
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 md:text-base/relaxed">
                    As a remote team member, I appreciate the company's
                    investment in technology that enables seamless
                    collaboration. I always feel connected to my colleagues, no
                    matter where I'm working from.
                  </p>
                  <div className="font-medium not-italic">Liam Garcia</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    UX Designer
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 md:text-base/relaxed">
                    The company's dedication to customer satisfaction is
                    inspiring. I'm proud to be part of a team that goes above
                    and beyond to deliver excellence.
                  </p>
                  <div className="font-medium not-italic">Sophie Lee</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Customer Success Manager
                  </div>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </section>

        <section>
          <ContainerScroll
            titleComponent={
              <h1 className="text-4xl font-light text-black dark:text-white">
                Everything related to your institution <br />
                <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                  In One Place
                </span>
              </h1>
            }
          >
            <Image
              src="https://echosafe-images-bucket.s3.sa-east-1.amazonaws.com/echosafe.png"
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto h-full rounded-2xl object-cover object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </section>

        <section className="relative mx-auto max-w-5xl space-y-8">
          <span className="w-full space-y-4 text-center font-light">
            <h3 className="text-6xl font-light">
              The future of school safety is here
            </h3>
            <p className="text-xl font-extralight">
              EchoSafe® is a comprehensive solution to help you prevent
              bullying in your institution.
              <br />
              We provide you with the tools to detect, act, and prevent
              incidents in a safe environment.
            </p>
          </span>

          <ContentGrid />
        </section>

        {/* <section className="relative flex h-screen w-full flex-col items-center justify-center bg-white py-20 dark:bg-black md:h-auto">
          <div className="relative mx-auto h-full w-full max-w-7xl overflow-hidden px-4 md:h-[40rem]">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              className="div"
            >
              <h2 className="text-center text-xl font-bold text-black dark:text-white md:text-4xl">
                We are available worldwide
              </h2>
              <p className="mx-auto mt-2 max-w-md text-center text-base font-normal text-neutral-700 dark:text-neutral-200 md:text-lg">
                It doesn&apos;t matter where your institution is located, we are
                here to help you. EchoSafe® is available in multiple languages
              </p>
            </motion.div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full select-none bg-gradient-to-b from-transparent to-white dark:to-black" />
            <div className="absolute -bottom-20 z-10 h-72 w-full md:h-full">
              <World data={sampleArcs} globeConfig={globeConfig} />;
            </div>
          </div>
        </section> */}

        <section className="flex w-full flex-col items-center justify-center gap-y-16 py-12">
          <span className="space-y-3 text-center text-6xl font-light leading-10">
            <h3>Ready for the future of safety?</h3>
            <p>Available today.</p>
          </span>
          <Button
            variant="provider"
            className="w-full rounded-full text-lg font-normal lg:w-fit"
            asChild
          >
            <Link href="/api/auth/register">Get started on EchoSafe®</Link>
          </Button>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
