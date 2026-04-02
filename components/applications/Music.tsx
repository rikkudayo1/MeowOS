import { useState } from "react"
import Image from "next/image"
import { SongData } from "@/data/SongData"

import PlayerBar from "../PlayerBar"

const Music = () => {
    const [currentSong, setCurrentSong] = useState<typeof SongData[0] | null>(null)
    const [currentIndex, setCurrentIndex] = useState<number | null>(null)

    return (
        <div className="font-fredoka min-h-full overflow-x-hidden">
            <div className="w-full flex flex-col p-10 mb-[200px]">
                <div style={{ backgroundImage: "url('/images/pondgif.gif')" }} className="bg-black bg-cover bg-center bg-no-repeat w-full h-[300px] rounded-2xl flex items-center">
                    <div className="ml-10 flex flex-col gap-3">
                        <h1 className="text-6xl text-shadow-lg text-shadow-accent">Music</h1>
                        <h1 className="text-2xl text-shadow-lg text-shadow-accent">play whatever music you like!</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-10 bg p-5 rounded-2xl border-[#292929] border-2 bg-[#29292978]">
                    {SongData.map((s, id) => {
                        return (
                            <div key={id} onClick={() => setCurrentIndex(id)} style={{ transition: "all .25s" }} className={`flex items-center justify-between gap-5 w-full py-2 px-5 rounded-xl cursor-pointer ${currentIndex === id ? "bg-accent" : "hover:bg-accent"}`}>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-3xl w-[20px] text-center">{s.id}</h1>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-[50px] h-[50px] overflow-hidden rounded-[10px] border-4 ml-5">
                                            <Image src={`/images/songs/${s.imagePath}`} width={50} height={50} alt="" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h1>{s.name}</h1>
                                            <h1 className="text-gray-400">{s.author}</h1>
                                        </div>
                                    </div>
                                </div>
                                {currentSong?.id === s.id && (
                                    <h1 className="text-gray-500">▶ playing</h1>)
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
            <PlayerBar songs={SongData} currentIndex={currentIndex} onSongChange={setCurrentIndex} />
        </div>
    )
}

export default Music