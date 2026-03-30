import { Rnd } from "react-rnd"
import { useState } from "react"
import { useApp } from "@/store/useApp"
import { DockApp } from "@/components/ui/mac-os-dock"

import Profile from "../applications/profile"

import { motion } from "framer-motion"

const AppWindow = ({ app, index }: { app: DockApp; index: number }) => {
  const closeApp = useApp((s) => s.closeApp)
  const focusApp = useApp((s) => s.focusApp)
  const focusOrder = useApp((s) => s.focusOrder)

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

  const maximize = () =>  {
    const bound = document.getElementById("bound")
    const bw = bound?.offsetWidth ?? window.innerWidth
    const bh = bound?.offsetHeight ?? window.innerHeight

    if (size.height === bh && size.width === bw) {
      setSize({width: 1000, height: 500})
      setPosition({ x: 100+index * 40, y: 100+index * 40 })
      setMaximise(false);
    } else {
      setSize({width: bw, height: bh})
      setPosition({ x: 0, y: 0 })
      setMaximise(true)
    }
  }

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .15 }}
        style={{ zIndex }}
        onMouseDown={() => focusApp(app.id)}
    >
        <Rnd
        style={{ zIndex, display: "flex", flexDirection: "column" }}
        size={size}
        position={position}
        bounds="#bound"
        minWidth={400}
        minHeight={300}
        onDragStop={(e, d) => {
            setPosition({ x: d.x, y: d.y })
        }}
        onResizeStop={(e, direction, ref, delta, pos) => {
            setSize({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            })
            setPosition(pos)
        }}
        className="bg-zinc-900 text-white shadow-xl absolute shrink-0 rounded-2xl"
        >
          <div className="h-full overflow-hidden rounded-2xl">
            <div className="flex justify-between items-center bg-accent pl-3 pr-3 pt-2 pb-2">
              <div className="flex justify-center items-center gap-1">
                <div className="rounded-full w-3 h-3 bg-red-400"></div>
                <div className="rounded-full w-3 h-3 bg-green-400"></div>
                <div className="rounded-full w-3 h-3 bg-yellow-400"></div>
              </div>
              <span>{app.name}</span>
              <div className="flex items-center justify-center gap-1">
                {!maximized ? <button onClick={() => maximize()} className="text-md px-2 py-1 rounded"> ▢ </button> : <button onClick={() => maximize()} className="text-md px-2 py-1 rounded"> ⊟ </button>}
                <button onClick={() => closeApp(app.id)} className="text-xs px-2 py-1 rounded"> ✕ </button>
              </div>
            </div>
            <div className="w-full h-full overflow-hidden">
              <div className="w-full h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                {app.name === "Profile" ? <Profile /> : <h1>Invalid app</h1>}
              </div>
            </div>
          </div>
        </Rnd>
    </motion.div>
  )
}

export default AppWindow