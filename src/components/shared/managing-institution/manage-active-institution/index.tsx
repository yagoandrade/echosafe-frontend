"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useActiveInstitutionStore } from "@/providers/activeInstitutionStoreProvider";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { Spinner } from "../../loading-spinner";

const ManageActiveInstitution = () => {
  const userRole = api.post.getUserRole.useQuery();
  const institutions = api.post.getInstitutions.useQuery();
  const activeInstitutionFromDB = api.post.getActiveInstitution.useQuery();

  const { updateActiveInstitution } = useActiveInstitutionStore(
    (state) => state,
  );

  const [selectedInstitution, setSelectedInstitution] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (activeInstitutionFromDB.isSuccess) {
      if (activeInstitutionFromDB.data)
        updateActiveInstitution(activeInstitutionFromDB.data);
      setSelectedInstitution(activeInstitutionFromDB.data?.name);
    }
  }, [activeInstitutionFromDB.data, activeInstitutionFromDB.isSuccess]);

  const updateActiveInstitutionInDB: ReturnType<
    typeof api.post.updateActiveInstitution.useMutation
  > = api.post.updateActiveInstitution.useMutation({
    onSuccess: async () => {
      await activeInstitutionFromDB.refetch();
    },
  });

  let institutionText = "";

  if (!selectedInstitution) {
    institutionText = "No institution selected";
  } else if (userRole.data === "STUDENT") {
    institutionText = "Member of Institution";
  } else {
    institutionText = "Managing";
  }

  return (
    <div className="w-full sm:w-fit">
      {userRole.isLoading || activeInstitutionFromDB.isLoading ? (
        <span className="flex gap-x-2">
          <Spinner color="rgba(0, 0, 0, 0.65)" />
          <p className="text-xs font-light uppercase text-muted-foreground">
            Loading institutions...
          </p>
        </span>
      ) : (
        <>
          <p className="text-xs font-light uppercase text-muted-foreground">
            {institutionText}
          </p>
          <Select
            value={selectedInstitution ?? ""}
            disabled={activeInstitutionFromDB.isLoading}
            onValueChange={(value) => {
              updateActiveInstitutionInDB.mutate({
                institutionName: value,
              });
              setSelectedInstitution(value);
            }}
          >
            <SelectTrigger id="status" aria-label="Select Institution">
              {activeInstitutionFromDB.isLoading ? (
                <Skeleton className="h-[20px] w-[100px] rounded-xl" />
              ) : (
                <SelectValue placeholder="Select Institution" />
              )}
            </SelectTrigger>
            <SelectContent>
              {institutions.data &&
                institutions.data?.length > 0 &&
                institutions.data.map(({institution}) => (
                  <SelectItem value={institution.name} key={institution.id}>
                    {institution.name}
                  </SelectItem>
                ))}
              {institutions.data?.length === 0 && (
                <div className="flex flex-col gap-y-1">
                  <p>No institutions found.</p>
                  <Button variant="provider">Join one now!</Button>
                </div>
              )}
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  );
};

export default ManageActiveInstitution;
