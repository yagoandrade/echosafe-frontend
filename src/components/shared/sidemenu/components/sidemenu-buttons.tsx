import SidemenuAIResponsesButton from "./buttons/ai-reponses";
import SidemenuArchivedReportsButton from "./buttons/archived-reports";
import SidemenuAttachmentsButton from "./buttons/attachments";
import SidemenuManageInstitutionsButton from "./buttons/institutions-button";
import SidemenuLogsButton from "./buttons/logs-button";
import SidemenuMembersButton from "./buttons/members-button";
import SidemenuReportsButton from "./buttons/reports-button";
import SidemenuSearchButton from "./buttons/search-button";
import SidemenuSettingsButton from "./buttons/settings-button";

const SidemenuButtons = () => {
  return (
    <>
      <SidemenuSearchButton />
      <SidemenuReportsButton />
      <SidemenuLogsButton />
      <SidemenuMembersButton />
      <SidemenuManageInstitutionsButton />
      <SidemenuAIResponsesButton />
      <SidemenuArchivedReportsButton />
      <SidemenuAttachmentsButton />
      <SidemenuSettingsButton />
    </>
  );
};

export default SidemenuButtons;
