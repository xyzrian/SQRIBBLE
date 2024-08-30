import React from 'react';
import { CirclePicker } from 'react-color';

class ColorSelector extends React.Component {
    // console.log(props.color)

    state = {
        background: this.props.color,
        displayColorPicker: false,
        button: this.props.id
    }



    handleChange = (color, event) => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleClick = () => {
        console.log("click")
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex })
    }

    handleHover = () => {

    }

    render() {
        return(
            <>
                <button type="button" 
                    class="color--button"
                    style={{
                            backgroundColor: this.state.background,
                            height: "25px",
                            width: "25px",
                            alignSelf: "center",
                            margin: "20px 15px",
                        }} 
                    onClick={this.handleClick} onMouseOver={this.handleHover}></button>
   
                { this.state.displayColorPicker && <CirclePicker 
                    className="colorPicker"
                    color={ this.state.background }
                    colors={['rgb(79, 23, 135)', 'rgb(235, 54, 120)', 'rgb(251, 119, 60)', 'rgb(255,255,255)']}
                    circleSize={25}
                    // onChange={ this.handleChange } 
                    onChangeComplete={ this.handleChangeComplete }
                />}
            </>
        )
    }
}

export default ColorSelector;