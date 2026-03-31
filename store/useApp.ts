import { create } from "zustand";
import { AppState } from "@/types";

export const useApp = create<AppState>((set) => ({

  openApps: [],
  focusOrder: [],
  minimizedApps: [],
  maximizedApp: [],
  currentBackground: "cat2.gif",

  toggleApp: (appId) =>
    set((state) => {
      if (state.openApps.includes(appId)) {
        if (state.minimizedApps.includes(appId)) {
          return {
            minimizedApps: state.minimizedApps.filter((id) => id !== appId),
            focusOrder: [...state.focusOrder.filter((id) => id !== appId), appId],
          }
        } else {
          return {
            minimizedApps: [...state.minimizedApps, appId],
            focusOrder: state.focusOrder.filter((id) => id !== appId),
          }
        }
      }
      return {
        openApps: [...state.openApps, appId],
        minimizedApps: state.minimizedApps.filter((id) => id !== appId),
        focusOrder: [...state.focusOrder.filter((id) => id !== appId), appId],
      }
    }),

  openApp: (appId) =>
    set((state) => ({
      openApps: state.openApps.includes(appId) ? state.openApps : [...state.openApps, appId],
      minimizedApps: state.minimizedApps.filter((id) => id !== appId),
      focusOrder: [...state.focusOrder.filter((id) => id !== appId), appId],
    })),

    closeApp: (appId) =>
      set((state) => ({
        openApps: state.openApps.filter((id) => id !== appId),
        minimizedApps: state.minimizedApps.filter((id) => id !== appId),
        focusOrder: state.focusOrder.filter((id) => id !== appId),
        maximizedApps: state.maximizedApp.filter((id) => id !== appId),
      })),

  focusApp: (appId) =>
    set((state) => ({
      minimizedApps: state.minimizedApps.filter((id) => id !== appId),
      focusOrder: [...state.focusOrder.filter((id) => id !== appId), appId],
    })),

  minimizeApp: (appId) =>
    set((state) => ({
      minimizedApps: [...state.minimizedApps, appId],
      focusOrder: state.focusOrder.filter((id) => id !== appId),
    })),

  maximizeApp: (appId) =>
    set((state) => ({
      maximizedApp: state.maximizedApp.includes(appId)
        ? state.maximizedApp
        : [...state.maximizedApp, appId],
    })),

  unmaximizeApp: (appId) =>
    set((state) => ({
      maximizedApp: state.maximizedApp.filter((id) => id !== appId),
    })),
  
  changeBackground: (backgroundName) =>
    set((state) => ({
      currentBackground: state.currentBackground = backgroundName,
    })),
}));