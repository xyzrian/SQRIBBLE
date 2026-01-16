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

      // Remove the *current* state and compute the new "last" (previous) state
      const newHistory = prevHistory.slice(0, -1);
      const prevState = newHistory[newHistory.length - 1];

      const canvasElement = document.getElementById("scratch");
      if (canvasElement && prevState) {
        const ctx = canvasElement.getContext("2d");
        
        // Extract the alpha mask from the previous state
        const alphaMask = new Uint8ClampedArray(prevState.data);
        
        // Redraw the canvas with CURRENT colors
        const createPattern = (primaryColor, secondaryColor) => {
          const patternCanvas = document.createElement("canvas");
          patternCanvas.width = 64;
          patternCanvas.height = 64;
          const patternCtx = patternCanvas.getContext("2d");
          
          // Top-left and bottom-right: primary
          patternCtx.fillStyle = primaryColor;
          patternCtx.fillRect(0, 0, 32, 32);
          patternCtx.fillRect(32, 32, 32, 32);
          // Top-right and bottom-left: secondary
          patternCtx.fillStyle = secondaryColor;
          patternCtx.fillRect(32, 0, 32, 32);
          patternCtx.fillRect(0, 32, 32, 32);
          
          return patternCtx.createPattern(patternCanvas, 'repeat');
        };
        
        const scratchPattern = createPattern(primColor, secColor);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = scratchPattern;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Apply the old alpha mask to the new colored canvas
        const newImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i = 3; i < newImageData.data.length; i += 4) {
          newImageData.data[i] = alphaMask[i];
        }
        ctx.putImageData(newImageData, 0, 0);
      }

      return newHistory;
    });
  }, [primColor, secColor]);

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
        saveCanvasState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};