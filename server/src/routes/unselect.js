const { midiPorts } = require('../midi/midi')

module.exports = (app, server) => {
    app.put('/api/unselect', (req, res) =>{
        midiPorts.Output.send("noteon", {
            note: 64,
            velocity: 127,
            channel: 0
        })
        res.status(200)
    })
}