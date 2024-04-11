import { type Institution } from "@prisma/client";
import { createStore } from "zustand/vanilla";

export type ActiveInstitutionState = {
  activeInstitution?: Institution | null;
};

export type ActiveInstitutionActions = {
  updateActiveInstitution: (newActiveInstitution: Institution) => void;
};

export type ActiveInstitutionStore = ActiveInstitutionState &
  ActiveInstitutionActions;

export const initActiveInstitutionStore = () => {
  return undefined;
};

export const defaultInitState: ActiveInstitutionState = {
  activeInstitution: null,
};

export const createActiveInstitutionStore = (
  initState: ActiveInstitutionState = defaultInitState,
) => {
  return createStore<ActiveInstitutionStore>()((set) => ({
    ...initState,
    updateActiveInstitution: (newActiveInstitution: Institution) =>
      set((state) => ({
        ...state,
        activeInstitution: newActiveInstitution,
      })),
  }));
};
