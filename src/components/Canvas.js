import React, { useEffect, useRef, useContext } from "react";
import { AppContext } from '../Providers';
import "../index.css"


const Canvas = () => {
    const { brushSize, primColor, secColor, saveCanvasState } = useContext(AppContext);
    const brushSizeRef = useRef(brushSize);

    useEffect(() => {
      brushSizeRef.current = brushSize;
    }, [brushSize]);

    const createPattern = (primaryColor, secondaryColor, orientation = "vertical") => {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = 64;
      patternCanvas.height = 64;
      const ctx = patternCanvas.getContext("2d");
  
      // Create checkerboard pattern
      // orientation determines which color goes in top-left
      if (orientation === "vertical") {
        // Top-left and bottom-right: primary
        ctx.fillStyle = primaryColor;
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillRect(32, 32, 32, 32);
        // Top-right and bottom-left: secondary
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(32, 0, 32, 32);
        ctx.fillRect(0, 32, 32, 32);
      } else {
        // Inverse pattern for horizontal
        // Top-left and bottom-right: secondary
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillRect(32, 32, 32, 32);
        // Top-right and bottom-left: primary
        ctx.fillStyle = primaryColor;
        ctx.fillRect(32, 0, 32, 32);
        ctx.fillRect(0, 32, 32, 32);
      }
  
      return ctx.createPattern(patternCanvas, 'repeat');
    };




    useEffect(() => {
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
          canvasContext.arc(x, y, brushSizeRef.current, 0, 2 * Math.PI);
          canvasContext.fill();
      };

      const getMouseCoordinates = (event) => {
          const rect = canvasElement.getBoundingClientRect();
          const x = (event.pageX || event.touches[0].pageX) - rect.left;
          const y = (event.pageY || event.touches[0].pageY) - rect.top;
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

          // Save snapshot of the whole canvas
          const imageData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
          saveCanvasState(imageData);
      };

      const handleMouseLeave = () => {
          isDragging = false;
      };

      const isTouchDevice = 'ontouchstart' in window;

      canvasElement.addEventListener(isTouchDevice ? "touchstart" : "mousedown", handleMouseDown);
      canvasElement.addEventListener(isTouchDevice ? "touchmove" : "mousemove", handleMouseMove);
      canvasElement.addEventListener(isTouchDevice ? "touchend" : "mouseup", handleMouseUp);
      canvasElement.addEventListener("mouseleave", handleMouseLeave);

      initializeBackground();
      initializeCanvas();

      const imageData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
      saveCanvasState(imageData);

      return () => {
          canvasElement.removeEventListener(isTouchDevice ? "touchstart" : "mousedown", handleMouseDown);
          canvasElement.removeEventListener(isTouchDevice ? "touchmove" : "mousemove", handleMouseMove);
          canvasElement.removeEventListener(isTouchDevice ? "touchend" : "mouseup", handleMouseUp);
          canvasElement.removeEventListener("mouseleave", handleMouseLeave);
      };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    
      const scratchPattern = createPattern(primColor, secColor, "vertical");
      canvasContext.globalCompositeOperation = "source-over";
      canvasContext.fillStyle = scratchPattern;
      canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    
      const newImageData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
      for (let i = 3; i < newImageData.data.length; i += 4) {
        newImageData.data[i] = alphaMask[i];
      }
      canvasContext.putImageData(newImageData, 0, 0);
    }, [primColor, secColor]);

    return (
        <div className="container">
            <canvas 
              id="base"
              width={window.innerWidth}
              height={window.innerHeight}
            ></canvas>

            <canvas
                id="scratch"
                width={window.innerWidth}
                height={window.innerHeight}
                style={{cursor: 'auto'}}
            ></canvas>
        </div>
    );
};

export default Canvas;