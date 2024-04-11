import ManageInstitutions from "@/components/institutions/institutions-table";
import ManagingInstitutionSection from "@/components/shared/managing-institution";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import Sidemenu from "@/components/shared/sidemenu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { Plus } from "lucide-react";
import Link from "next/link";

const ManageInstituionsPage = async () => {
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
              You can manage your institutions here.
            </p>
          </div>
          <ManagingInstitutionSection />
        </div>
        <div className="flex w-full justify-between">
          <PageBreadcrumb
            items={[
              { href: "/", label: "Home" },
              { href: "/institutions", label: "My Institutions" },
            ]}
          />
          <Button variant="provider" asChild>
            <Link href="/institution/create" className="gap-x-1">
              <Plus className="h-4 w-4" />
              Create Institution
            </Link>
          </Button>
        </div>
        <ManageInstitutions />
      </div>
    </main>
  );
};

export default ManageInstituionsPage;
