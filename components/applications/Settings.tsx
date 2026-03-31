import { useApp } from "@/store/useApp"
import Image from "next/image"

const Settings = () => {
    const changeBackground = useApp((s) => s.changeBackground)
    const currentBackground = useApp((s) => s.currentBackground)

    const SetBackground = (name: string) => {
        changeBackground(name)
    }
    return (
        <div className="font-fredoka min-h-full relative overflow-x-hidden">
            <div className="m-10 overflow-y-auto">
                <h1 className="text-4xl mb-10 font-bold">Settings</h1>
                <div className="flex flex-col gap-3 mb-10">
                    <div className="border-2 p-10 rounded-2xl">
                        <h1 className="text-2xl mb-5">Wallpaper Settings (credits to all the owners)</h1>
                        <div className="flex flex-wrap gap-10">
                            <button onClick={() => SetBackground("catgif.gif")} className="flex flex-col items-center gap-2">
                                <div style={{ backgroundImage: "url('/images/catgif.gif')" }} className={`w-[350px] h-[200px] bg-cover bg-center bg-no-repeat rounded-xl 
                                ${currentBackground === "catgif.gif" ? "border-4 border-blue-400" : "hover:cursor-pointer"}`}></div>
                                <h1>catgif.gif {currentBackground === "catgif.gif" ? "(current)" : ""}</h1>
                            </button>
                            <button onClick={() => SetBackground("cat2.gif")} className="flex flex-col items-center gap-2">
                                <div style={{ backgroundImage: "url('/images/cat2.gif')" }} className={`w-[350px] h-[200px] bg-cover bg-center bg-no-repeat rounded-xl 
                                ${currentBackground === "cat2.gif" ? "border-4 border-blue-400" : "hover:cursor-pointer"}`}></div>
                                <h1>cat2.gif {currentBackground === "cat2.gif" ? "(current)" : ""}</h1>
                            </button>
                            <button onClick={() => SetBackground("cat3.gif")} className="flex flex-col items-center gap-2">
                                <div style={{ backgroundImage: "url('/images/cat3.gif')" }} className={`w-[350px] h-[200px] bg-cover bg-center bg-no-repeat rounded-xl 
                                ${currentBackground === "cat3.gif" ? "border-4 border-blue-400" : "hover:cursor-pointer"}`}></div>
                                <h1>cat3.gif {currentBackground === "cat3.gif" ? "(current)" : ""}</h1>
                            </button>
                            <button onClick={() => SetBackground("cat4.gif")} className="flex flex-col items-center gap-2">
                                <div style={{ backgroundImage: "url('/images/cat4.gif')" }} className={`w-[350px] h-[200px] bg-cover bg-center bg-no-repeat rounded-xl 
                                ${currentBackground === "cat4.gif" ? "border-4 border-blue-400" : "hover:cursor-pointer"}`}></div>
                                <h1>cat4.gif {currentBackground === "cat4.gif" ? "(current)" : ""}</h1>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings