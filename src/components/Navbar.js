import React from 'react'
import WidthSlider from './WidthSlider'
import ColorButton from './ColorButton'

export default function Navbar() {
    // let primary = "rgba(57, 82, 212, 1)";
    // let secondary = "rgba(236, 238, 249, 1)";

    return (
        <nav className="nav">
            <h1 className="nav--title">SQRIBBLE</h1>
            <ColorButton color="primary"/>
            <ColorButton color="secondary"/>
            <WidthSlider />
        </nav>
    )
}