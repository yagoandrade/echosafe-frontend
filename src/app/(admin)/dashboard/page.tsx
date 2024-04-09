import Dashboard from "@/components/dashboard";
import Sidemenu from "@/components/shared/sidemenu";
import { cn } from "@/lib/utils";
import React from "react";

const DashboardPage = () => {
  const pageHeight = "min-h-screen";

  return (
    <main className={cn("flex justify-center", pageHeight)}>
      <Sidemenu />
      <Dashboard />
    </main>
  );
};

export default DashboardPage;
