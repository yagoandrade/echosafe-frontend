"use client";

import {
  type ActiveInstitutionStore,
  createActiveInstitutionStore,
  initActiveInstitutionStore,
} from "@/store/useActiveInstitutionStore";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

export const ActiveInstitutionStoreContext =
  createContext<StoreApi<ActiveInstitutionStore> | null>(null);

export interface ActiveInstitutionStoreProviderProps {
  children: ReactNode;
}

export const ActiveInstitutionStoreProvider = async ({
  children,
}: ActiveInstitutionStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ActiveInstitutionStore>>();
  if (!storeRef.current) {
    storeRef.current = createActiveInstitutionStore(
      initActiveInstitutionStore(),
    );
  }

  return (
    <ActiveInstitutionStoreContext.Provider value={storeRef.current}>
      {children}
    </ActiveInstitutionStoreContext.Provider>
  );
};

export const useActiveInstitutionStore = <T,>(
  selector: (store: ActiveInstitutionStore) => T,
): T => {
  const activeInstitutionStoreContext = useContext(
    ActiveInstitutionStoreContext,
  );

  if (!activeInstitutionStoreContext) {
    throw new Error(
      `useActiveInstitutionStore must be use within ActiveInstitutionStoreProvider`,
    );
  }

  return useStore(activeInstitutionStoreContext, selector);
};
