import Settings from "@/components/settings";
import ManagingInstitutionSection from "@/components/shared/managing-institution";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import Sidemenu from "@/components/shared/sidemenu";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const SettingsPage = async () => {
  const session = await getServerAuthSession();

  const pageHeight = !session ? "min-h-[calc(100vh-4rem)]" : "min-h-screen";

  return (
    <main className={cn("flex justify-center", pageHeight)}>
      <Sidemenu />

      <div className="h-screen w-full flex-1 flex-col space-y-8 overflow-y-scroll bg-gradient-to-b from-[#fafafb] to-white p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              Welcome back, {session?.user.name}!
            </h3>
            <p className="text-muted-foreground">
              You can change your settings here.
            </p>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <PageBreadcrumb
            items={[
              { href: "/", label: "Home" },
              { href: "/settings", label: "Settings" },
            ]}
          />
        </div>
        <Settings />
      </div>
    </main>
  );
};

export default SettingsPage;
