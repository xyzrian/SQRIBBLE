import React, { useEffect, useState, useRef, useContext } from "react";
import { AppContext } from '../Providers';
import "../index.css"


const Canvas = () => {

    const { brushSize, primColor, secColor } = useContext(AppContext);
    const brushSizeRef = useRef(brushSize);

    useEffect(() => {
      brushSizeRef.current = brushSize;
    }, [brushSize]);

    const createPattern = (primaryColor, secondaryColor, orientation = "vertical") => {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = 64;
      patternCanvas.height = 64;
      const ctx = patternCanvas.getContext("2d");
  
      if (orientation === "vertical") {
        ctx.fillStyle = primaryColor;
        ctx.fillRect(0, 0, 64, 32);
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(0, 32, 64, 32);
      } else {
        ctx.fillStyle = primaryColor;
        ctx.fillRect(0, 0, 32, 64);
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(32, 0, 32, 64);
      }
  
      return ctx.createPattern(patternCanvas, 'repeat');
    };

    useEffect(() => {
      let isShifting = false;
      let isDragging = false;

      const canvasElement = document.getElementById("scratch");
      const canvasContext = canvasElement.getContext("2d");
      canvasContext.canvas.width = window.innerWidth;
      canvasContext.canvas.height = window.innerHeight;

      const backgroundElement = document.getElementById("base");
      const backgroundContext = backgroundElement.getContext("2d");
      backgroundContext.canvas.width = window.innerWidth;
      backgroundContext.canvas.height = window.innerHeight;

      const initializeCanvas = () => {
        const pat = createPattern(primColor, secColor, "vertical");
        canvasContext.fillStyle = pat;
        canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);  
      };

      const initializeBackground = () => {
        const pat = createPattern(primColor, secColor, "horizontal");
        backgroundContext.fillStyle = pat;
        backgroundContext.fillRect(0, 0, backgroundContext.canvas.width, backgroundContext.canvas.height);
      };

      const scratch = (x, y) => {
          canvasContext.globalCompositeOperation = "destination-out";
          canvasContext.beginPath();
          canvasContext.arc(x, y, brushSizeRef.current, 0, 2 * Math.PI); // x, y, radius of circle, keep 0, keep the same
          canvasContext.fill();
      };

      // const drawLine = (x, y) => {
      //     canvasContext.globalCompositeOperation = "destination-out";
      //     canvasContext.beginPath();
      //     // canvasContext.arc(x, y, 15, 0, 2 * Math.PI);
      //     canvasContext.moveTo(x, y)
      //     canvasContext.lineTo(x, y)
      //     // canvasContext.lineWidth = 15;
      //     canvasContext.stroke();
      // }

      const getMouseCoordinates = (event) => {
          const rect = canvasElement.getBoundingClientRect();
          const x = (event.pageX || event.touches[0].pageX) - rect.left;
          const y = (event.pageY || event.touches[0].pageY) - rect.top;
          console.log(x, y)
          return { x, y };
      };

      const handleMouseDown = (event) => {
          isDragging = true; 
          if(typeof event !== "undefined") {
            const { x, y } = getMouseCoordinates(event);
            scratch(x, y);
          }
      };

      const handleMouseMove = (event) => {
          if (isDragging) {
              event.preventDefault();
              if(typeof event !== "undefined") {
                const { x, y } = getMouseCoordinates(event);
                scratch(x, y);
              }
          }
      };

      const handleMouseUp = (event) => {
          isDragging = false;
      };

      const handleMouseLeave = () => {
          isDragging = false; // need to change so that it stays pressed down if still pressing
          // but dont scratch upon return if mouse button isn't down...
      };


      // shift key not currently used...
      const handleKeyDown = (event) => {
        if (event.keyCode === 16 || event.charCode === 16) {
          isShifting = true;
          console.log('shifting')
        }
      }

      const handleKeyUp = (event) => {
        if (event.keyCode === 16 || event.charCode === 16) {
          isShifting = false;
          console.log('not shifting')
        }
      }

      const isTouchDevice = 'ontouchstart' in window;

      canvasElement.addEventListener(isTouchDevice ? "touchstart" : "mousedown", handleMouseDown);
      canvasElement.addEventListener(isTouchDevice ? "touchmove" : "mousemove", handleMouseMove);
      canvasElement.addEventListener(isTouchDevice ? "touchend" : "mouseup", handleMouseUp);
      canvasElement.addEventListener("mouseleave", handleMouseLeave);

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);


      initializeBackground();
      initializeCanvas();

      return () => {
          canvasElement.removeEventListener(isTouchDevice ? "touchstart" : "mousedown", handleMouseDown);
          canvasElement.removeEventListener(isTouchDevice ? "touchmove" : "mousemove", handleMouseMove);
          canvasElement.removeEventListener(isTouchDevice ? "touchend" : "mouseup", handleMouseUp);
          canvasElement.removeEventListener("keydown", handleKeyDown);
          canvasElement.removeEventListener("mouseleave", handleMouseLeave);
      };
  }, []);

    useEffect(() => {
      const backgroundElement = document.getElementById("base");
      const backgroundContext = backgroundElement.getContext("2d");
      const backgroundPattern = createPattern(primColor, secColor, "horizontal");
      backgroundContext.fillStyle = backgroundPattern;
      backgroundContext.fillRect(0, 0, backgroundContext.canvas.width, backgroundContext.canvas.height);
    
      const canvasElement = document.getElementById("scratch");
      const canvasContext = canvasElement.getContext("2d");

      // Preserve drawing 
      const imageData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
      const alphaMask = new Uint8ClampedArray(imageData.data); 
      // console.log(alphaMask);  
    
      const scratchPattern = createPattern(primColor, secColor, "vertical");
      canvasContext.globalCompositeOperation = "source-over";
      canvasContext.fillStyle = scratchPattern;
      canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    
      const newImageData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
      for (let i = 3; i < newImageData.data.length; i += 4) {
        newImageData.data[i] = alphaMask[i]; // Set alpha from old
      }
      canvasContext.putImageData(newImageData, 0, 0);
    }, [primColor, secColor]);

    return (
        <div className="container">
            <canvas 
              id="base"
              width={ window.innerWidth}
              height={ window.innerHeight}
            ></canvas>

            <canvas
                id="scratch"
                width={ window.innerWidth}
                height={ window.innerHeight}
                style={{cursor: 'auto'}}
            ></canvas>
        </div>
    );
};

export default Canvas;