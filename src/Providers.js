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

      // Remove the current state and get the previous state
      const newHistory = prevHistory.slice(0, -1);
      const prevState = newHistory[newHistory.length - 1];

      const canvasElement = document.getElementById("scratch");
      if (canvasElement && prevState) {
        const ctx = canvasElement.getContext("2d");
        
        // First, redraw the base pattern with CURRENT colors
        const createPattern = (primaryColor, secondaryColor, orientation = "vertical") => {
          const patternCanvas = document.createElement("canvas");
          patternCanvas.width = 64;
          patternCanvas.height = 64;
          const patternCtx = patternCanvas.getContext("2d");
      
          if (orientation === "vertical") {
            patternCtx.fillStyle = primaryColor;
            patternCtx.fillRect(0, 0, 32, 32);
            patternCtx.fillRect(32, 32, 32, 32);
            patternCtx.fillStyle = secondaryColor;
            patternCtx.fillRect(32, 0, 32, 32);
            patternCtx.fillRect(0, 32, 32, 32);
          } else {
            patternCtx.fillStyle = secondaryColor;
            patternCtx.fillRect(0, 0, 32, 32);
            patternCtx.fillRect(32, 32, 32, 32);
            patternCtx.fillStyle = primaryColor;
            patternCtx.fillRect(32, 0, 32, 32);
            patternCtx.fillRect(0, 32, 32, 32);
          }
      
          return patternCtx.createPattern(patternCanvas, 'repeat');
        };

        // Clear and redraw with current colors
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const scratchPattern = createPattern(primColor, secColor, "vertical");
        ctx.fillStyle = scratchPattern;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Now apply only the transparent parts (brush strokes) from previous state
        // Extract alpha channel from prevState and apply it to current canvas
        const currentImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        for (let i = 0; i < prevState.data.length; i += 4) {
          // Copy the alpha channel from previous state
          currentImageData.data[i + 3] = prevState.data[i + 3];
        }
        
        ctx.putImageData(currentImageData, 0, 0);
      }

      return newHistory;
    });
  }, [primColor, secColor]);

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
}