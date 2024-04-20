/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { api } from "@/trpc/server";
import { DataTable } from "../../data-table/data-table";
import { institutionColumns } from "../../columns";

async function ManageInstitutions() {
  const institutions = await api.post.getInstitutions();

  const formattedInstitutions = institutions.map(({ institution, role }) => ({
    ...institution,
    id: institution.id.toString(),
    role: role,
  }));

  return formattedInstitutions.length > 0 ? (
    <DataTable
      key={JSON.stringify(formattedInstitutions)}
      dataFromServer={formattedInstitutions}
      columns={institutionColumns}
      tableName="institution"
    />
  ) : (
    <p className="text-muted-foreground dark:text-[#cbccd9]">
      You do not have any institutions. Click in &quot;Create Institution&quot;
      to start creating your first.
    </p>
  );
}

export default ManageInstitutions;
