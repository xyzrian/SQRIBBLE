import WidthSlider from "./WidthSlider"
import ColorSelector from "./ColorSelector"
import Undo from "./Undo"
import Clear from "./Clear"

export default function Navbar() {
  return (
    <nav className="nav">
      <h1 className="nav--title">SQRIBBLE</h1>
      <div className="nav--controls">
        <ColorSelector />
        <div className="nav--tools">
          <Undo />
          <Clear />
          <WidthSlider />
        </div>
      </div>
    </nav>
  )
}