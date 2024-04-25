import { ReportsTable } from "@/components/shared/reports-table";
import ManagingInstitutionSection from "@/components/shared/managing-institution";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import Sidemenu from "@/components/shared/sidemenu";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export const metadata = {
  title: "Reports | EchoSafe®",
  description: "View the reports from your institution here.",
};

const ReportsPage = async () => {
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
                  Here are the reports from your institution.
                </p>
              </>
            )}
          </div>
          <ManagingInstitutionSection />
        </div>
        <div className="flex w-full flex-wrap justify-between">
          <PageBreadcrumb
            items={[
              { href: "/", label: "Home" },
              { href: "/reports", label: "Reports" },
            ]}
          />
        </div>
        <ReportsTable />
      </div>
    </main>
  );
};

export default ReportsPage;
