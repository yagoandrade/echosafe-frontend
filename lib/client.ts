"use client";

import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

export const handleGetReferralLink = async () => {
  try {
    await navigator.clipboard.writeText("https://echosafe.org");
    toast.success(
      "Seu link de convite foi copiado para a área de transferência!"
    );
  } catch (err) {
    toast.error(
      "Houve um erro ao tentar copiar o seu link de convite. Nós já fomos alertados da situação. Por favor, tente novamente mais tarde."
    );
  }
};

export const handleSignOut = () => {
  signOut(auth);
  localStorage.removeItem("@user");
  window.location.href = "/";
};
