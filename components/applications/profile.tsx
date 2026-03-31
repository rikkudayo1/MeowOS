"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

import { Particles } from "../ui/particles"

const Profile = () => {
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = starsRef.current
    if (!container) return
    for (let i = 0; i < 80; i++) {
      const star = document.createElement("div")
      const size = Math.random() * 2.5 + 0.5
      star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: white;
        border-radius: 9999px;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: twinkle ${2 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 5}s;
      `
      container.appendChild(star)
    }
  }, [])

  return (
    <div
      className="font-fredoka min-h-full relative overflow-x-hidden"
    >
      <Particles className="-z-10 rounded-2xl" />
      {/* Page content */}
      <div className="relative z-10 max-w-[700px] mx-auto px-5 pt-7 pb-10">

        {/* NAV */}
        <nav className="anim-0 flex items-center justify-between mb-9">
          <div className="flex items-center gap-3">
            <div
              className="w-[50px] h-[50px] rounded-full p-[2px] shrink-0"
              style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa, #f0abfc)" }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-xl text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
              >
                <Image src="/images/pfp.png" width="50" height="50" alt="" className="rounded-full" />
              </div>
            </div>
            <div>
              <div className="text-[18px] font-semibold text-white tracking-[0.3px]">toorutle</div>
              <div className="text-[12px] text-purple-300/80" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Siraphop Raksaphol
              </div>
            </div>
          </div>
          <div
            className="rounded-full px-[14px] py-[6px] text-[12px] text-purple-300 border border-purple-400/40 bg-purple-400/20"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            MeowOS
          </div>
        </nav>

        {/* HERO */}
        <div className="anim-1 text-center py-5 pb-8">
          <p
            className="text-[12px] tracking-[3px] uppercase text-purple-300/70 mb-3"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            welcome to
          </p>
          <h1 className="text-[52px] sm:text-[52px] max-[500px]:text-[38px] font-bold leading-[1.1] mb-4">
            my little portfolio<br />
          </h1>
          <p
            className="text-[15px] text-purple-200/75 leading-relaxed max-w-[360px] mx-auto"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            17 y/o developer from Thailand crafting beautiful web experiences, games, and AI apps.
          </p>
        </div>

        {/* CARDS */}
        <div className="anim-2 flex flex-col gap-3.5">

          {/* About + Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

            {/* WHO AM I */}
            <div className="glass rounded-3xl p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3.5 bg-violet-500/20">🐱</div>
              <div className="text-[16px] font-semibold text-white/95 mb-3">who am i?</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 rounded-2xl p-3 bg-white/5 border border-white/[0.08]">
                  <div
                    className="text-[10px] uppercase tracking-[1.5px] text-purple-300/60 mb-1"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >Full name</div>
                  <div className="text-[14px] text-white font-medium">Siraphop Raksaphol</div>
                </div>
                <div className="rounded-2xl p-3 bg-white/5 border border-white/[0.08]">
                  <div
                    className="text-[10px] uppercase tracking-[1.5px] text-purple-300/60 mb-1"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >Age</div>
                  <div className="text-[14px] text-white/90 font-medium">17 y/o</div>
                </div>
                <div className="rounded-2xl p-3 bg-white/5 border border-white/[0.08]">
                  <div
                    className="text-[10px] uppercase tracking-[1.5px] text-purple-300/60 mb-1"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >Location</div>
                  <div className="text-[14px] text-white/90 font-medium">Thailand 🇹🇭</div>
                </div>
                <div className="col-span-2 rounded-2xl p-3 bg-white/5 border border-white/[0.08]">
                  <div
                    className="text-[10px] uppercase tracking-[1.5px] text-purple-300/60 mb-1"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >Instagram</div>
                  <div className="text-[14px] text-pink-300 font-medium">@toorutle</div>
                </div>
              </div>
            </div>

            {/* LANGUAGES */}
            <div className="glass rounded-3xl p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3.5 bg-cyan-500/20">💬</div>
              <div className="text-[16px] font-semibold text-white/95 mb-3">languages</div>
              <div className="flex flex-col gap-2">
                {[
                  { flag: "🇹🇭", name: "Thai",    level: "Native" },
                  { flag: "🇬🇧", name: "English", level: "Fluent" },
                  { flag: "🇯🇵", name: "日本語",   level: "Learning" },
                ].map(({ flag, name, level }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2 bg-white/[0.06] border border-white/10"
                  >
                    <span className="text-xl">{flag}</span>
                    <div>
                      <div className="text-[13px] text-white/85 font-medium">{name}</div>
                      <div
                        className="text-[10px] text-purple-300/60"
                        style={{ fontFamily: "'Nunito', sans-serif" }}
                      >{level}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WHAT I DO*/}
          <div className="glass rounded-3xl p-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3.5 bg-blue-500/20">💻</div>
            <div className="text-[16px] font-semibold text-white/95 mb-3">what i do</div>
            <div className="flex flex-wrap gap-2">
              {[
                ["Web Development",     "bg-violet-500/20 border-violet-500/40 text-violet-300"],
                ["Full-Stack Apps",     "bg-blue-500/20   border-blue-500/40   text-blue-300"],
                ["UI / UX Design",      "bg-pink-500/20   border-pink-500/40   text-pink-300"],
                ["AI Integration",      "bg-cyan-500/20   border-cyan-500/40   text-cyan-300"],
                ["Game Development",    "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"],
                ["Music Visualization", "bg-amber-500/20  border-amber-500/40  text-amber-300"],
              ].map(([label, cls]) => (
                <span
                  key={label}
                  className={`tag px-3.5 py-1.5 rounded-full text-[13px] font-medium border ${cls}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/*Tech Stack + Connect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

            {/* TECH STACK */}
            <div className="glass rounded-3xl p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3.5 bg-emerald-500/20">⚡</div>
              <div className="text-[16px] font-semibold text-white/95 mb-3">tech stack</div>
              <div className="flex flex-wrap gap-2">
                {[
                  ["Next.js",    "bg-blue-500/20    border-blue-500/40    text-blue-300"],
                  ["TypeScript", "bg-cyan-500/20    border-cyan-500/40    text-cyan-300"],
                  ["Tailwind",   "bg-violet-500/20  border-violet-500/40  text-violet-300"],
                  ["Supabase",   "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"],
                  ["Framer",     "bg-amber-500/20   border-amber-500/40   text-amber-300"],
                  ["React",      "bg-pink-500/20    border-pink-500/40    text-pink-300"],
                ].map(([label, cls]) => (
                  <span
                    key={label}
                    className={`tag px-3.5 py-1.5 rounded-full text-[13px] font-medium border ${cls}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* CONNECT */}
            <div className="glass rounded-3xl p-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3.5 bg-pink-500/20">✉️</div>
              <div className="text-[16px] font-semibold text-white/95 mb-3">connect</div>
              <div className="flex flex-col">
                {[
                  { dot: "bg-pink-300",    name: "Instagram", handle: "@toorutle",    href: "https://instagram.com/toorutle" },
                  { dot: "bg-blue-300",    name: "GitHub",    handle: "rikkudayo1",     href: "https://github.com/rikkudayo1" },
                  { dot: "bg-emerald-300", name: "Portfolio", handle: "toorutle.dev", href: "#" },
                ].map(({ dot, name, handle, href }, i, arr) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`slink flex items-center gap-2.5 py-2.5 no-underline ${i < arr.length - 1 ? "border-b border-white/[0.06]" : ""}`}
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                    <span className="text-[14px] text-white/85 flex-1">{name}</span>
                    <span
                      className="text-[13px] text-purple-300/70"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >{handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className="anim-3 text-center p-15">
          <p
            className="text-[13px] text-purple-300/50 tracking-[1.5px]"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            made with love by toorutle
          </p>
        </footer>

      </div>
    </div>
  )
}

export default Profile