// Providers.js
import { createContext, useState, useCallback, useEffect } from "react";

export const AppContext = createContext();

export const Providers = ({ children }) => {
  const [primColor, setPrimColor] = useState("#3952d4"); // blue
  const [secColor, setSecColor] = useState("#ffffff"); // white
  const [brushSize, setBrushSize] = useState(20);
  const [canvasHistory, setCanvasHistory] = useState([]); // array of ImageData
  const [canUndo, setCanUndo] = useState(false);

  // Keep canUndo in sync
  useEffect(() => {
    setCanUndo(canvasHistory.length > 1);
  }, [canvasHistory]);

  const saveCanvasState = useCallback((imageData) => {
    if (!imageData) return;
    // clone ImageData to avoid accidental mutation issues
    const copy = new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height
    );
    
    setCanvasHistory((prev) => [...prev, copy]);
  }, []);

  const handleUndo = useCallback(() => {
    setCanvasHistory((prevHistory) => {
      if (prevHistory.length === 0) return prevHistory;

      // Remove the current state and compute the previous state
      const newHistory = prevHistory.slice(0, -1);
      const prevState = newHistory[newHistory.length - 1];

      const canvasElement = document.getElementById("scratch");
      if (canvasElement) {
        const ctx = canvasElement.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (prevState) {
          ctx.putImageData(prevState, 0, 0);
        }
      }

      return newHistory;
    });
  }, []);

  const handleClear = useCallback(() => {
    const canvasElement = document.getElementById("scratch");
    if (!canvasElement) return;
    
    const canvasContext = canvasElement.getContext("2d");
    
    // Reset composite operation to source-over before clearing
    canvasContext.globalCompositeOperation = "source-over";
    
    // Clear the canvas completely (make it transparent)
    canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    
    // Redraw the pattern with CURRENT colors
    const createPattern = (primaryColor, secondaryColor, orientation = "vertical") => {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = 64;
      patternCanvas.height = 64;
      const ctx = patternCanvas.getContext("2d");
  
      if (orientation === "vertical") {
        ctx.fillStyle = primaryColor;
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillRect(32, 32, 32, 32);
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(32, 0, 32, 32);
        ctx.fillRect(0, 32, 32, 32);
      } else {
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillRect(32, 32, 32, 32);
        ctx.fillStyle = primaryColor;
        ctx.fillRect(32, 0, 32, 32);
        ctx.fillRect(0, 32, 32, 32);
      }
  
      return ctx.createPattern(patternCanvas, 'repeat');
    };

    const scratchPattern = createPattern(primColor, secColor, "vertical");
    canvasContext.fillStyle = scratchPattern;
    canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    
    // Also update the background canvas with current colors
    const backgroundElement = document.getElementById("base");
    if (backgroundElement) {
      const backgroundContext = backgroundElement.getContext("2d");
      const backgroundPattern = createPattern(primColor, secColor, "horizontal");
      backgroundContext.fillStyle = backgroundPattern;
      backgroundContext.fillRect(0, 0, backgroundContext.canvas.width, backgroundContext.canvas.height);
    }
    
    // Clear history and save only this new cleared state
    setCanvasHistory([]);
    const imageData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    saveCanvasState(imageData);
  }, [primColor, secColor, saveCanvasState]);

  return (
    <AppContext.Provider
      value={{
        primColor,
        setPrimColor,
        secColor,
        setSecColor,
        brushSize,
        setBrushSize,
        canUndo,
        handleUndo,
        handleClear,
        saveCanvasState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};