"use client";
import React, { useState } from "react";
import GeneralInput from "../general_input";
import { InputProps } from "../../types";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput: React.FC<Pick<InputProps, "label">> = ({
  label,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <GeneralInput
      {...rest}
      label={label}
      type={showPassword ? "text" : "password"}
      suffix={
        <button
          className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center p-1"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      }
    />
  );
};

export default PasswordInput;
