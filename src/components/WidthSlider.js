import React, { useContext, useEffect, useState } from "react";
import { Box, Input, colors } from '@mui/material'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid';
import { AppContext } from '../Providers';

export default function WidthSlider() {
    const { brushSize, setBrushSize } = useContext(AppContext)

    const handleSliderChange = (event, newValue) => {
        setBrushSize(newValue)
    };

    return (
        <Box className="slider--box" sx={{width: 250}}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider 
                        sx={{color: "#FB773C"}}
                        value={brushSize}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        step={5}
                        min={5}
                        max={100}
                        
                        className="slider" 
                        aria-label="width" 
                        valueLabelDisplay="off"
                    />
                    
                </Grid>

                <Grid item>
                    <Input
                        sx={{color: "#ECEEF9"}}
                        
                        disableUnderline={true}
                        className="slider--input"
                        variant="Outlined"
                        value={brushSize}
                        size="medium"
                        // onChange={handleSliderChange}
                        readOnly={true}
                        inputProps={{
                            step: 5,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>

            </Grid>

        </Box>
    );
}


