import create from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  address: null,
  session: null,
  profileId: null,
  handle: null,

  setToken: (token: any) => set((state: any) => ({ token: token })),
  setAddress: (address: any) => set((state: any) => ({ address: address })),
  setSession: (session: any) => set((state: any) => ({ session: session })),
  setProfileId: (profileId: any) =>
    set((state: any) => ({ profileId: profileId })),
  setHandle: (handle: any) => set((state: any) => ({ handle: handle })),
}));
