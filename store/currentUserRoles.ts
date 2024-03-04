import { create } from "zustand";
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

export const useCollaboratorStore = create<IUserRoles>((set) => ({
  isCollaborator: false,
  setIsCollaborator: (isCollaborator) => set({ isCollaborator }),
}));
