import { ComplaintFilter } from "./components/complaints-filter/types";
import type { Complaint } from "./components/complaints-table/types";
import { statusLabel } from "./components/utils";

export const COMPLAINTS_INITIAL_STATE = {
  category: [],
  status: [],
  time: "",
};

export const filteredComplaints = (
  complaintParameters: ComplaintFilter,
  complaints: Complaint[]
) => {
  if (!complaints) {
    return;
  }
  const filteredByCategory = complaintParameters.category.length
    ? complaints.filter((complaint) =>
        complaintParameters.category.find((category) =>
          complaint.categories.includes(category)
        )
      )
    : complaints;

  if (
    complaintParameters.category.includes("Todas") ||
    JSON.stringify(complaintParameters) ===
      JSON.stringify(COMPLAINTS_INITIAL_STATE)
  ) {
    return complaints;
  }

  return filteredByCategory.filter((complaint) => {
    const statusFilter =
      !complaintParameters.status.length ||
      complaintParameters.status.includes(statusLabel[complaint.status]);
    const timeFilter =
      !complaintParameters.time ||
      new Date() > getTimeInterval(complaintParameters.time);
    return statusFilter && timeFilter;
  });
};

const getTimeInterval = (receivedDate: string) => {
  switch (receivedDate) {
    case "12 meses": {
      return new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    }
    case "6 meses": {
      return new Date(new Date().setMonth(new Date().getMonth() - 6));
    }
    case "30 dias": {
      return new Date(new Date().setDate(new Date().getDate() - 30));
    }
    case "7 dias": {
      return new Date(new Date().setDate(new Date().getDate() - 7));
    }
    default: {
      return new Date();
    }
  }
};
