import Nav from "./desktop/nav"
import Footerbar from "./desktop/footerbar"
import AppRenderer from "./systems/AppRenderer"
import { Particles } from "./ui/particles"

const Desktop = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
        <Nav />
        <Particles />
        <AppRenderer />
        <Footerbar />
    </div>
  )
}

export default Desktop