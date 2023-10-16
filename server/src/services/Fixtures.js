
function getFixtures(){
    const fixtures = require("../../data/fixtures.json")
    return fixtures.map((fixture) => ({name : fixture.name, x : fixture.x, y : fixture.y, z : fixture.z, pan : fixture.pan, tilt : fixture.tilt, inverted_pan : fixture.inverted_pan, inverted_tilt : fixture.inverted_tilt, midiChannels: Object.keys(fixture.midi).length, midiStart: fixture.midi.pan}))
}

module.exports = {getFixtures}