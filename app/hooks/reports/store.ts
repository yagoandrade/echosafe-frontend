import { Complaint } from "@/app/reports/components/complaints-table/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IComplaintStore {
  complaints: Complaint[];
  setComplaints: (complaints: Complaint[]) => void;
}

export const useReportStore = create(
  persist<IComplaintStore>(
    (set) => ({
      complaints: [],
      setComplaints: (complaints) => set({ complaints }),
    }),
    {
      name: "complaints-storage",
      getStorage: () => localStorage,
    }
  )
);
