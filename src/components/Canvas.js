import React, { useEffect, useState } from "react";
import "../index.css"

var TopCanvas = '/images/CanvasSquare1.png'
var BottomCanvas = '/images/CanvasSquare2.png'

const Canvas = () => {
    useEffect(() => {
        let isShifting = false;
        let isDragging = false;
        let fromX;
        let fromY;

        const canvasElement = document.getElementById("scratch");
        const canvasContext = canvasElement.getContext("2d");
        canvasContext.canvas.width = window.innerWidth;
        canvasContext.canvas.height = window.innerHeight;

        const backgroundElement = document.getElementById("base");
        const backgroundContext = backgroundElement.getContext("2d");
        backgroundContext.canvas.width = window.innerWidth;
        backgroundContext.canvas.height = window.innerHeight;

        const initializeCanvas = () => {
          const img = new Image()
          img.src = TopCanvas;
          img.onload = () => {
            const pat = canvasContext.createPattern(img, 'repeat')
            canvasContext.fillStyle = pat;
            canvasContext.fill();
            canvasContext.rect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height)
            canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height)
          };
      };

        const initializeBackground = () => {
            const img = new Image()
            img.src = BottomCanvas;
            img.onload = () => {
              const pat = backgroundContext.createPattern(img, 'repeat')
              backgroundContext.fillStyle = pat;
              backgroundContext.fill();
              backgroundContext.rect(0, 0, backgroundContext.canvas.width, backgroundContext.canvas.height)
              backgroundContext.fillRect(0, 0, backgroundContext.canvas.width, backgroundContext.canvas.height)
            };
        };

        const scratch = (x, y) => {
            canvasContext.globalCompositeOperation = "destination-out";
            canvasContext.beginPath();
            canvasContext.arc(x, y, 15, 0, 2 * Math.PI); // x, y, radius of circle, keep 0, keep the same
            canvasContext.fill();
        };

        const drawLine = (x, y) => {
            canvasContext.globalCompositeOperation = "destination-out";
            canvasContext.beginPath();
            // canvasContext.arc(x, y, 15, 0, 2 * Math.PI);
            canvasContext.moveTo(x, y)
            canvasContext.lineTo(x, y)
            canvasContext.lineWidth = 15;
            canvasContext.stroke();
        }

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

            //WIP
            // if(isShifting) {
            //   drawLine(x, y)
            // }
            
            // if(isShifting) {
            //   straightLine(x, y)
            // }
            // else {
              // scratch(x, y);
            // }
        };

        const handleMouseMove = (event) => {
            if (isDragging) {
                event.preventDefault();
                if(typeof event !== "undefined") {
                  const { x, y } = getMouseCoordinates(event);
                  scratch(x, y);
                }
                // if(isShifting) {
                //   drawLine(x, y)
                // }
            }
        };

        const handleMouseUp = (event) => {
            isDragging = false;
            // if(isShifting) {
            //     event.preventDefault();
            //     const { x, y } = getMouseCoordinates(event);
            //     straightLine(x, y)
            // }
        };

        const handleMouseLeave = () => {
            isDragging = false;
        };

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
                
                style={{
                    cursor: 'auto'
                }}
            ></canvas>
        </div>
    );
};

export default Canvas;