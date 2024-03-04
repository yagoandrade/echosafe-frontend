import { create } from "zustand";
import { School } from "./currentUser";

interface IComplaintData {
  currentSchoolId: string;
  setCurrentSchoolId: (schoolId: string) => void;
  currentSchool: School;
  setCurrentSchool: (school: School) => void;
}

export const useCurrentSchoolStore = create<IComplaintData>((set) => ({
  currentSchoolId: "",
  setCurrentSchoolId: (currentSchoolId) => set({ currentSchoolId }),
  currentSchool: {} as School,
  setCurrentSchool: (currentSchool) => set({ currentSchool }),
}));
