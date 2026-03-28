'use client'

import { useOS } from "@/store/useOS";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

import LockScreen from "@/components/LockScreen";
import Desktop from "@/components/Desktop";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const unlocked = useOS((s) => s.unlocked)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-screen w-screen">
      <AnimatePresence>
        {!loaded && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <div>
        <AnimatePresence>
          {!unlocked && <LockScreen />}
        </AnimatePresence>
        <Desktop />
      </div>
    </div>
  );
}