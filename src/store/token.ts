import create from "zustand";

export const useTokenStore = create((set) => ({
  token: null,
  setToken: (token: any) => set((state: any) => ({ token: token })),
}));
