// React imports
import { useState, useEffect } from 'react';

// MUI imports
import Stack from '@mui/material/Stack';

// Project imports
import ApiService from './services/api';
import Canvas from './components/Canvas'
import Header from './components/Header';
import HeightSlider from './components/HeightSlider'
import FixtureCard from './components/FixtureCard';
import SideSelector from './components/SideSelector';


const defaultFixture = {
  name : "Fixture",
  x : 0,
  y : 0,
  z : 500,
  pan : 0,
  tilt : 0,
  midiChannels : 4,
  isNew : true
}

export default function App() {
  const [coords, setCoords] = useState({x : 0, y : 0, z : 0})
  const [isPointing, setPointing] = useState(false)
  const [hoverCoords, setHoverCoords] = useState({x : 0, y : 0})
  const [fixtures, setFixtures] = useState([{}])
  const [selectedFixture, setSelectedFixture] = useState()

  useEffect(() => {
    ApiService.getFixtures().then(liste => setFixtures(liste))
  }, []) 

  useEffect(() => {
    if (isPointing){
      if (selectedFixture){
        ApiService.setTracking(coords, selectedFixture.id, fixtures[selectedFixture.id])
      }
      else{
        ApiService.setTracking(coords)
      }
    }
  }, [coords, fixtures, selectedFixture, isPointing])

  function addFixture(){
    setFixtures(() => {
      fixtures.push(defaultFixture)
      setSelectedFixture({...fixtures[fixtures.length -1], id : fixtures.length -1})
      return fixtures
    })
  }

  return (
    <div>
      <Stack spacing={3}>
        <Header add={addFixture} addAvailability={fixtures[fixtures.length-1]?.isNew || (selectedFixture !== undefined)} coords={coords} hoverCoords={hoverCoords} setPointing={setPointing} isPointing={isPointing}/>
        <Stack direction="row" spacing={3}>
          <Canvas selectedFixture={selectedFixture} selectFixture={setSelectedFixture} fixtures={fixtures} setHoverCoords={setHoverCoords} coords={coords} setCoords={setCoords} isPointing={isPointing}/>
          <HeightSlider value={coords} setValue = {setCoords} isPointing={isPointing}/>
          <SideSelector lightNumber={fixtures.length}/>
          {
            selectedFixture ? <FixtureCard setFixtures={setFixtures} closeForm={setSelectedFixture} fixture={selectedFixture}/>
            : null
          }
        </Stack>
      </Stack>
    </div>
  );
}