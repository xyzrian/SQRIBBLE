import React, { useContext, useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { AppContext } from '../Providers';

const ColorSelector = ({button}) => {

    const state = useContext(AppContext);

    const [color, setter] = button === "button1" ? 
    [state.primColor, state.setPrimColor] : button == "button2" ? 
    [state.secColor, state.setSecColor] : []

    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleChange = (color, event) => {
        setDisplayColorPicker(cur => !cur)
    }

    const handleClick = () => {
        console.log("click")
        setDisplayColorPicker(cur => !cur)
    }

    const handleChangeComplete = (color) => {
        setter(color.hex)
    }

    const handleHover = () => {

    }

    useEffect(() => {
        console.log(button)
    })

    return (
        <>
            <button type="button" 
                class="color--button"
                style={{
                        backgroundColor: color,
                        height: "25px",
                        width: "25px",
                        alignSelf: "center",
                        margin: "20px 15px",
                    }} 
                onClick={handleClick} onMouseOver={handleHover}></button>

            { displayColorPicker && <CirclePicker 
                className="colorPicker"
                color={ state.background }
                colors={['rgb(79, 23, 135)', 'rgb(235, 54, 120)', 'rgb(251, 119, 60)', 'rgb(255,255,255)']}
                circleSize={25}
                // onChange={ this.handleChange } 
                onChangeComplete={ handleChangeComplete }
            />}
        </>
    )

}


export default ColorSelector;