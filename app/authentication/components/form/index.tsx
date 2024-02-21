"use client";
import React from "react";
import { useForm } from "react-hook-form";
import type { AuthRegister, IFormProps } from "./types";

const AuthForm: React.FC<IFormProps> = ({ children, onSubmit }) => {
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthRegister>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-10 w-2/3">
      {children}
    </form>
  );
};

export default AuthForm;
