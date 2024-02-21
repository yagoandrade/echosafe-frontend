import { User } from "firebase/auth";
import { create } from "zustand";

export type Data = {
  schoolName?: string;
  owner?: string;
  uid: string;
  code?: string;
  linkedSchool?: string;
  role?: string;
  email?: string;
  name?: string;
  displayName?: string;
};

interface IUserData {
  userData: Data;
  setUserData: (data: Data) => void;
}

export const useCurrentUserStore = create<IUserData>((set) => ({
  userData: {} as Data,
  setUserData: (userData) => set((state) => ({ ...state, userData })),
}));

export const useLocalUser = create<{
  localData: User;
  setLocalData: (data: User) => void;
}>((set) => ({
  localData: {} as User,
  setLocalData: (localData) => set({ localData }),
}));
