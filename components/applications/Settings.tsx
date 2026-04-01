import { useApp } from "@/store/useApp"

const wallpapers = [
  { name: "catgif.gif" },
  { name: "cat2.gif" },
  { name: "cat3.gif" },
  { name: "cat4.gif" },
]

const Settings = () => {
  const changeBackground = useApp((s) => s.changeBackground)
  const currentBackground = useApp((s) => s.currentBackground)

  return (
    <div className="font-fredoka min-h-full overflow-x-hidden">
      <div className="p-8 mb-15">
        <h1 className="text-2xl font-semibold mb-6 tracking-tight">Settings</h1>

        <div className="bg-white/80 dark:bg-white/5 border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-medium tracking-widest uppercase text-black/40 dark:text-white/40 whitespace-nowrap">
              Wallpaper
            </span>
            <div className="flex-1 h-px bg-black/[0.06] dark:bg-white/[0.08]" />
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
            {wallpapers.map(({ name }) => {
              const active = currentBackground === name
              return (
                <button
                  key={name}
                  onClick={() => changeBackground(name)}
                  className="flex flex-col gap-1.5 text-left"
                >
                  <div
                    style={{ backgroundImage: `url('/images/${name}')` }}
                    className={[
                      "w-full aspect-video bg-cover bg-center rounded-[10px] border-2 relative overflow-hidden transition-all duration-150",
                      active
                        ? "border-blue-400 ring-4 ring-blue-400/20"
                        : "border-transparent hover:border-black/20 hover:scale-[1.02]",
                    ].join(" ")}
                  >
                    {active && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 stroke-white fill-none stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 12 10">
                          <polyline points="1.5,5 4.5,8.5 10.5,1.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-[13px] text-black/50 dark:text-white/50 font-medium px-0.5">
                    {name}
                    {active && <span className="text-blue-400 ml-1 text-[11px]">current</span>}
                  </p>
                </button>
              )
            })}
          </div>

          <p className="text-[11px] text-black/30 dark:text-white/30 mt-3 pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
            Credits to all original wallpaper owners.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings