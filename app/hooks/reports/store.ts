import { Complaint } from "@/app/reports/components/complaints-table/types";
import { create } from "zustand";

interface IComplaintStore {
  complaints: Complaint[];
  setComplaints: (complaints: Complaint[]) => void;
}

export const useReportStore = create<IComplaintStore>((set) => ({
  complaints: [],
  setComplaints: (complaints) => set({ complaints }),
}));
