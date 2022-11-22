import create from "zustand";

export const useBundlrStore = create((set) => ({
  initialiseBundlr: null,
  bundlrInstance: null,
  balance: null,
  fetchBalance: null,

  setInitialiseBundlr: (initialiseBundlr: any) =>
    set((state: any) => ({ initialiseBundlr: initialiseBundlr })),
  setBundlrInstance: (bundlrInstance: any) =>
    set((state: any) => ({ bundlrInstance: bundlrInstance })),
  setBalance: (balance: any) => set((state: any) => ({ balance: balance })),
  setFetchBalance: (fetchBalance: any) =>
    set((state: any) => ({ fetchBalance: fetchBalance })),
}));
