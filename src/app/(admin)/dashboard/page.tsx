import Dashboard from "@/components/dashboard";
import Sidemenu from "@/components/shared/sidemenu";
import { cn } from "@/lib/utils";
import React from "react";

export const metadata = {
  title: "Dashboard | EchoSafe®",
}

const DashboardPage = () => {
  return (
    <main className={cn("flex min-h-screen justify-center")}>
      <Sidemenu />
      <Dashboard />
    </main>
  );
};

export default DashboardPage;
