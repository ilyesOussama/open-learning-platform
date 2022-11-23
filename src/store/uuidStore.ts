import create from "zustand";

export const useUuidStore = create((set) => ({
  id: null,
  setId: (id: any) => set((state: any) => ({ id: id })),
}));
