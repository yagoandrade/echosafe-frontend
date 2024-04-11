"use client";
import { Button } from "@/components/ui/button";
import { useActiveInstitutionStore } from "@/providers/activeInstitutionStoreProvider";
import { api } from "@/trpc/react";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SidemenuReportsButton = () => {
  const { activeInstitution } = useActiveInstitutionStore((state) => state);
  const [numberOfReports, setNumberOfReports] = useState<number | undefined>();

  const numberOfReportsQuery = api.post.getNumberOfReports.useQuery();

  async function fetchReports() {
    try {
      const { data } = await numberOfReportsQuery.refetch();
      if (data) setNumberOfReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Error fetching reports");
    }
  }

  useEffect(() => {
    void fetchReports();
  }, [activeInstitution]);

  return (
    <Button
      variant="sidemenu"
      size="sm"
      className="justify-start gap-x-3 px-6"
      asChild
    >
      <Link href="/reports">
        <MessagesSquare className="h-4 w-4 text-muted-foreground dark:text-[#cbccd9]" />
        <p>Reports</p>
        {numberOfReports && numberOfReports > 0 && (
          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#575bc7] text-xs text-white">
            <p>{numberOfReports > 99 ? "+99" : numberOfReports}</p>
          </span>
        )}
      </Link>
    </Button>
  );
};

export default SidemenuReportsButton;
