import React, { createContext, useContext } from 'react'
import WidthSlider from './WidthSlider'
import ColorSelector from './ColorSelector'
import { AppContext } from '../Providers';

export default function Navbar() {
    // const state = useContext(AppContext);
    const { brushSize, setBrushSize } = useContext(AppContext)

    return (
        <nav className="nav">
            <h1 className="nav--title">SQRIBBLE</h1>

            <ColorSelector button="button1"/>
            <ColorSelector button="button2"/>
            
            <WidthSlider />
        </nav>
    )
}