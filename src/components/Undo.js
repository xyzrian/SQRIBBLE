import { useContext } from "react"
import { AppContext } from "../Providers"
import UndoIcon from "@mui/icons-material/Undo"
import IconButton from "@mui/material/IconButton"

const Undo = () => {
  const { canUndo, handleUndo } = useContext(AppContext)

  return (
    <IconButton
      onClick={handleUndo}
      disabled={!canUndo}
      sx={{
        color: canUndo ? "#FFFFFF" : "#666666",
        marginLeft: "15px",
        marginRight: "15px",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
      }}
      title="Undo"
      aria-label="Undo last action"
    >
      <UndoIcon />
    </IconButton>
  )
}

export default Undo
