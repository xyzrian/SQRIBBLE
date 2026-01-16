"use client"

import { useContext, useState, useRef, useEffect } from "react"
import { HuePicker } from "react-color"
import { AppContext } from "../Providers"

const ColorSelector = () => {
  const { primColor, secColor, setPrimColor, setSecColor } = useContext(AppContext)

  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [activeColorTarget, setActiveColorTarget] = useState(null) // 'prim' or 'sec'
  const pickerRef = useRef(null)

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        !event.target.classList.contains("color-button-prim") &&
        !event.target.classList.contains("color-button-sec")
      ) {
        setDisplayColorPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleButtonClick = (target) => {
    if (activeColorTarget === target && displayColorPicker) {
      setDisplayColorPicker(false)
    } else {
      setActiveColorTarget(target)
      setDisplayColorPicker(true)
    }
  }

  const handleColorChange = (color) => {
    if (activeColorTarget === "prim") {
      setPrimColor(color.hex)
    } else if (activeColorTarget === "sec") {
      setSecColor(color.hex)
    }
  }

  return (
    <div className="color-selector">
      <div className="color-buttons">
        <button
          className="color-button color-button-prim"
          onClick={() => handleButtonClick("prim")}
          style={{ backgroundColor: primColor }}
          title="Primary Color"
          aria-label="Select primary color"
        >
          {/* <span className="color-label">P</span> */}
        </button>
        <button
          className="color-button color-button-sec"
          onClick={() => handleButtonClick("sec")}
          style={{ backgroundColor: secColor }}
          title="Secondary Color"
          aria-label="Select secondary color"
        >
          {/* <span className="color-label">S</span> */}
        </button>
      </div>

      {displayColorPicker && (
        <div className="color-picker-popover" ref={pickerRef}>
          <div className="color-picker-header">
            {activeColorTarget === "prim" ? "Primary Color" : "Secondary Color"}

          </div>
          <HuePicker
            color={activeColorTarget === "prim" ? primColor : secColor}
            onChange={handleColorChange}
            disableAlpha={true}
          />
          <div className="color-picker-footer">
            {/* <div className="color-preview">
              <div className="color-preview-prim" style={{ backgroundColor: primColor }}></div>
              <div className="color-preview-sec" style={{ backgroundColor: secColor }}></div>
            </div> */}
            {/* <button className="color-picker-close" onClick={() => setDisplayColorPicker(false)}>
              X
            </button> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorSelector
