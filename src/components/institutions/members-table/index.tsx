/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { membersColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table/data-table";
import { useActiveInstitutionStore } from "@/providers/activeInstitutionStoreProvider";
import { api } from "@/trpc/react";
import { type UserRole } from "@prisma/client";
import { Loader, PersonStanding, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Members = { id: string; name: string | null; role: UserRole }[];

function MembersTable() {
  const { activeInstitution } = useActiveInstitutionStore((state) => state);
  const [members, setMembers] = useState<Members>([]);
  const membersQuery = api.post.getMembersFromInstitution.useQuery();

  async function fetchReports() {
    try {
      const { data } = await membersQuery.refetch();
      if (data) setMembers(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Error fetching reports");
    }
  }

  useEffect(() => {
    void fetchReports();
  }, [activeInstitution]);

  /* TODO: Update the logic here */
  return (
    <>
      {!membersQuery.isLoading && members.length === 0 && (
        <div className="flex size-full flex-col items-center justify-center gap-y-3 text-muted-foreground">
          <PersonStanding size="5rem" strokeWidth={1.75} />
          {membersQuery.error && !activeInstitution ? (
            <p>You must first select an institution to view members.</p>
          ) : (
            <p>
              It looks like there are no members in your institution. Start
              adding people!
            </p>
          )}
        </div>
      )}
      {membersQuery.isLoading && (
        <div className="flex size-full items-center justify-center">
          <Loader className="mr-2 size-4 animate-spin" /> Loading...
        </div>
      )}
      {members && members.length > 0 && (
        <div className="w-full space-y-4">
          <DataTable
            key={JSON.stringify(members)}
            tableName="members"
            dataFromServer={members}
            columns={membersColumns}
          />
        </div>
      )}
      {membersQuery.error && activeInstitution && (
        <p>Error: {membersQuery.error.message}</p>
      )}
    </>
  );
}

export default MembersTable;
