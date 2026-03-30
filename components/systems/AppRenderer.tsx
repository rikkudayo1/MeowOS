import { useApp } from "@/store/useApp"
import { demoApps } from "@/data/AppData"
import AppWindow from "./AppWindow"
import { AnimatePresence } from "framer-motion"

import Image from "next/image"

const AppRenderer = () => {
  const openApps = useApp((s) => s.openApps)
  const openApp = useApp((s) => s.openApp)

  return (
    <div className="h-[87vh] relative" id="bound">
        <AnimatePresence>
            {openApps.map((appId, index) => {
                const app = demoApps.find((a) => a.id === appId)
                if (!app) return null

                return <AppWindow key={appId} app={app} index={index} />
            })}
        </AnimatePresence>
        <div className="w-screen h-screen flex">
            <div className="mt-20 mb-24 ml-36 mr-36 flex flex-col gap-3 flex-wrap">
                {demoApps.map((app) => {
                    return (
                        <div onClick={() => openApp(app.id)} style={{ transition: ".25s" }} className="flex flex-col items-center hover:scale-110 hover:cursor-pointer active:scale-95" key={app.id}>
                            <Image width={70} height={70} src={app.icon} alt="" />
                            <h1 className="text-sm">{app.name}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default AppRenderer