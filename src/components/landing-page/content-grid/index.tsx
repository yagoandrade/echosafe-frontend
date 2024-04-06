"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { AlignRight, Clipboard, FileWarning, Table } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  getColorFromCode,
  getIconFromCode,
  getStatusFromCode,
} from "@/components/reports/report_card/utils";

export function ContentGrid() {
  return (
    <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full   flex-1 rounded-xl border  border-transparent bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-[#2d4351] dark:border-white/[0.2] dark:bg-[#20212e]"></div>
);

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100  bg-white p-2 dark:border-[#2d4351] dark:border-white/[0.2] dark:bg-[#20212e]"
      >
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-[#2d4351] dark:border-white/[0.2] dark:bg-[#20212e]"
      >
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
        <Image
          src="https://github.com/yagoandrade.png"
          alt="avatar"
          height="100"
          width="100"
          className="h-6 w-6 rounded-full"
        />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-[#2d4351] dark:border-white/[0.2] dark:bg-[#20212e]"
      >
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex h-4 w-full flex-row items-center space-x-2 rounded-full  border border-neutral-100 bg-neutral-100 p-2 dark:border-[#2d4351] dark:border-white/[0.2] dark:bg-[#20212e]"
        ></motion.div>
      ))}
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 rounded-lg"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-[#2d4351] dark:border-white/[0.1] dark:bg-[#20212e]"
      >
        <Image
          src="https://github.com/yagoandrade.png"
          alt="avatar"
          height="100"
          width="100"
          className="h-10 w-10 rounded-full"
        />
        <p className="mt-4 text-center text-xs font-semibold text-neutral-500 outline-none sm:text-sm">
          Repeated Verbal Bullying Incident During Lunch Break
        </p>
        <Badge
          variant="open"
          className="xs:w-fit xs:justify-start mt-3 h-fit w-full items-center justify-center gap-x-2 self-center text-base sm:text-xs md:w-fit"
        >
          <span
            className="flex size-4 items-center justify-center rounded-full text-xs font-black"
            style={{ backgroundColor: getColorFromCode("open") }}
          >
            {getIconFromCode("open")}
          </span>
          <p>{getStatusFromCode("open")}</p>
        </Badge>
      </motion.div>
      <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-[#2d4351] dark:border-white/[0.1] dark:bg-[#20212e]">
        <Image
          src="https://github.com/clauds-macedo.png"
          alt="avatar"
          height="100"
          width="100"
          className="h-10 w-10 rounded-full"
        />
        <p className="mt-4 text-center text-xs font-semibold text-neutral-500 outline-none sm:text-sm">
          I Am Experiencing Cyberbullying on Social Media Platforms
        </p>
        <Badge
          variant="under_review"
          className="xs:w-fit xs:justify-start mt-3 h-fit w-full items-center justify-center gap-x-2 self-center text-base sm:text-xs md:w-fit"
        >
          <span
            className="flex size-4 items-center justify-center rounded-full text-xs font-black"
            style={{ backgroundColor: getColorFromCode("under_review") }}
          >
            {getIconFromCode("under_review")}
          </span>
          <p>{getStatusFromCode("under_review")}</p>
        </Badge>
      </motion.div>
      <motion.div
        variants={second}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-[#2d4351] dark:border-white/[0.1] dark:bg-[#20212e]"
      >
        <Image
          src="https://github.com/Arthurls7.png"
          alt="avatar"
          height="100"
          width="100"
          className="h-10 w-10 rounded-full"
        />
        <p className="mt-4 text-center text-xs font-semibold text-neutral-500 outline-none sm:text-sm">
          Harassment and Sabotage Within Academic Department
        </p>
        <Badge
          variant="resolved"
          className="xs:w-fit xs:justify-start mt-3 h-fit w-full items-center justify-center gap-x-2 self-center text-base sm:text-xs md:w-fit"
        >
          <span
            className="flex size-4 items-center justify-center rounded-full text-xs font-black"
            style={{ backgroundColor: getColorFromCode("resolved") }}
          >
            {getIconFromCode("resolved")}
          </span>
          <p>{getStatusFromCode("resolved")}</p>
        </Badge>
      </motion.div>
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-[6rem] h-full w-full flex-1 flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-2xl border border-neutral-100 bg-white p-2 dark:border-[#2d4351] dark:border-white/[0.2] dark:bg-[#20212e]"
      >
        <Image
          src="https://github.com/yagoandrade.png"
          alt="avatar"
          height="100"
          width="100"
          className="h-10 w-10 rounded-full"
        />
        <p className="text-xs text-neutral-500">Give me a detailed analysis</p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row items-center justify-end space-x-2 rounded-2xl border border-neutral-100 bg-white px-2 py-3 dark:border-[#2d4351] dark:border-white/[0.2] dark:bg-[#20212e]"
      >
        <p className="text-xs text-neutral-500">
          The graduate student has reported incidents of bullying and
          harassment, which involved public humiliation, sabotage of research
          projects, and spreading personal rumors. The victim has expressed
          concerns about the detrimental effects of this bullying on both their
          academic advancement and mental well-being.
        </p>
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
      </motion.div>
    </motion.div>
  );
};
const items = [
  {
    title: "Easy to Use Interface",
    description: (
      <span className="text-sm">
        EchoSafe®&apos;s interface is designed to be user-friendly, fast, and
        easy to navigate. We support multiple languages and devices.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <Table className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Speak Directly to the Victim",
    description: (
      <span className="text-sm">
        The victim can speak directly to the coordinator or with a psychologist.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <Clipboard className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Full History Log of the Incidents",
    description: (
      <span className="text-sm">
        All actions are documented to ensure transparency and oversight by the
        director.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <FileWarning className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "AI Summarization and Analysis",
    description: (
      <span className="text-sm">
        Get concise summaries, comprehensive analyses, and actionable insights.
        Uncover nuanced emotional tones with sentiment analysis for informed
        decision-making.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-2",
    icon: <AlignRight className="h-4 w-4 text-neutral-500" />,
  },
];
