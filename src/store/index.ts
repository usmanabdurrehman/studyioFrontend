import { User } from "@/types";
import { create } from "zustand";

interface UserState {
  user: User | undefined;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: undefined,
  setUser: (user: User) => set((state: any) => ({ user })),
}));
