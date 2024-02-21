import { create } from "zustand";
import type { ComplaintFilter } from "./types";

interface IAuthStoreProps {
  complaintFilter: ComplaintFilter;
  setComplaintFilter: (complaintFilter: ComplaintFilter) => void;
}

export const useComplaintFilterStore = create<IAuthStoreProps>((set, get) => ({
  complaintFilter: {
    category: [],
    status: [],
    time: "",
  },
  setComplaintFilter: (complaintFilter) => ({ complaintFilter }),
}));
