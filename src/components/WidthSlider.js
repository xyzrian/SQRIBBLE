import React, { useContext } from "react";
import { Box, Slider } from '@mui/material';
import { AppContext } from '../Providers';

export default function WidthSlider() {
    const { brushSize, setBrushSize } = useContext(AppContext);

    const handleSliderChange = (event, newValue) => {
        setBrushSize(newValue);
    };

    return (
        <Box 
            className="slider--box" 
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '0 16px'
            }}
        >
            <Slider 
                sx={{
                    color: "#FB773C",
                    height: 4,
                    '& .MuiSlider-thumb': {
                        width: 16,
                        height: 16,
                        '&:hover': {
                            boxShadow: '0 0 0 6px rgba(251, 119, 60, 0.16)',
                        },
                    },
                    '& .MuiSlider-track': {
                        border: 'none',
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.3,
                    },
                }}
                value={brushSize}
                onChange={handleSliderChange}
                aria-label="Brush size"
                step={1}
                min={1}
                max={50}
                valueLabelDisplay="off"
            />
            
            <div
                style={{
                    width: '45px',
                    color: '#ECEEF9',
                    fontWeight: 600,
                    fontSize: '14px',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(251, 119, 60, 0.3)',
                }}
            >
                {brushSize}
            </div>
        </Box>
    );
}