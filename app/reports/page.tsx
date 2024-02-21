"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Sidemenu from "@/components/sidemenu";
import { useCurrentUserStore } from "@/store/currentUser";
import { NextPage } from "next";
import { useState } from "react";
import { useReportStore } from "../hooks/reports/store";
import ComplaintsFilter from "./components/complaints-filter";
import { ComplaintFilter } from "./components/complaints-filter/types";
import ComplaintsTable from "./components/complaints-table";
import { COMPLAINTS_INITIAL_STATE, filteredComplaints } from "./utils";

const Complaints: NextPage = () => {
  const [complaintFilter, setComplaintFilter] = useState<ComplaintFilter>(
    COMPLAINTS_INITIAL_STATE
  );
  const { complaints } = useReportStore();
  const { userData } = useCurrentUserStore();

  const handleFilterChange = (newFilter: ComplaintFilter) => {
    setComplaintFilter(newFilter);
  };

  const tableComplaints = filteredComplaints(complaintFilter, complaints);

  return (
    <div className="flex w-full justify-start pr-8">
      <Sidemenu />
      <div className="flex w-full flex-col gap-3 p-6 lg:py-6 lg:pr-6">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold">
          {userData.role === "school" ? "Ver Denúncias" : "Ver Suas Denúncias"}
        </h1>

        <div className="flex w-full flex-row gap-x-8">
          <ComplaintsTable
            complaints={tableComplaints ?? []}
            subtitle="Histórico de chamados na sua escola"
            title="Todos os Chamados"
          />
          <ComplaintsFilter
            complaintFilter={complaintFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Complaints;
