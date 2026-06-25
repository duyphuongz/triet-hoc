import { create } from "zustand";
import { getAdminToken } from "../api/adminApi";

type AdminAuthState = {
  isLoggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
};

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  isLoggedIn: !!getAdminToken(),
  setLoggedIn: (status) => set({ isLoggedIn: status }),
}));
