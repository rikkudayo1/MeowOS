import { MacOSDock } from "../ui/mac-os-dock"
import { useState, useEffect } from "react"

import { demoApps } from "@/data/AppData"
import { useApp } from "@/store/useApp"

const Footerbar = () => {
  const [mounted, setMounted] = useState(false)

  const openApps = useApp((state) => state.openApps)
  const toggleApp = useApp((state) => state.toggleApp)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0" />
  }

  return (
    <div className="fixed flex items-center justify-center bottom-5 left-[10vw] right-[10vw] h-[8vh] bg-transparent z-10">
        <MacOSDock apps={demoApps} onAppClick={toggleApp} openApps={openApps} />
    </div>
  )
}

export default Footerbar