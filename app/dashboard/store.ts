import { create } from "zustand";
import type { IDashInfo } from "./types";

type ExtendedDashInfoProps = IDashInfo & {
  setDashInfo: (params: IDashInfo) => void;
};

export const useDashStore = create<ExtendedDashInfoProps>((set) => ({
  cases: [],
  month: "",
  setDashInfo: ({ cases, month }) => set({ cases, month }),
}));
