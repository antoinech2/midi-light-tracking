function getFixtures(){
    const fixtures = require("../../data/fixtures.json")
    return fixtures.map((fixture) => ({name : fixture.name, x : fixture.x, y : fixture.y, z : fixture.z, pan : fixture.pan, tilt : fixture.tilt, midiChannels: Object.keys(fixture.midi).length, midiStart: fixture.midi.pan}))
}

module.exports = {getFixtures}