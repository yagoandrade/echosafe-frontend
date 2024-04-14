import { getServerAuthSession } from "@/server/auth";
import ManagingInstitutionSection from "../shared/managing-institution";
import { ReportsTable } from "../shared/reports-table";

async function Dashboard() {
  const session = await getServerAuthSession();

  return (
    <div className="flex h-screen w-full flex-col space-y-8 overflow-hidden p-8 md:flex">
      <div className="flex items-center justify-between space-y-2 flex-wrap gap-2">
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
      {session?.user && (
        <>
          {/* TODO: Bring DashboardHeader back
           <DashboardHeader /> */}
          <ReportsTable />
        </>
      )}
    </div>
  );
}

export default Dashboard;
