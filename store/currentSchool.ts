import { create } from "zustand";
import { persist } from "zustand/middleware";
import { School } from "./currentUser";

interface ICurrentSchoolData {
  currentSchoolId: string;
  setCurrentSchoolId: (schoolId: string) => void;
  currentSchool: School;
  setCurrentSchool: (school: School) => void;
}

export const useCurrentSchoolStore = create(
  persist<ICurrentSchoolData>(
    (set) => ({
      currentSchoolId: "",
      setCurrentSchoolId: (currentSchoolId) => {
        set({ currentSchoolId });
      },
      currentSchool: {} as School,
      setCurrentSchool: (currentSchool) => {
        set({ currentSchool });
      },
    }),
    {
      name: "currentSchool-storage",
      getStorage: () => localStorage,
    }
  )
);
