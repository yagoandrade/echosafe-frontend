import Settings from "@/components/settings";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import Sidemenu from "@/components/shared/sidemenu";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const SettingsPage = async () => {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin?csrf=true");

  const pageHeight = !session ? "min-h-[calc(100vh-4rem)]" : "min-h-screen";

  return (
    <main className={cn("flex justify-center", pageHeight)}>
      <Sidemenu />

      <div className="h-screen w-full flex-1 flex-col space-y-8 overflow-y-scroll p-4 pl-2 pr-4 md:flex md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
          <div>
            {session?.user && (
              <>
                <h3 className="text-xl font-semibold tracking-tight">
                  Welcome back, {session?.user.name}!
                </h3>
                <p className="text-muted-foreground">
                  You can change your settings here.
                </p>
              </>
            )}
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
