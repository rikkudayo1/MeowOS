import Image from "next/image"

const Profile = () => {
  return (
    <div className="font-fredoka w-full text-[#1a2a4a] bg-[url('/images/catgif.gif')] bg-cover bg-center bg-no-repeat">
      <div className="relative z-10 pb-4">
        {/* nav */}
        <nav className="flex justify-start p-4">
          <div className="flex items-center gap-3 bg-[#e6ffdfe1] border-2 border-[#28b600] rounded-2xl px-4 py-2 shadow-md">
            <Image
              className="rounded-full border-4 border-[#28b600]"
              src="/images/pfp.png"
              alt=""
              width={44}
              height={44}
              draggable={false}
            />
            <span className="text-lg font-semibold text-[#28b600]">toorutle ✦</span>
          </div>
        </nav>

        {/* hero */}
        <div className="mx-4 mt-2">
          <div className="bg-[#f5fff2e1] border-4 border-[#28b600] rounded-3xl px-8 py-8 shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-[#28b600] tracking-widest uppercase mb-1">welcome to</p>
              <h1 className="text-5xl font-bold text-[#28b600] leading-tight">my little<br />portfolio ✦</h1>
            </div>
            <div className="text-6xl select-none">🌿</div>
          </div>
        </div>

        {/* cards */}
        <div className="flex flex-wrap gap-4 mx-4 mt-4">
          <div className="bg-[#f5fff2e1] border-4 border-[#28b600] rounded-3xl p-5 shadow-md flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🐱</span>
              <h2 className="text-xl font-bold text-[#28b600]">who am i?</h2>
            </div>
            <ul className="space-y-1 text-[#2c691b] text-sm">
              <li>✦ Siraphop Raksaphol</li>
              <li>✦ 17 years old</li>
              <li>✦ Thailand 🇹🇭</li>
              <li>✦ Thai / Eng / 日本語</li>
              <li>✦ IG : @toorutle</li>
            </ul>
          </div>

          <div className="bg-[#f5fff2e1] border-4 border-[#28b600] rounded-3xl p-5 shadow-md flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💻</span>
              <h2 className="text-xl font-bold text-[#28b600]">what i do?</h2>
            </div>
            <ul className="space-y-1 text-[#1e3a5f] text-sm">
              <li>✦ Web Development</li>
              <li>✦ Game Development</li>
              <li>✦ UI / UX Design</li>
              <li>✦ AI Apps</li>
            </ul>
          </div>
        </div>

        {/* footer */}
        <footer className="mx-4 mt-6 mb-15 bg-[#e6ffdfe1] border-4 border-[#28b600] rounded-3xl py-6 flex items-center justify-center shadow-md">
          <p className="text-[#28b600] text-sm tracking-wide">✦ made with love by toorutle ✦</p>
        </footer>
      </div>
    </div>
  )
}

export default Profile