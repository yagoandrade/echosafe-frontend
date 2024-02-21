"use client";
import React from "react";
import FileInput from "./components/file_input";
import GeneralInput from "./components/general_input";
import PasswordInput from "./components/password_input";
import type { InputProps } from "./types";

const CustomInput: React.FC<InputProps> = ({
  label = "",
  type = "email",
  ...rest
}) => {
  if (type === "password") {
    return <PasswordInput label={label} {...rest} />;
  } else if (type === "file") {
    return <FileInput label={label} {...rest} />;
  }
  return <GeneralInput label={label} type={type} {...rest} />;
};

export default CustomInput;
