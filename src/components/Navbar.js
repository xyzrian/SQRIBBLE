import WidthSlider from "./WidthSlider"
import ColorSelector from "./ColorSelector"
import Undo from "./Undo"

export default function Navbar() {
  return (
    <nav className="nav">
      <h1 className="nav--title">SQRIBBLE</h1>
      <div className="nav--controls">
        <ColorSelector />
        <div className="nav--tools">
          <Undo />
          <WidthSlider />
        </div>
      </div>
    </nav>
  )
}
