import type { Complaint } from "@/app/reports/components/complaints-table/types";
import { create } from "zustand";

interface IComplaintData {
  currentComplaint: Complaint;
  setCurrentComplaint: (complaint: Complaint) => void;
}

export const useCurrentReportStore = create<IComplaintData>((set) => ({
  currentComplaint: {} as Complaint,
  setCurrentComplaint: (currentComplaint) => set({ currentComplaint }),
}));
