"use client";
import { categories } from "@/app/reports/components/complaints-filter/components/complaints-button/utils";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Tag from "../tag";
import { IAutoComplete } from "./types";

const AutoComplete: React.FC<IAutoComplete> = ({ onChangeTags }) => {
  const [open, setOpen] = useState(false);
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);

  const clearChosenCategories = () => {
    setChosenCategories([]);
  }

  const ChevronIcon = open ? ChevronUp : ChevronDown;

  const filteredCategories = categories
    .slice(1)
    .filter((category) => !chosenCategories.includes(category));

  useEffect(() => {
    onChangeTags(chosenCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenCategories]);

  return (
    <div className="mb-3 w-full">
      <span className="text-sm font-bold text-gray-700">
        Selecione as marcações do(s) tipo(s) de característica física ou
        psicológica atacados durante o bullying
      </span>
      <div>
        {/* select area */}
        <div
          className={`mt-2 flex h-[56px] w-full items-center justify-end rounded-lg border border-gray-300 px-3`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <Tag
            tags={chosenCategories}
            onRemoveTag={(tagValue) => {
              setChosenCategories((prevState) =>
                prevState.filter((value) => value !== tagValue)
              );
            }}
          />
          <X color="#CBD5E1" onClick={clearChosenCategories}/>
          <span className="text-gray-300">|</span>
          <ChevronIcon
            color="#CBD5E1"
            className="cursor-pointer"
          />
        </div>
        {/* select tags */}
        <motion.div
          initial={{
            opacity: 0,
            display: "none",
            height: 0,
            zIndex: open ? 1 : 0,
          }}
          animate={{
            opacity: open ? 1 : 0,
            display: open ? "flex" : "none",
            height: open ? "auto" : 0,
          }}
          exit={{
            opacity: 0,
            display: "none",
            height: 0,
            zIndex: open ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`flex w-full flex-col items-start justify-items-start border p-2`}
          >
            {filteredCategories.map((category) => (
              <button
                type="button"
                key={category}
                className="flex w-full self-start rounded-sm p-1 hover:bg-blue-400 hover:text-white"
                onClick={() => {
                  setChosenCategories((prevState) => [...prevState, category]);
                  onChangeTags(chosenCategories);
                }}
                disabled={!open}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AutoComplete;
