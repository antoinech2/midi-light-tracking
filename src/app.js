const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const midi = require("./midi/midi")

const app = express()
const port = process.env.PORT || 3001


app.use(bodyParser.json())
.use(cors())

app.get('/', (req, res) => {
    res.json("Ok")
})

require('./routes/getFixtures')(app)
require('./routes/getRoom')(app)
require('./routes/setTrack')(app)

const server = app.listen(port, () => console.log('Application démarrée'))

require('./routes/close')(app, server)

app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandée.'
    res.status(404).json({message});
});