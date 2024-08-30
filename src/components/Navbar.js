import React, { createContext, useContext } from 'react'
import WidthSlider from './WidthSlider'
import ColorSelector from './ColorSelector'

export default function Navbar() {
    let primary = "rgba(57, 82, 212, 1)";
    let secondary = "rgba(236, 238, 249, 1)";

    return (
        <nav className="nav">
            <h1 className="nav--title">SQRIBBLE</h1>

            <ColorSelector key="button1" color={primary}/>
            <ColorSelector key="button2" color={secondary}/>

            <WidthSlider />
        </nav>
    )
}