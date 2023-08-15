//MUI imports
import {Stars as StarsIcon, AddCircleOutline as AddCircleOutlineIcon} from '@mui/icons-material/';
import Tooltip from '@mui/material/Tooltip';


export default function Fixture({ id, select, fixture, displayX, displayY, size = 25 }) {
    const tooltipText = `Name : ${fixture.name}
                        X : ${fixture.x}
                        Y : ${fixture.y}
                        Z : ${fixture.z}
                        Pan offset : ${fixture.pan}
                        Tilt offset : ${fixture.tilt}`

    return (
        <Tooltip
            title=<div style={{ whiteSpace: 'pre-line' }}>{tooltipText}</div>
            placement="right"
            enterDelay={800}
            arrow>
            {fixture.isNew ?
                <AddCircleOutlineIcon sx={
                    {
                        position: "absolute",
                        top: displayY,
                        left: displayX,
                        fontSize: size,
                        transform: "translate(-50%, -50%)"
                    }}
                    onContextMenu={(e) => { e.preventDefault(); select({ ...fixture, id }) }} />
                :
                <StarsIcon sx={
                    {
                        position: "absolute",
                        top: displayY,
                        left: displayX,
                        fontSize: size,
                        transform: "translate(-50%, -50%)"
                    }}
                    onContextMenu={(e) => { e.preventDefault(); select({ ...fixture, id }) }} />

            }
        </Tooltip>
    )
}