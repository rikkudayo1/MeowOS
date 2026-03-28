import Nav from "./desktop/nav"
import Footerbar from "./desktop/footerbar"
import { DotPattern } from "./ui/dot-pattern"

const Desktop = () => {
  return (
    <div className="w-screen h-screen">
        <Nav />
        <DotPattern />
        <Footerbar />
    </div>
  )
}

export default Desktop