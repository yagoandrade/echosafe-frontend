import { categories } from "./components/complaints-filter/components/complaints-button/utils";
import { ComplaintFilter } from "./components/complaints-filter/types";
import type { Complaint } from "./components/complaints-table/types";
import { statusLabel } from "./components/utils";

export const COMPLAINTS_INITIAL_STATE = {
  category: [],
  status: [],
  time: "",
};

export const generateComplaints = (numComplaints: number): Complaint[] => {
  const complaints: Complaint[] = [];

  for (let i = 0; i < numComplaints; i++) {
    const newDate = new Date();

    const randomMonth = Math.floor(Math.random() * 12);
    newDate.setMonth(randomMonth);

    newDate.setDate(Math.min(newDate.getDate(), 28));

    newDate.setDate(newDate.getDate() - i);

    const newComplaint: Complaint = {
      category: categories[i % categories.length],
      classGroup: `${
        Math.floor(Math.random() * 9) + 1
      }º ano ${String.fromCharCode(65 + i)}`,
      details: `Detalhes da reclamação ${i + 1}`,
      receivedDate: newDate,
      status: Object.keys(statusLabel)[
        Math.floor(Math.random() * 4)
      ] as Complaint["status"],
      id: i.toString(),
      sender: "askdasidojasiodj",
    };

    complaints.push(newComplaint);
  }

  return complaints;
};

export const complaints = generateComplaints(20);

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
          JSON.parse(complaint.category).includes(category)
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
      new Date(complaint.receivedDate) >
        getTimeInterval(complaintParameters.time);
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
