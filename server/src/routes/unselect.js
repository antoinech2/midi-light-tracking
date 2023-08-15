//const { midiPorts } = require("../midi/tracking")

module.exports = (app) => {
    app.put('/api/unselect', (req, res) =>{
        app.locals.midiPorts.Output.send("noteon", {
            note: 64,
            velocity: 127,
            channel: 0
        })
        res.status(200).end()
    })
}