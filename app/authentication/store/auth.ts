import { create } from "zustand";
import { AuthFormType } from "../components/form/types";

interface IAuthStoreProps {
  currentAuthState: AuthFormType;
  toggleAuthType: () => void;
}

export const useAuthStore = create<IAuthStoreProps>((set, get) => ({
  currentAuthState: "student",
  toggleAuthType: () => {
    const currentAuthState = get().currentAuthState;
    if (currentAuthState === "student") {
      set(() => ({ currentAuthState: "school" }));
    } else {
      set(() => ({ currentAuthState: "student" }));
    }
  },
}));
