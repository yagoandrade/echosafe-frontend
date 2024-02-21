"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import AuthFormRenderer from "./components/auth_form_renderer";

const Authentication: React.FC = () => {
  const params = useSearchParams().get("mode");

  return <AuthFormRenderer mode={params as "signup" | "signin"} />; // dip
};

export default Authentication;
