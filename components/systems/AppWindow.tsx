import { Rnd } from "react-rnd"
import { useState } from "react"
import { useApp } from "@/store/useApp"
import { DockApp } from "@/components/ui/mac-os-dock"

import { motion } from "framer-motion"

const AppWindow = ({ app, index }: { app: DockApp; index: number }) => {
  const closeApp = useApp((s) => s.closeApp)

  const [size, setSize] = useState({
    width: 400,
    height: 300,
  })

  const [position, setPosition] = useState({
    x: 100 + index * 40,
    y: 100 + index * 40,
  })

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .15 }}
    >
        <Rnd
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
        className="bg-zinc-900 text-white rounded-xl shadow-xl absolute z-10 border-primary-accent border-2 overflow-hidden"
        >
          <div className="flex justify-between items-center mb-2 bg-accent pl-3 pr-3 pt-2 pb-2">
              <div className="flex justify-center items-center gap-1">
                <div className="rounded-full w-3 h-3 bg-red-400"></div>
                <div className="rounded-full w-3 h-3 bg-green-400"></div>
                <div className="rounded-full w-3 h-3 bg-yellow-400"></div>
              </div>
              <span>{app.name}</span>
              <button onClick={() => closeApp(app.id)} className="text-xs px-2 py-1 rounded"> ✕ </button>
          </div>
          <div className="p-4">{app.name} content</div>
        </Rnd>
    </motion.div>
  )
}

export default AppWindow