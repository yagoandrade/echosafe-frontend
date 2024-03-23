import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Data, School } from "./currentUser";

export type Role = {
  id: string;
  role: "student" | "collaborator";
  school: School;
  user: Data;
};

export interface IUserRoles {
  isCollaborator: boolean;
  setIsCollaborator: (isCollaborator: boolean) => void;
}

export const useCollaboratorStore = create(
  persist<IUserRoles>(
    (set) => ({
      isCollaborator: false,
      setIsCollaborator: (isCollaborator) => set({ isCollaborator }),
    }),
    {
      name: "collaborator-storage",
      getStorage: () => localStorage,
    }
  )
);
