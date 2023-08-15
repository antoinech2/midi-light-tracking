// React imports
import { useRef, useState } from 'react';

// MUI imports
import {Box} from '@mui/material/';

// Project imports
import ApiService from '../services/api';
import Fixture from './Fixture';

const ROOM = await ApiService.getRoom()
const LENGTH = window.innerHeight - 100
const WIDTH = LENGTH / ROOM.length * ROOM.width

function getRoomCoords(coords){
  return {
    x : Math.round(coords.x / WIDTH * ROOM.width + ROOM.left),
    y : Math.round(coords.y / LENGTH * ROOM.length  + ROOM.top), 
  }
}

function getCanvasCoords(coords){
  return {
    x : Math.round((coords.x - ROOM.left) / ROOM.width * WIDTH ),
    y : Math.round((coords.y - ROOM.top) / ROOM.length * LENGTH ), 
  }  
}

export default function Canvas({fixtures, coords, setCoords, setHoverCoords, selectFixture, selectedFixture}) {
  const refCanvas = useRef()
  
  const [isClicked, setClicked] = useState(false)

  function getInCanvasPosition(e){
    return {x : e.clientX - refCanvas.current.offsetLeft,
     y : e.clientY - refCanvas.current.offsetTop}
  }

  function handleMouseChangeState(e){
    if (e.button === 0){
      if (e.type === "mousedown") {
        setClicked(true)
      } else {
          setClicked(false)
      }  
    }
  }

  function handleMouseMove(e){
    setHoverCoords(getRoomCoords(getInCanvasPosition(e)))
    if (isClicked){
      handleClick(e)
    }
  }

  function handleClick(e){
    let currentCoords = {...coords, ...getRoomCoords(getInCanvasPosition(e))}
    setCoords(currentCoords)
    //ApiService.setTracking(currentCoords, selectedFixture)
  }

  return (
    <Box ref = {refCanvas}
      onClick = {handleClick}
      onMouseDown={ handleMouseChangeState }
      onMouseUp={ handleMouseChangeState }
      onMouseMove = {handleMouseMove}
      sx={{
        position : "relative",
        margin: "1cm",
        width: `${WIDTH}px`,
        height: `${LENGTH}px`,
        border: "2px solid black",
        overflow: "hidden"
      }}>
        {fixtures.map((fixture, index) => (
          <Fixture select={selectFixture} id={index} key={index} fixture={fixture} displayX={getCanvasCoords({x : fixture.x}).x} displayY={getCanvasCoords({y : fixture.y}).y}/>
        ))}
    </Box>
  );
}