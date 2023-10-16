//MUI imports
import {Adjust as AdjustIcon} from '@mui/icons-material/';


export default function Pointer({isPointing, displayX, displayY, size = 25 }) {
    return (
        <AdjustIcon sx={
            {
                position: "absolute",
                top: displayY,
                left: displayX,
                fontSize: size,
                transform: "translate(-50%, -50%)",
                color : isPointing ? "red" : "grey"
            }}
            onContextMenu={(e) => { e.preventDefault(); }} />

    )
}