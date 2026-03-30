import { create } from "zustand";
import { AppState } from "@/types";

export const useApp = create<AppState>((set) => ({
  openApps: [],
  focusOrder: [],

  toggleApp: (appId) =>
    set((state) => ({
      openApps: state.openApps.includes(appId)
        ? state.openApps.filter((id) => id !== appId)
        : [...state.openApps, appId],
      focusOrder: state.focusOrder.includes(appId)
        ? state.focusOrder.filter((id) => id !== appId)
        : [...state.focusOrder, appId],
    })),

  openApp: (appId) =>
    set((state) => ({
      openApps: state.openApps.includes(appId) ? state.openApps : [...state.openApps, appId],
      focusOrder: [...state.focusOrder.filter((id) => id !== appId), appId],
    })),

  closeApp: (appId) =>
    set((state) => ({
      openApps: state.openApps.filter((id) => id !== appId),
      focusOrder: state.focusOrder.filter((id) => id !== appId),
    })),

  focusApp: (appId) =>
    set((state) => ({
      focusOrder: [...state.focusOrder.filter((id) => id !== appId), appId],
    })),
}));