import { useState } from "react"

const keys = [
  { label: "C",  type: "clear"  },
  { label: "(",  type: "input"  },
  { label: ")",  type: "input"  },
  { label: "←",  type: "back"   },
  { label: "7",  type: "input"  },
  { label: "8",  type: "input"  },
  { label: "9",  type: "input"  },
  { label: "%",  type: "input"  },
  { label: "4",  type: "input"  },
  { label: "5",  type: "input"  },
  { label: "6",  type: "input"  },
  { label: "÷",  type: "input", val: "/" },
  { label: "1",  type: "input"  },
  { label: "2",  type: "input"  },
  { label: "3",  type: "input"  },
  { label: "×",  type: "input", val: "*" },
  { label: ".",  type: "input"  },
  { label: "0",  type: "input"  },
  { label: "+",  type: "input"  },
  { label: "−",  type: "input", val: "-" },
]

const Calculator = () => {
  const [current, setCurrent] = useState("0")
  const [history, setHistory] = useState("")

  const handleInput = (val: string) => {
    setCurrent(prev => prev === "0" ? val : prev + val)
  }

  const handleClear = () => {
    setCurrent("0")
    setHistory("")
  }

  const handleBack = () => {
    setCurrent(prev => prev.length <= 1 ? "0" : prev.slice(0, -1))
  }

  const handleEval = () => {
    try {
      const result = Function(`"use strict"; return (${current})`)()
      const rounded = parseFloat(result.toFixed(10))
      setHistory(`${current} =`)
      setCurrent(String(rounded))
    } catch {
      setHistory(current)
      setCurrent("error")
      setTimeout(() => { setCurrent("0"); setHistory("") }, 900)
    }
  }

  const keyBase = "h-16 rounded-md text-base font-mono flex items-center justify-center cursor-pointer select-none hover:scale-110 active:scale-100 transition-transform duration-100"

  return (
    <div className="flex justify-center p-8 font-mono">
      <div className="w-80 bg-[#1a1a1a] rounded-xl p-5 border border-[#2e2e2e]">
        <div className="bg-[#0d0d0d] rounded-md p-4 mb-4 min-h-24 flex flex-col justify-between border border-[#2a2a2a]">
          <p className="text-xs text-[#555] text-right truncate min-h-[18px]">{history}</p>
          <p className="text-3xl text-[#e8e8e8] text-right truncate tracking-tight">{current}</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {keys.map((key, i) => (
            <button
              key={i}
              onClick={() => {
                if (key.type === "clear") handleClear()
                else if (key.type === "back") handleBack()
                else handleInput(key.val ?? key.label)
              }}
              className={`${keyBase} ${
                key.type === "clear"
                  ? "bg-[#3a1a1a] text-[#cc5555] border-b-2 border-[#1a0a0a]"
                  : key.label.match(/[÷×+−%()]/)
                  ? "bg-[#222] text-[#888] border-b-2 border-[#111]"
                  : "bg-[#2a2a2a] text-[#d8d8d8] border-b-2 border-[#111]"
              }`}
            >
              {key.label}
            </button>
          ))}

          <button
            onClick={handleEval}
            className={`${keyBase} col-span-2 bg-[#e8e8e8] text-[#111] border-b-2 border-[#bbb] text-xl hover:bg-[#f0f0f0]`}
          >
            =
          </button>
        </div>
      </div>
    </div>
  )
}

export default Calculator