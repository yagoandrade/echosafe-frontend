"use client";
import React from "react";
import OptionSwitch from "./components/option";
import { useAuthStore } from "@/app/authentication/store/auth";

const Toggle: React.FC = () => {
  const { currentAuthState, toggleAuthType } = useAuthStore()

  return (
    <div className="flex h-8 w-full justify-center rounded-md bg-zinc-300 p-0.5 text-sm">
      <OptionSwitch
        labels={["Aluno", "Colaborador"]}
        selected={currentAuthState}
        onToggle={toggleAuthType}
      />
    </div>
  );
};

export default Toggle;
