"use client";
import { motion } from "framer-motion";
import { IOption } from "./types";

const OptionSwitch: React.FC<IOption> = ({ labels, selected, onToggle }) => {
  const sliderVariants = {
    left: { x: 0 },
    right: { x: "100%" },
  };

  return (
    <div className="relative flex w-full drop-shadow-xl">
      <motion.div
        className="absolute z-0 h-full w-1/2 rounded-md bg-white"
        initial={selected === "student" ? "left" : "right"}
        animate={selected === "student" ? "left" : "right"}
        variants={sliderVariants}
        transition={{ type: "tween" }}
      />
      {labels.map((label) => {
        const isSelected =
          (label === "Escola" && selected === "school") ||
          (label === "Aluno" && selected === "student");
        return (
          <button
            key={label}
            onClick={onToggle}
            className={`z-10 w-1/2 rounded-md font-semibold ${
              isSelected ? "" : "bg-transparent"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default OptionSwitch;
