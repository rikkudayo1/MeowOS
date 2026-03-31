import { MacOSDock } from "../ui/mac-os-dock"
import { useState, useEffect, useRef } from "react"

import { demoApps } from "@/data/AppData"
import { useApp } from "@/store/useApp"

const DOCK_HIDDEN_Y = 120

const Footerbar = () => {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [translateY, setTranslateY] = useState(0)
  const animRef = useRef<number | null>(null)
  const currentY = useRef(0)

  const openApps = useApp((state) => state.openApps)
  const toggleApp = useApp((state) => state.toggleApp)
  const maximizedApps = useApp((state) => state.maximizedApp)

  const anyMaximized = maximizedApps.length > 0
  const shouldHide = anyMaximized && !isHovered

  useEffect(() => {
    const targetY = shouldHide ? DOCK_HIDDEN_Y : 0
    const animate = () => {
      const diff = targetY - currentY.current
      if (Math.abs(diff) < 0.2) {
        currentY.current = targetY
        setTranslateY(targetY)
        return
      }
      currentY.current += diff * 0.12
      setTranslateY(currentY.current)
      animRef.current = requestAnimationFrame(animate)
    }

    if (animRef.current) cancelAnimationFrame(animRef.current)
    animRef.current = requestAnimationFrame(animate)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [shouldHide])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0" />
  }

  return (
    <div
      className="fixed flex items-center justify-center bottom-0 left-0 right-0 h-[120px] bg-transparent z-99"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{ transform: `translateY(${translateY}px)` }}
        className="flex items-center justify-center"
      >
        <MacOSDock apps={demoApps} onAppClick={toggleApp} openApps={openApps} />
      </div>
    </div>
  )
}

export default Footerbar