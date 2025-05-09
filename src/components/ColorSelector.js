import React, { useContext, useState } from 'react';
import { CirclePicker } from 'react-color';
import { AppContext } from '../Providers';

const ColorSelector = ({ button }) => {
  const { primColor, secColor, setPrimColor, setSecColor } = useContext(AppContext);

  const color = button === 'button1' ? primColor : secColor;
  const setColor = button === 'button1' ? setPrimColor : setSecColor;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(prev => !prev);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor) => {
    setColor(newColor.hex);
    setDisplayColorPicker(false);
  };

  const handleHover = (color, event) => {
    // not used atm
    console.log('Hover color:', color.hex);
  };

  const styles = {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      margin: '20px 0',
    },
    button: {
      backgroundColor: color,
      height: '25px',
      width: '25px',
      margin: '0 15px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    picker: {
      marginLeft: '10px',
    }
  };

  return (
    <div style={styles.wrapper}>
      <button
        type="button"
        className="color--button"
        style={styles.button}
        onClick={handleClick}
      />
      {displayColorPicker && (
        <div style={styles.picker}>
          <div style={styles.cover} onClick={handleClose} />
          <CirclePicker
            color={color}
            onChangeComplete={handleChange}
            onSwatchHover={handleHover}
            circleSize={20}
            circleSpacing={12}
            width="220px"
            colors={[
                '#4F1787', '#EB3678', '#FB773C', '#000000', '#FFFFFF', '#3952d4',
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default ColorSelector;