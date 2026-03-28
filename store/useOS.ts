import { create } from "zustand";
import { OSState } from "@/types";

export const useOS  = create<OSState>((set) => ({
    unlocked: false,
    unlock: () => set({ unlocked: true }),
    lock: () => set({ unlocked: false })
}))