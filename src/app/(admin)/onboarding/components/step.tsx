"use client";

import { motion } from "framer-motion";
import { type ComponentProps } from "react";

export default function Step({
  step,
  currentStep,
}: Readonly<{ step: number; currentStep: number }>) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
        ? "inactive"
        : "complete";

  return (
    <motion.div animate={status} className="relative">
      <motion.div
        variants={{
          active: {
            scale: 1,
            transition: {
              delay: 0,
              duration: 0.2,
            },
          },
          complete: {
            scale: 1.25,
          },
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: "tween",
          ease: "circOut",
        }}
        className="absolute inset-0 rounded-full bg-blue-200"
      />

      <motion.div
        initial={false}
        variants={{
          inactive: {
            backgroundColor: "#272939", // neutral
            borderColor: "#303146", // neutral-200
            color: "#cccdda", // neutral-400
          },
          active: {
            backgroundColor: "#3b82f6",
            borderColor: "#3b82f6", // blue-500
            color: "#fbfbfe", // blue-500
          },
          complete: {
            backgroundColor: "#1994ff", // blue-500
            borderColor: "#1994ff", // blue-500
            color: "#3b82f6", // blue-500
          },
        }}
        transition={{ duration: 0.2 }}
        className="border-1 relative flex h-10 w-10 items-center justify-center rounded-full font-semibold"
      >
        <div className="flex items-center justify-center">
          {status === "complete" ? (
            <CheckIcon className="h-6 w-6 text-white" />
          ) : (
            <span>{step}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CheckIcon(props: Readonly<ComponentProps<"svg">>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
