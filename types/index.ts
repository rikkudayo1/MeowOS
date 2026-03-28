export type OSState = {
    unlocked: boolean,
    unlock: () => void,
    lock: () => void
}