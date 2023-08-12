const tracking = require("../midi/tracking")

module.exports = (app) => {
    app.post('/api/track', (req, res) =>{
        tracking.track(req.body.coords, req.body.modificationFixtureId, req.body.modificationFixtureValue).then(_ => res.json({}))
    })
}