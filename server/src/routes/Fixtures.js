const { getFixtures } = require("../services/Fixtures")

module.exports = (app) => {
    app.get('/api/fixtures', (req, res) =>{
        res.json(getFixtures())
    })
}