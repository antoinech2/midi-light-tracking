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
        fixtures[id] = req.body
        fs.writeFile("./src/data/fixtures.json", JSON.stringify(fixtures), (err) => {console.log(err)})
        res.json(fixtures)
    })
}
