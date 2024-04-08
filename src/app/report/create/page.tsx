import { CreateReport } from "@/app/_components/create-report";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import Sidemenu from "@/components/shared/sidemenu";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";

const CreateReportPage = async () => {
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
              Here&apos;s what happened in your institution today.
            </p>
          </div>
          <div className="text-endz">
            <p className="text-xs font-light uppercase text-muted-foreground">
              Managing
            </p>
            <h3 className="font-semibold text-primary">
              Institute of Computing
            </h3>
          </div>
        </div>
        <PageBreadcrumb
          items={[
            { href: "/", label: "Home" },
            { href: "/reports", label: "Reports" },
            { label: "Create a Report" },
          ]}
        />
        <CreateReport />
      </div>
    </main>
  );
};

export default CreateReportPage;
