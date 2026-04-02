import { Rnd } from "react-rnd"
import { useState } from "react"
import { useApp } from "@/store/useApp"
import { DockApp } from "@/components/ui/mac-os-dock"

import Profile from "../applications/profile"
import Settings from "../applications/Settings"
import CalendarApp from "../applications/Calendar"
import Calculator from "../applications/Calculator"
import Music from "../applications/Music"

import { motion } from "framer-motion"

const AppWindow = ({ app, index }: { app: DockApp; index: number }) => {
  const closeApp = useApp((s) => s.closeApp)
  const focusApp = useApp((s) => s.focusApp)
  const focusOrder = useApp((s) => s.focusOrder)
  const minimizeApp = useApp((s) => s.minimizeApp)
  const minimizedApps = useApp((s) => s.minimizedApps)
  const maximizeApp = useApp((s) => s.maximizeApp)
  const unmaximizeApp = useApp((s) => s.unmaximizeApp)

  const isMinimized = minimizedApps.includes(app.id)
  const zIndex = focusOrder.indexOf(app.id) + 10

  const [size, setSize] = useState<{width: number | string; height: number | string}>({
    width: 1000,
    height: 500,
  })

  const [position, setPosition] = useState({
    x: 100 + index * 40,
    y: 100 + index * 40,
  })

  const [maximized, setMaximise] = useState(false);
  const [isDragging, setIsDragging] = useState(false)

  const maximize = () =>  {
    const bound = document.getElementById("bound")
    const bw = bound?.offsetWidth ?? window.innerWidth
    const bh = bound?.offsetHeight ?? window.innerHeight

    if (size.height === bh && size.width === bw) {
      setSize({width: 1000, height: 500})
      setPosition({ x: 100+index * 40, y: 100+index * 40 })
      unmaximizeApp(app.id)
      setMaximise(false);
    } else {
      setSize({width: bw, height: bh})
      setPosition({ x: 0, y: 0 })
      maximizeApp(app.id)
      setMaximise(true)
    }
  }

  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isMinimized ? 0 : 1,
          scale: isMinimized ? 0.85 : 1,
          pointerEvents: isMinimized ? "none" : "auto",
        }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: .15 }}
        style={{ zIndex }}
        onMouseDown={() => focusApp(app.id)}
    >
        <Rnd
        style={{ zIndex, display: "flex", flexDirection: "column", transition: isDragging ? "none" : "all .25s" }}
        size={size}
        position={position}
        bounds="#bound"
        minWidth={400}
        minHeight={300}
        onDragStart={(e) => setIsDragging(true)}
        onDragStop={(e, d) => {
            setIsDragging(false)
            setPosition({ x: d.x, y: d.y })
        }}
        onResizeStart={() => setIsDragging(true)}
        onResizeStop={(e, direction, ref, delta, pos) => {
            setIsDragging(false)
            setSize({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            })
            setPosition(pos)
        }}
        className="bg-zinc-900 text-white shadow-xl absolute shrink-0 rounded-2xl"
        >
          <div className="h-full overflow-hidden rounded-2xl">
            <div className="flex justify-between items-center bg-accent pl-3 pr-3 pt-2 pb-2 z-10">
              <div className="flex justify-center items-center gap-1">
                <div className="rounded-full w-3 h-3 bg-red-400"></div>
                <div className="rounded-full w-3 h-3 bg-green-400"></div>
                <div className="rounded-full w-3 h-3 bg-yellow-400"></div>
              </div>
              <span>{app.name}</span>
              <div className="flex items-center justify-center gap-1">
                <button onClick={() => minimizeApp(app.id)} className="text-md px-2 py-1 rounded"> – </button>
                {!maximized ? <button onClick={() => maximize()} className="text-md px-2 py-1 rounded"> ▢ </button> : <button onClick={() => maximize()} className="text-md px-2 py-1 rounded"> ⊟ </button>}
                <button onClick={() => {
                  closeApp(app.id)
                  unmaximizeApp(app.id)
                }} className="text-xs px-2 py-1 rounded"> ✕ </button>
              </div>
            </div>
            <div className="w-full h-full overflow-hidden">
              <div className="w-full overflow-y-auto" style={{ height: "calc(100% - 36px)", scrollbarWidth: "none" }}>
                {
                  app.name === "Portfolio" ? <Profile /> :
                  app.name === "Settings" ? <Settings /> :
                  app.name === "Calendar" ? <CalendarApp /> :
                  app.name === "Calculator" ? <Calculator /> :
                  app.name === "Music" ? <Music />
                  : <h1>Invalid app</h1>
                }
              </div>
            </div>
          </div>
        </Rnd>
    </motion.div>
  )
}

export default AppWindow