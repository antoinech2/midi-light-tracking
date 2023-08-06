const fixtures = require("../data/fixtures.json")

module.exports = (app) => {
    app.get('/api/fixtures', (req, res) =>{
        res.json(fixtures)
    })
}