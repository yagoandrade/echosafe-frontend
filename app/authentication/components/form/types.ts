import React from "react";
import type { SubmitHandler } from "react-hook-form";

export type AuthFormType = "student" | "school";

export type AuthRegister = {
  email: string;
  password: string;
  code: string;
};

export type IFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<AuthRegister>;
}