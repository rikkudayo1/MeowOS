'use client'

import { useOS } from "@/store/useOS";

import LockScreen from "@/components/LockScreen";
import Desktop from "@/components/Desktop";

export default function Home() {
  const unlocked = useOS((s) => s.unlocked)
  return (
    <div className="h-screen w-screen">
      {!unlocked && <LockScreen />}
      <Desktop />
    </div>
  );
}
