import ManageInstitutions from "@/components/manage-institutions";
import Sidemenu from "@/components/shared/sidemenu";
import { cn } from "@/lib/utils";
import React from "react";

const ManageInstituionsPage = () => {
  const pageHeight = "min-h-screen";

  return (
    <main className={cn("flex justify-center", pageHeight)}>
      <Sidemenu />
      <ManageInstitutions />
    </main>
  );
};

export default ManageInstituionsPage;
