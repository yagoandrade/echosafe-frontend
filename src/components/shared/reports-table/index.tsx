"use client";

import { useActiveInstitutionStore } from "@/providers/activeInstitutionStoreProvider";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { columns, studentColumns } from "../../columns";
import { DataTable } from "../../data-table/data-table";
import { type Post } from "@prisma/client";
import { toast } from "sonner";
import { MessageSquareDashed } from "lucide-react";
import { Spinner } from "../loading-spinner";

type Modify<T, R> = Omit<T, keyof R> & R;

type Report = Modify<
  Post,
  {
    id: string;
  }
>;

export function ReportsTable() {
  const { activeInstitution } = useActiveInstitutionStore((state) => state);
  const [formattedReports, setFormattedReports] = useState<Report[]>([]);
  const reportsQuery = api.post.getTasks.useQuery();
  const userRole = api.post.getUserRole.useQuery();

  async function fetchReports() {
    function formatReport(report: Post): Report {
      return {
        ...report,
        id: report.id.toString(),
      };
    }

    try {
      const { data } = await reportsQuery.refetch();
      if (data) setFormattedReports(data.map(formatReport));
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Error fetching reports");
    }
  }

  useEffect(() => {
    void fetchReports();
  }, [activeInstitution]);

  return (
    <>
      {!reportsQuery.isLoading && formattedReports.length === 0 && (
        <div className="flex size-full flex-col items-center justify-center gap-y-3 text-muted-foreground">
          <MessageSquareDashed size="5rem" strokeWidth={1.75} />
          {reportsQuery.error && !activeInstitution ? (
            <p>You must first select an institution to view reports.</p>
          ) : (
            <p>
              It looks like there are no reports to show right now. Check back
              later!
            </p>
          )}
        </div>
      )}
      {reportsQuery.isLoading && (
        <div className="flex size-full items-center justify-center gap-x-2">
          <Spinner color="rgba(0, 0, 0, 0.65)" /> Loading reports...
        </div>
      )}
      {formattedReports && formattedReports.length > 0 && (
        <div className="h-full w-full space-y-4 overflow-y-auto">
          <DataTable
            key={JSON.stringify(formattedReports)}
            tableName="report"
            dataFromServer={formattedReports}
            columns={userRole.data === "STUDENT" ? studentColumns : columns}
          />
        </div>
      )}
      {reportsQuery.error && activeInstitution && (
        <p>Error: {reportsQuery.error.message}</p>
      )}
    </>
  );
}
