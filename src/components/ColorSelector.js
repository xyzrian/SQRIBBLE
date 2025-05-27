import React, { useContext, useState } from 'react';
import { CirclePicker } from 'react-color';
import { AppContext } from '../Providers';

const ColorSelector = () => {
  const { primColor, secColor, setPrimColor, setSecColor } = useContext(AppContext);

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [activeColorTarget, setActiveColorTarget] = useState(null); // 'prim' or 'sec'

  const handleButtonClick = (target) => {
    setActiveColorTarget(target);
    setDisplayColorPicker(true);
  };

  const handleColorChange = (color) => {
    if (activeColorTarget === 'prim') {
      setPrimColor(color.hex);
    } else if (activeColorTarget === 'sec') {
      setSecColor(color.hex);
    }
    setDisplayColorPicker(false); // close after selecting
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      position: 'relative',
    },
    colorButton: (bgColor) => ({
      backgroundColor: bgColor,
      height: '25px',
      width: '25px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
    }),
    pickerWrapper: {
      marginLeft: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.colorButton(primColor)}
        onClick={() => handleButtonClick('prim')}
        title="Primary Color"
      />
      <button
        style={styles.colorButton(secColor)}
        onClick={() => handleButtonClick('sec')}
        title="Secondary Color"
      />

      {displayColorPicker && (
        <div style={styles.pickerWrapper}>
          <CirclePicker
            color={activeColorTarget === 'prim' ? primColor : secColor}
            onChangeComplete={handleColorChange}
            circleSize={20}
            circleSpacing={12}
            width="220px"
            colors={[
              '#f44336', '#e91e63', '#9c27b0', '#673ab7',
              '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
              '#009688', '#4caf50', '#8bc34a', '#cddc39',
              '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
              '#795548', '#607d8b', '#ffffff', '#000000'
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default ColorSelector;
