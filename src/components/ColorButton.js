import React from "react";

export default function ColorButton(props) {
    console.log(props.color)
    // let primary = "rgba(57, 82, 212, 1)";
    // let secondary = "rgba(236, 238, 249, 1)";

    // let color;

    // if (props.color == "primary") {
    //     color = "#3952D4"
    // } else {
    //     color = "#ECEEF9"
    // }
    return (
        <div>
            <button type="button" className={`color--button ${props.color}`}></button>
        </div>
    )
}