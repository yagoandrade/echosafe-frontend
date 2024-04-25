"use client";

import { api } from "@/trpc/react";
import SidemenuCreateReportButton from "./buttons/create-report";
import SidemenuManageInstitutionsButton from "./buttons/institutions-button";
import SidemenuMembersButton from "./buttons/members-button";
import SidemenuReportsButton from "./buttons/reports-button";
import SidemenuSearchButton from "./buttons/search-button";
import SidemenuSettingsButton from "./buttons/settings-button";
import SidemenuStudentReportsButton from "./buttons/student-reports-button";
import { cn } from "@/lib/utils";
import SidemenuBillingButton from "./buttons/billing-button";
import SidemenuPricingButton from "./buttons/pricing-button";
import { useActiveInstitutionStore } from "@/providers/activeInstitutionStoreProvider";
import { useEffect } from "react";

interface SidemenuButtonsProps {
  className?: string;
}

const SidemenuButtons = ({
  className = "flex flex-col h-full",
}: SidemenuButtonsProps) => {
  const { activeInstitution } = useActiveInstitutionStore((state) => state);

  const userRoleQuery = api.post.getUserRole.useQuery();

  useEffect(() => {
    void userRoleQuery.refetch();
  }, [activeInstitution]);

  return  (
    <div className={cn(className)}>
      {/* ROUTES FOR INSTITUTION PERSONNEL */}
      {userRoleQuery.status === "success" &&
        userRoleQuery.data !== "STUDENT" && (
          <>
            <SidemenuSearchButton />
            <SidemenuReportsButton />
            <SidemenuMembersButton />
            <SidemenuManageInstitutionsButton />
            <SidemenuBillingButton />
          </>
        )}

      {/* ROUTES FOR STUDENTS */}
      {userRoleQuery.status === "success" &&
        userRoleQuery.data === "STUDENT" && <SidemenuStudentReportsButton />}

      {/* COMMON ROUTES */}
      <SidemenuSettingsButton />
      <SidemenuCreateReportButton className="mt-auto" />

      {/* UNUSED ROUTES */}
      {/* <SidemenuPricingButton /> */}
      {/* <SidemenuLogsButton /> */}
      {/* <SidemenuAIResponsesButton /> */}
      {/* <SidemenuArchivedReportsButton /> */}
      {/* <SidemenuAttachmentsButton /> */}
    </div>
  );
};

export default SidemenuButtons;
