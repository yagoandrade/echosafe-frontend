"use client";
import React from "react";
import { InputProps } from "../../types";

const GeneralInput: React.FC<InputProps> = ({
  label,
  type,
  suffix,
  error,
  isOptional,
  ...rest
}) => {
  return (
    <div className="relative mb-4 w-full">
      <label className="mb-2 block text-sm font-medium text-[#808080]">
        {label}{" "}
        {!isOptional && <span className="font-bold text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          className="h-10 w-full rounded-lg border bg-white px-3 text-sm focus:outline-none"
          {...rest}
        />
        {suffix}
      </div>
      {error && <span className="text-wrap text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default GeneralInput;
