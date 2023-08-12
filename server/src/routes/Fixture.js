let fixtures = require("../data/fixtures.json")
const fs = require("node:fs")

module.exports = (app) => {
    app.delete('/api/fixture/:id', (req, res) =>{
        const id = req.params.id
        fixtures.splice(id, 1)
        fs.writeFile("./src/data/fixtures.json", JSON.stringify(fixtures), (err) => {console.log(err)})
        res.json(fixtures)
    })
    app.put('/api/fixture/:id', (req, res) =>{
        const id = req.params.id
        let newFixture = req.body
        newFixture.midiChannels = parseInt(newFixture.midiChannels)
        let midi
        switch (newFixture.midiChannels){
            case 4:
                midi = {pan : newFixture.midiStart, milli_pan : newFixture.midiStart+1, tilt : newFixture.midiStart+2, milli_tilt : newFixture.midiStart+3}
                break
            case 2:
                midi = {pan : newFixture.midiStart, tilt : newFixture.midiStart+1}
                break
            default:
                return res.status(400).json({message : `Unable to handle fixture with ${newFixture.midiChannels} MIDI channels`})
        }
        delete newFixture.midiStart
        delete newFixture.midiChannels
        fixtures[id] = {...newFixture, midi}
        fs.writeFile("./src/data/fixtures.json", JSON.stringify(fixtures), (err) => {console.log(err)})
        res.json(fixtures)
    })
}
