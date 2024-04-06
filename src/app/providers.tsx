"use client";

import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </SessionProvider>
  );
};

export default Providers;
