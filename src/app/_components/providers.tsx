"use client";

import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ActiveInstitutionStoreProvider } from "@/providers/activeInstitutionStoreProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <ActiveInstitutionStoreProvider>
          {children}
        </ActiveInstitutionStoreProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
};

export default Providers;
