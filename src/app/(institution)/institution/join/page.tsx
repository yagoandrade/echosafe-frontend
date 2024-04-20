import { JoinInstitution } from "@/app/_components/join-institution";
import ManagingInstitutionSection from "@/components/shared/managing-institution";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import Sidemenu from "@/components/shared/sidemenu";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Join an Institution | EchoSafe®",
  description:
    "Join an Institution.",
};

const JoinInstitutionPage = async () => {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin?csrf=true");

  const subscriptionPlan = await getUserSubscriptionPlan(session.user.email!);
  if (!subscriptionPlan.isPaid || !subscriptionPlan.stripeCustomerId)
    redirect("/pricing");

  return (
    <main className={cn("flex min-h-screen justify-center")}>
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
                  You are joining an institution.
                </p>
              </>
            )}
          </div>
          <ManagingInstitutionSection />
        </div>
        <PageBreadcrumb
          items={[
            { href: "/", label: "Home" },
            { href: "/institutions", label: "My Institutions" },
            { label: "Join Institution" },
          ]}
        />
        <JoinInstitution />
      </div>
    </main>
  );
};

export default JoinInstitutionPage;
