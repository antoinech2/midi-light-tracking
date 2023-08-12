const tracking = require("../midi/tracking")

module.exports = (app) => {
    app.post('/api/track', (req, res) =>{
        tracking.track(req.body).then(_ => res.json({}))
    })
}