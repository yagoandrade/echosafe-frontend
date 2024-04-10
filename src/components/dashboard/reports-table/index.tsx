"use client";

import { useActiveInstitutionStore } from "@/providers/activeInstitutionStoreProvider";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { columns } from "../../columns";
import { DataTable } from "../../data-table/data-table";
import { type Post } from "@prisma/client";

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
  const reports = api.post.getTasks.useQuery();

  useEffect(() => {
    const fetchReports = async () => {
      await reports.refetch();
      const filteredReports = reports.data?.filter(
        (report) => report.associatedInstitutionId === activeInstitution?.id,
      );
      if (filteredReports) {
        const formatted = filteredReports.map((report) => ({
          ...report,
          id: report.id.toString(),
        }));
        setFormattedReports(formatted);
      }
    };

    if (activeInstitution) {
      void fetchReports();
    }
  }, [activeInstitution, reports]);

  return (
    <div className="w-full space-y-4">
      {reports.isLoading && <p>Loading...</p>}
      {reports.error && <p>Error: {reports.error.message}</p>}
      {formattedReports.length > 0 ? (
        <DataTable
          tableName="report"
          dataFromServer={formattedReports}
          columns={columns}
        />
      ) : (
        <p>No reports found for the active institution.</p>
      )}
    </div>
  );
}
