import MembersTable from "@/components/institutions/members-table";
import ManagingInstitutionSection from "@/components/shared/managing-institution";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import Sidemenu from "@/components/shared/sidemenu";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Members | EchoSafe®",
  description: "Manage the members of your institutions here.",
};

const Members = async () => {
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
                  You can manage the members of your institutions here.
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
              { href: "/members", label: "Members" },
            ]}
          />
        </div>
        <MembersTable />
      </div>
    </main>
  );
};

export default Members;
