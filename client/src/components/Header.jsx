// MUI imports
import {Paper, Button} from '@mui/material/';

// Project imports
import ApiService from './../services/api';

export default function Header({coords, hoverCoords, add, addAvailability, setPointing, isPointing}){

    const coordsText = `Selected : ${coords.x} ; ${coords.y}; ${coords.z}`
    const hoverCoordsText = `Hovering : ${hoverCoords.x} ; ${hoverCoords.y}`

    const handleActivationChange = () => {
        if (isPointing){
            ApiService.unselect()
        }
        setPointing(!isPointing)
    }

    return (
        <Paper elevation={10}> 
            <Button variant={isPointing ? "contained" : "outlined"} onClick={handleActivationChange} color="success">{isPointing ? "Desactivate" : "Activate"}</Button>
            <Button variant="contained" onClick={add} disabled={addAvailability}>Add</Button>
            <Button variant="text">{coordsText}</Button>
            <Button variant="text">{hoverCoordsText}</Button>
        </Paper>
    )
}