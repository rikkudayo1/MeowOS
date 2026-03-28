import { MacOSDock } from "../ui/mac-os-dock"
import { useState, useEffect } from "react"

import { demoApps } from "@/data/AppData"

const Footerbar = () => {
  const [mounted, setMounted] = useState(false)
  const [openApps, setOpenApps] = useState<string[]>([])

  const handleAppClick = (appId: string) => {
    setOpenApps(prev => (prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]))
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0" />
  }

  return (
    <div className="fixed flex items-center justify-center bottom-10 left-[10vw] right-[10vw] h-[8vh] bg-transparent">
        <MacOSDock apps={demoApps} onAppClick={handleAppClick} openApps={openApps} />
    </div>
  )
}

export default Footerbar