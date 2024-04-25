import ManageInstitutions from "@/components/institutions/institutions-table";
import ManagingInstitutionSection from "@/components/shared/managing-institution";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import Sidemenu from "@/components/shared/sidemenu";
import { Button } from "@/components/ui/button";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { LogIn, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Institutions | EchoSafe®",
  description:
    "Manage your institutions here. Create, join, and manage your institutions.",
};

const ManageInstituionsPage = async () => {
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
                  You can manage your institutions here.
                </p>
              </>
            )}
          </div>
          <ManagingInstitutionSection />
        </div>
        <div className="flex w-full justify-between flex-wrap">
          <PageBreadcrumb
            items={[
              { href: "/", label: "Home" },
              { href: "/institutions", label: "My Institutions" },
            ]}
          />
          <div className="flex gap-x-2">
            <Button variant="provider" asChild>
              <Link href="/institution/join" className="gap-x-1">
                <LogIn className="h-4 w-4" />
                Join Institution
              </Link>
            </Button>
            <Button variant="primary" asChild>
              <Link href="/institution/create" className="gap-x-1">
                <Plus className="h-4 w-4" />
                Create Institution
              </Link>
            </Button>
          </div>
        </div>
        <ManageInstitutions />
      </div>
    </main>
  );
};

export default ManageInstituionsPage;
