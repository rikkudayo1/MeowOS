import { motion } from "motion/react"
import Image from "next/image"
import { TopographyBackground } from "./ui/topography"

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-[150] flex justify-center items-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .5, ease: "easeInOut" }}
    >
      <TopographyBackground className="absolute inset-0" />
      <motion.div
        className="flex flex-col items-center z-50 opacity-0"
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src={"/images/OSLogo.png"} width={450} height={450} alt="" />
        <h1 className="text-md font-bold mb-5 -translate-x-14 -translate-y-11">Toorutle's personal portfolio</h1>

        <div className="w-[350px] bg-accent h-[6px] rounded-full">
          <motion.div
            className="w-[0px] bg-white h-[6px] rounded-full"
            animate={{ width: "350px" }}
            transition={{ duration: 3 }}
          />
        </div>

        <h1 className="text-md font-bold mt-5">Loading...</h1>
      </motion.div>
    </motion.div>
  )
}

export default LoadingScreen