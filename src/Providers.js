import { createContext, useState } from "react"

export const AppContext = createContext();

export const Providers = ({children}) => {

    const [primColor, setPrimColor] = useState("rgba(57, 82, 212, 1)");
    const [secColor, setSecColor] = useState("rgba(236, 238, 249, 1)");
    const [brushSize, setBrushSize] = useState(15);

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