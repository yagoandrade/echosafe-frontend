"use client";

import { api } from "@/trpc/react";
import SidemenuCreateReportButton from "./buttons/create-report";
import SidemenuManageInstitutionsButton from "./buttons/institutions-button";
import SidemenuMembersButton from "./buttons/members-button";
import SidemenuReportsButton from "./buttons/reports-button";
import SidemenuSearchButton from "./buttons/search-button";
import SidemenuSettingsButton from "./buttons/settings-button";
import SidemenuStudentReportsButton from "./buttons/student-reports-button";

const SidemenuButtons = () => {
  const userRoleQuery = api.post.getUserRole.useQuery();

  return (
    <>
      {userRoleQuery.data !== "STUDENT" && <SidemenuSearchButton />}
      {userRoleQuery.data !== "STUDENT" && <SidemenuReportsButton />}
      {/* <SidemenuLogsButton /> */}
      {userRoleQuery.data !== "STUDENT" && <SidemenuMembersButton />}
      {userRoleQuery.data !== "STUDENT" && <SidemenuManageInstitutionsButton />}
      {/* <SidemenuAIResponsesButton /> */}
      {/* <SidemenuArchivedReportsButton /> */}
      {/* <SidemenuAttachmentsButton /> */}
      {userRoleQuery.data === "STUDENT" && <SidemenuStudentReportsButton />}
      <SidemenuSettingsButton />
      <SidemenuCreateReportButton className="mt-auto" />
    </>
  );
};

export default SidemenuButtons;
