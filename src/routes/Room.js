const room = require("../data/room.json")

module.exports = (app) => {
    app.get('/api/room', (req, res) =>{
        res.json(room.room)
    })
}