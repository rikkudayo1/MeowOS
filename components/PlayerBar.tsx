import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface Song {
  id: string
  name: string
  author: string
  imagePath: string
  audioPath: string
}

interface PlayerBarProps {
  songs: Song[]
  currentIndex: number | null
  onSongChange: (index: number | null) => void
}

type LoopMode = "off" | "playlist" | "song"

const PlayerBar = ({ songs, currentIndex, onSongChange }: PlayerBarProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const loopModeRef = useRef<LoopMode>("off")
  const currentIndexRef = useRef<number | null>(currentIndex)
  const onSongChangeRef = useRef(onSongChange)

  // Always keep these refs pointing at the latest values
  useEffect(() => { currentIndexRef.current = currentIndex }, [currentIndex])
  useEffect(() => { onSongChangeRef.current = onSongChange }, [onSongChange])

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [loopMode, setLoopMode] = useState<LoopMode>("off")

  const song = currentIndex !== null ? songs[currentIndex] : null

  // Store handleEnded in a ref so the audio listener always calls the latest version
  const handleEndedRef = useRef<() => void>(() => {})
  handleEndedRef.current = () => {
    const mode = loopModeRef.current
    const idx = currentIndexRef.current
    if (idx === null) return

    if (mode === "song") {
      audioRef.current?.play()
      return
    }

    const isLast = idx === songs.length - 1

    if (mode === "playlist") {
      onSongChangeRef.current(isLast ? 0 : idx + 1)
    } else {
      if (isLast) {
        onSongChangeRef.current(null)
        setPlaying(false)
        setCurrentTime(0)
      } else {
        onSongChangeRef.current(idx + 1)
      }
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }

    if (currentIndex === null) {
      audioRef.current = null
      setPlaying(false)
      setCurrentTime(0)
      setDuration(0)
      return
    }

    const audio = new Audio(`/audio/${songs[currentIndex].audioPath}`)
    audioRef.current = audio
    audio.volume = volume

    // Stable wrapper that always delegates to the latest handleEndedRef
    const onEnded = () => handleEndedRef.current()

    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime))
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration))
    audio.addEventListener("ended", onEnded)

    audio.play()
    setPlaying(true)
    setCurrentTime(0)

    return () => {
      audio.pause()
      audio.removeEventListener("ended", onEnded)
    }
  }, [currentIndex])

  const cycleLoop = () => {
    const next: LoopMode =
      loopMode === "off" ? "playlist" :
      loopMode === "playlist" ? "song" : "off"
    setLoopMode(next)
    loopModeRef.current = next
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  const playPrev = () => {
    if (currentIndex === null) return
    if (currentTime > 3) {
      audioRef.current!.currentTime = 0
      return
    }
    onSongChange(currentIndex > 0 ? currentIndex - 1 : null)
  }

  const playNext = () => {
    if (currentIndex === null) return
    onSongChange(currentIndex === songs.length - 1 ? null : currentIndex + 1)
  }

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    if (audioRef.current) audioRef.current.currentTime = val
    setCurrentTime(val)
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    if (audioRef.current) audioRef.current.volume = val
    setVolume(val)
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, "0")
    return `${m}:${sec}`
  }

  const loopButtonClass =
    loopMode === "off" ? "text-gray-400 hover:text-white" :
    loopMode === "playlist" ? "text-green-400" :
    "text-yellow-400"

  if (!song) return (
    <div className="absolute bottom-0 w-full min-h-[75px] bg-[#121212] border-t border-[#292929] flex items-center px-6 rounded-b-2xl">
      <p className="text-gray-500 text-sm">Select a song to play</p>
    </div>
  )

  return (
    <div className="absolute bottom-0 w-full h-auto bg-[#121212] border-t border-[#292929] flex items-center flex-wrap px-10 py-5 gap-6 rounded-b-2xl">

      {/* Album art + info */}
      <div className="flex items-center gap-3 w-[200px] shrink-0">
        <div className="w-[50px] h-[50px] rounded-lg overflow-hidden border border-[#333]">
          <Image src={`/images/songs/${song.imagePath}`} width={50} height={50} alt="" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-semibold truncate">{song.name}</span>
          <span className="text-xs text-gray-400 truncate">{song.author}</span>
        </div>
      </div>

      {/* Controls + scrubber */}
      <div className="flex flex-col items-center flex-1 gap-1">
        <div className="flex items-center gap-6">

          {/* Prev */}
          <button onClick={playPrev} className="text-gray-400 hover:text-white transition">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"/>
            </svg>
          </button>

          {/* Play/Pause */}
          <button onClick={togglePlay} className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 transition">
            {playing ? (
              <svg className="text-black" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
              </svg>
            ) : (
              <svg className="text-black ml-0.5" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
              </svg>
            )}
          </button>

          {/* Next */}
          <button onClick={playNext} className="text-gray-400 hover:text-white transition">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"/>
            </svg>
          </button>

          {/* Loop — cycles: off → playlist → song → off */}
          <button onClick={cycleLoop} title={`Loop: ${loopMode}`} className={`relative transition ${loopButtonClass}`}>
            {loopMode === "song" ? (
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67z"/>
                <text x="6" y="11" fontSize="7" fontWeight="bold" fill="currentColor">1</text>
              </svg>
            ) : (
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67z"/>
              </svg>
            )}
          </button>

        </div>

        {/* Progress scrubber */}
        <div className="flex items-center gap-2 w-full max-w-[500px]">
          <span className="text-xs text-gray-400 w-8 text-right">{fmt(currentTime)}</span>
          <input
            type="range" min={0} max={duration || 0} value={currentTime}
            onChange={seek} onMouseDown={e => e.stopPropagation()}
            className="flex-1 accent-white h-1 cursor-pointer"
          />
          <span className="text-xs text-gray-400 w-8">{fmt(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-[140px] shrink-0">
        <svg className="text-gray-400 shrink-0" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
          <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
        </svg>
        <input
          type="range" min={0} max={1} step={0.01} value={volume}
          onChange={changeVolume} onMouseDown={e => e.stopPropagation()}
          className="flex-1 accent-white h-1 cursor-pointer"
        />
      </div>

    </div>
  )
}

export default PlayerBar