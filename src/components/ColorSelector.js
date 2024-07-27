import React from 'react';
import { SketchPicker } from 'react-color';

export default function ColorSelector() {
    return(
        <>
            <button type="button" className={`color--button ${props.color}`}></button>
            <SketchPicker />  
        </>
    )
}