export type OSState = {
    unlocked: boolean,
    unlock: () => void,
    lock: () => void
}

export interface AppState {
    openApps: string[]
    focusOrder: string[]
    minimizedApps: string[]
    maximizedApp: string[]
    currentBackground: string
    toggleApp: (appId: string) => void
    openApp: (appId: string) => void
    closeApp: (appId: string) => void
    focusApp: (appId: string) => void
    minimizeApp: (appId: string) => void
    maximizeApp: (appId: string) => void
    unmaximizeApp: (appId: string) => void
    changeBackground: (backgroundName: string) => void
}