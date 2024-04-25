import { getServerAuthSession } from "@/server/auth";
import ManagingInstitutionSection from "../shared/managing-institution";
import { ReportsTable } from "../shared/reports-table";
import { redirect } from "next/navigation";
import { getUserSubscriptionPlan } from "@/lib/subscription";

async function Dashboard() {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin?csrf=true");

  const subscriptionPlan = await getUserSubscriptionPlan(session.user.email!);
  if (!subscriptionPlan.isPaid || !subscriptionPlan.stripeCustomerId)
    redirect("/pricing");

  return (
    <div className="flex h-screen w-full flex-col space-y-8 overflow-hidden p-4 md:p-8 md:flex">
      <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            Welcome back, {session?.user.name}!
          </h3>
          <p className="text-muted-foreground">
            Here&apos;s what happened in your institution today.
          </p>
        </div>
        <ManagingInstitutionSection />
      </div>
      {session?.user && <ReportsTable />}
    </div>
  );
}

export default Dashboard;
