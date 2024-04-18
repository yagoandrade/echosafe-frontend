import ReportDetails from "@/components/reports/report-details";
import ManagingInstitutionSection from "@/components/shared/managing-institution";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import Sidemenu from "@/components/shared/sidemenu";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ReportPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin?csrf=true");

  const id = params.id;

  const pageHeight = "min-h-screen";

  return (
    <main className={cn("flex justify-center", pageHeight)}>
      <Sidemenu />

      <div className="h-screen w-full flex-1 flex-col space-y-8 overflow-y-scroll p-4 pl-2 pr-4 md:flex md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              Welcome back, {session?.user.name}!
            </h3>
            <p className="text-muted-foreground">You are reading a report.</p>
          </div>
          <ManagingInstitutionSection />
        </div>
        <PageBreadcrumb
          items={[
            { href: "/", label: "Home" },
            { href: "/reports", label: "Report" },
            { label: "Report Details" },
          ]}
        />
        {id && typeof id === "string" ? (
          <ReportDetails id={id} />
        ) : (
          <p>There is no report to show you.</p>
        )}
      </div>
    </main>
  );
}
