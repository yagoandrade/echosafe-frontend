import { CreateInstitution } from "@/app/_components/create-institution";
import ManagingInstitutionSection from "@/components/shared/managing-institution";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import Sidemenu from "@/components/shared/sidemenu";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const CreateInstitutionPage = async () => {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin?csrf=true");

  const subscriptionPlan = await getUserSubscriptionPlan(session.user.email!);
  if (!subscriptionPlan.isPaid || !subscriptionPlan.stripeCustomerId)
    redirect("/pricing");

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
                  You are creating a new institution.
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
            { label: "Create Institution" },
          ]}
        />
        <CreateInstitution />
      </div>
    </main>
  );
};

export default CreateInstitutionPage;
