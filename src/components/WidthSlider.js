import React, { useContext, useEffect, useState } from "react";
import { Box, Input, colors } from '@mui/material'
import Slider from '@mui/material/Slider'
// import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { AppContext } from '../Providers';

export default function WidthSlider({ value, onChange }) {
    const state = useContext(AppContext);
    // const [value, setValue] = useState(25);
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
                        value={value}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        step={5}
                        min={5}
                        max={100}
                        
                        className="slider" 
                        aria-label="width" 
                        valueLabelDisplay="off"
                        // valueLabelDisplay="auto"
                    />
                    
                </Grid>

                <Grid item>
                    <Input
                        sx={{color: "#ECEEF9"}}
                        
                        disableUnderline={true}
                        className="slider--input"
                        variant="Outlined"
                        value={value}
                        size="medium"
                        onChange={handleSliderChange}
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
        // <div className="slider">
        //     <Box sx={{ width: 250 }}>
        //         <Slider
        //             value={brushSize}
        //             onChange={handleSliderChange}
        //             min={1}
        //             max={100}
        //             step={1}
        //             valueLabelDisplay="auto"
        //             sx={{ color: "#FB773C" }}
        //         />
        //     </Box>
        // </div>
    );
}

// const Input = styled(MuiInput)`
//     width: 42px;
//     `;

// export default function WidthSlider() {
//     const [value, setValue] = useState(25);
//     console.log(value)

//     const handleSliderChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     const handleInputChange = (event) => {
//         setValue(event.target.value === '' ? 0 : Number(event.target.value));
//     };

//     return (
//         <Box className="slider--box" sx={{width: 250}}>
//             <Grid container spacing={2} alignItems="center">
//                 <Grid item xs>
//                     <Slider 
//                         sx={{color: "#FB773C"}}
//                         value={typeof value === 'number' ? value : 0}
//                         onChange={handleSliderChange}
//                         aria-labelledby="input-slider"
                        
//                         className="slider" 
//                         defaultValue="{25}" 
//                         aria-label="width" 
//                         valueLabelDisplay="off"
//                     />
                    
//                 </Grid>

//                 <Grid item>
//                     <Input
//                         sx={{color: "#ECEEF9"}}
                        
//                         disableUnderline={true}
//                         className="slider--input"
//                         variant="Outlined"
//                         value={value}
//                         size="medium"
//                         onChange={handleInputChange}
//                         inputProps={{
//                             step: 1,
//                             min: 0,
//                             max: 100,
//                             type: 'number',
//                             'aria-labelledby': 'input-slider',
//                         }}
//                     />
//                 </Grid>

//             </Grid>

//         </Box>
//     )
// }

