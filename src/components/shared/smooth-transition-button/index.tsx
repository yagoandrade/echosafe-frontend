"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ButtonStatesType<T extends string, U> = {
  [K in T]: U | string;
};

interface SmoothTransitionButtonProps {
  states: ButtonStatesType<"idle" | "loading" | "success", JSX.Element>;
}

export default function SmoothTransitionButton({
  states,
}: Readonly<SmoothTransitionButtonProps>) {
  const [buttonState, setButtonState] = useState<keyof typeof states>("idle");

  return (
    <button
      className="blue-button"
      disabled={buttonState === "loading"}
      onClick={() => {
        // This is just for the sake of this demo
        if (buttonState === "success") return;

        // These `setTimeouts` should not be used in prod
        // and are here only to demonstrate the animation
        setButtonState("loading");

        setTimeout(() => {
          setButtonState("success");
        }, 1750);

        setTimeout(() => {
          setButtonState("idle");
        }, 3500);
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          key={buttonState}
        >
          {states[buttonState]}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
