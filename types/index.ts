export type OSState = {
    unlocked: boolean,
    unlock: () => void,
    lock: () => void
}

export interface AppState {
    openApps: string[]
    focusOrder: string[]
    toggleApp: (appId: string) => void
    openApp: (appId: string) => void
    closeApp: (appId: string) => void
    focusApp: (appId: string) => void
}