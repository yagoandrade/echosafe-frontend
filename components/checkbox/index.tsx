"use client";
import React, { useState } from "react";
import type { ICheckBox } from "./types";

const CheckBox: React.FC<ICheckBox> = ({ label, ...rest }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((checked) => !checked);
  };

  return (
    <div className="z-50 flex gap-2">
      <input
        type="checkbox"
        checked={checked}
        onClick={handleChange}
        className="accent-[#4F46E5]"
        {...rest}
      />
      <label>{label}</label>
    </div>
  );
};

export default CheckBox;
