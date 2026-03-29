import { create } from "zustand";
import { AppState } from "@/types";

export const useApp = create<AppState>((set) => ({
  openApps: [],

  toggleApp: (appId) =>
    set((state) => ({
      openApps: state.openApps.includes(appId)
        ? state.openApps.filter((id) => id !== appId)
        : [...state.openApps, appId],
    })),

  openApp: (appId) =>
    set((state) => ({
      openApps: state.openApps.includes(appId)
        ? state.openApps
        : [...state.openApps, appId],
    })),

  closeApp: (appId) =>
    set((state) => ({
      openApps: state.openApps.filter((id) => id !== appId),
    })),
}))