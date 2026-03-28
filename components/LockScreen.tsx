'use client'

import { useOS } from "@/store/useOS"
import { useState } from "react"
import { easeInOut, motion } from "motion/react"
import Image from "next/image"

import { Particles } from "./ui/particles"

import {
  ArrowBigRightDashIcon
} from "lucide-react"

const LockScreen = () => {
  const [input, setInput] = useState("")
  const [check, setCheck] = useState(true)
  const unlock = useOS(s => s.unlock)

  const handleUnlock = () => {
    if (input === "1234") {
      unlock()
    } else {
      setCheck(false)
      
      setTimeout(() => {
        setCheck(true)
      }, 1000)
    }
  }

  return (
    <motion.div 
      className="absolute w-screen h-screen flex justify-center items-center z-50 backdrop-blur-2xl"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .5, ease: easeInOut }}
    >
      <Particles />
      <motion.div 
        className="flex flex-col items-center gap-5 translate-y-10 opacity-0"
        animate={{ opacity: 1, translateY: -70 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col justify-center items-center">
          <Image src="/images/catlogo.png" width={150} height={150} alt="" />
          <h1 className="text-2xl font-bold">Welcome, Admin!</h1>
        </div>
        <div className="border-2 border-[#2a2f33] rounded-full flex items-center h-[40px] bg-[rgba(95,95,95,0.21)]">
          <input className="pr-2 pl-3 w-[250px] outline-none border-2 border-transparent rounded-[5px]" onChange={(e) => setInput(e.target.value)} placeholder="enter password: 1234" type="text" />
          <button style={{ transition: ".25s" }} onClick={handleUnlock} className="pr-2 bg-[#2a2f33] h-[40px] w-[40px] pl-2 hover:scale-120 rounded-full"><ArrowBigRightDashIcon color="white" /></button>
        </div>
        <div>
          <h1 style={{ transition: ".25s" }} className={!check ? "text-red-400" : "text-transparent"}>Wrong password!</h1>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LockScreen