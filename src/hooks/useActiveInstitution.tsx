import { api } from "@/trpc/react";
import { type Institution } from "@prisma/client";
import { useState, useEffect } from "react";

export function useActiveInstitution(
  institutions?: Institution[],
): [
  string | null,
  Institution | null,
  React.Dispatch<React.SetStateAction<string | null>>,
] {
  const [activeInstitutionId, setActiveInstitutionId] = useState<string | null>(
    () => {
      const savedInstitutionId =
        typeof window !== "undefined"
          ? window.localStorage.getItem("activeInstitutionId")
          : null;
      return savedInstitutionId;
    },
  );

  const [activeInstitution, setActiveInstitution] =
    useState<Institution | null>(null);

  const updateUserInstitutionId =
    api.post.updateUserInstitutionId.useMutation();

  useEffect(() => {
    if (activeInstitutionId && typeof window !== "undefined") {
      window.localStorage.setItem("activeInstitutionId", activeInstitutionId);
      updateUserInstitutionId.mutate({ institutionId: activeInstitutionId });
    }
  }, [activeInstitutionId]);

  useEffect(() => {
    if (activeInstitutionId && institutions) {
      const institution = institutions.find(
        (institution) => institution.id.toString() === activeInstitutionId,
      );
      setActiveInstitution(institution ?? null);
    } else {
      setActiveInstitution(null);
    }
  }, [activeInstitutionId, institutions]);

  return [activeInstitutionId, activeInstitution, setActiveInstitutionId];
}
