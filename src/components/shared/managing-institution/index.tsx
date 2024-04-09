import { api } from "@/trpc/server";
import ManageActiveInstitution from "./manage-active-institution";

const ManagingInstitutionSection = async () => {
  const institutions = await api.post.getInstitutions();

  return institutions ? <ManageActiveInstitution /> : null;
};

export default ManagingInstitutionSection;
