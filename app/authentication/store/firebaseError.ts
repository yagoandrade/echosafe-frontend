import { create } from "zustand";

interface IFirebaseError {
  error: string;
  setError: (error: string) => void;
}

export const useFirebaseErrorStore = create<IFirebaseError>((set) => ({
  error: "",
  setError: (error) => set({ error }),
}));
