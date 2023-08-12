const fixtures = require("../data/fixtures.json")

module.exports = (app) => {
    app.get('/api/fixtures', (req, res) =>{
        res.json(fixtures.map((fixture) => ({name : fixture.name, x : fixture.x, y : fixture.y, z : fixture.z, pan : fixture.pan, tilt : fixture.tilt, midiChannels: Object.keys(fixture.midi).length, midiStart: fixture.midi.pan})))
    })
}