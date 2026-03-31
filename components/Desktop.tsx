import Nav from "./desktop/nav"
import Footerbar from "./desktop/footerbar"
import AppRenderer from "./systems/AppRenderer"
import { useApp } from "@/store/useApp"

const Desktop = () => {
  const currentBackground = useApp((s) => s.currentBackground)
  return (
    <div className="w-screen h-screen overflow-hidden bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(images/${currentBackground})` }}>
        <Nav />
        <AppRenderer />
        <Footerbar />
    </div>
  )
}

export default Desktop