import { createContext, useState } from "react"

export const AppContext = createContext();

export const Providers = ({children}) => {

    const [primColor, setPrimColor] = useState("#3952d4"); //blue
    const [secColor, setSecColor] = useState("#ffffff"); //white
    const [brushSize, setBrushSize] = useState(20);

    return (
        <AppContext.Provider value={{
            primColor,
            setPrimColor,
            secColor,
            setSecColor,
            brushSize,
            setBrushSize }}>
            {children}
        </AppContext.Provider>
    )
} 