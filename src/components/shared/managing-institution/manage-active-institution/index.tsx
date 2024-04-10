/* TODO: Rebuild this page */

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { useState } from "react";

const ManageActiveInstitution = () => {
  const institutions = api.post.getInstitutions.useQuery();
  const activeInstitutionFromDB = api.post.getActiveInstitution.useQuery();
  const [selectedInstitution, setSelectedInstitution] = useState(
    activeInstitutionFromDB.data?.name ?? null,
  );

  const updateActiveInstitution: ReturnType<
    typeof api.post.updateActiveInstitution.useMutation
  > = api.post.updateActiveInstitution.useMutation({
    onSuccess: async () => {
      await activeInstitutionFromDB.refetch();
      
    },
  });

  return (
    <div className="text-end">
      <p className="text-xs font-light uppercase text-muted-foreground">
        Managing
      </p>

      <Select
        value={selectedInstitution ?? ""}
        onValueChange={(value) => {
          updateActiveInstitution.mutate({
            institutionName: value,
          });
          setSelectedInstitution(value);
        }}
      >
        <SelectTrigger id="status" aria-label="Select Institution">
          <SelectValue placeholder="Select Institution" />
        </SelectTrigger>
        <SelectContent>
          {institutions.data &&
            institutions.data?.length > 0 &&
            institutions.data.map((institution) => (
              <SelectItem value={institution.name} key={institution.id}>
                {institution.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ManageActiveInstitution;
