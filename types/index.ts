export type OSState = {
    unlocked: boolean,
    unlock: () => void,
    lock: () => void
}

export interface AppState {
    openApps: string[],
    toggleApp: (appId: string) => void
    openApp: (appId: string) => void
    closeApp: (appId: string) => void
}