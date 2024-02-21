import React from "react";
import ComplaintsButtonContainer from "./components/complaints-button";
import { categories, status } from "./components/complaints-button/utils";
import type { ComplaintFilter, ComplaintIndexes } from "./types";
import { updateComplaintFilter } from "./utils";

interface ComplaintsFilterProps {
  complaintFilter: ComplaintFilter;
  onFilterChange: (newFilter: ComplaintFilter) => void;
}

const ComplaintsFilter: React.FC<ComplaintsFilterProps> = ({
  complaintFilter,
  onFilterChange,
}) => {
  const handleComplaintFilter = (
    complaint: ComplaintIndexes,
    value: string
  ) => {
    const newFilter = updateComplaintFilter(complaintFilter, complaint, value);
    onFilterChange(newFilter);
  };

  return (
    <div className="w-6/12 space-y-4 overflow-x-auto rounded-md border bg-white p-8 xs:hidden lg:block">
      <h3 className="mb-2 text-lg font-bold">Filtros</h3>
      <div className="mb-4 gap-4 space-y-6">
        <ComplaintsButtonContainer
          title="Enviado nos últimos"
          items={["7 dias", "30 dias", "6 meses", "12 meses"]}
          selectedItems={[complaintFilter.time]}
          onButtonClick={(value) => handleComplaintFilter("time", value)}
        />
        <ComplaintsButtonContainer
          title="Categorias"
          items={categories}
          selectedItems={complaintFilter.category}
          onButtonClick={(value) => handleComplaintFilter("category", value)}
        />
        <ComplaintsButtonContainer
          title="Estado"
          items={status}
          onButtonClick={(value) => handleComplaintFilter("status", value)}
          selectedItems={complaintFilter.status}
        />
      </div>
    </div>
  );
};

export default ComplaintsFilter;
