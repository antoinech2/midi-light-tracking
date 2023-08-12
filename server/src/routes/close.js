const midi = require("./../midi/midi")

module.exports = (app, server) => {
    app.get('/api/close', (req, res) =>{
        server.close()
        midi.close()
        res.status(200)
    })
}