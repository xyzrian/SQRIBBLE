import { useContext } from "react"
import { AppContext } from "../Providers"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import IconButton from "@mui/material/IconButton"

const Clear = () => {
  const { handleClear } = useContext(AppContext)

  return (
    <IconButton
      onClick={handleClear}
      sx={{
        color: "#FFFFFF",
        marginLeft: "15px",
        marginRight: "15px",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
      }}
      title="Clear Canvas"
      aria-label="Clear canvas"
    >
      <DeleteOutlineIcon />
    </IconButton>
  )
}

export default Clear