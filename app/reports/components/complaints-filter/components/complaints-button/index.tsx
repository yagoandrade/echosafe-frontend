import React from "react";
import type { IComplaintsButton } from "./types";
import { Button } from "@/components/button";

const ComplaintsButtonContainer: React.FC<IComplaintsButton> = ({
  title,
  items,
  onButtonClick,
  selectedItems = [],
}) => {
  const handleButtonClick = (value: string) => {
    onButtonClick(value);
  };

  const getSelectedValueStyle = (value: string) => {
    return selectedItems.includes(value) ? "border border-gray-900" : "";
  };

  return (
    <div className="mb-2 flex flex-col space-y-2">
      <span className="font-bold leading-none tracking-tight">{title}</span>
      <div className="flex flex-row flex-wrap gap-x-1 gap-y-2">
        {items.map((value, index) => (
          <Button
            size={"default"}
            key={index}
            variant={"ghost"}
            className={`text-gray-500 ${getSelectedValueStyle(value)}`}
            onClick={() => handleButtonClick(value)}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsButtonContainer;
