const express = require('express')
const cors = require('cors')
const app = express()
const {spawn} = require('node:child_process') 
const port = process.env.PORT || 3001
const midi = require('../src/midi/midi')
const trackingInit = require('./midi/tracking').init

const OPEN_AT_LAUNCH = false

app.use(express.json())
.use(cors())

app.get('/', (req, res) => {
    res.json("Ok")
})

app.use('/tracking', express.static('./../client/build'))

require('./routes/unselect')(app)
require('./routes/Fixtures')(app)
require('./routes/Room')(app)
require('./routes/Track')(app)
require('./routes/Fixture')(app)

const server = app.listen(port, async () => {
  console.log('Application démarrée')
  app.locals.midiPorts = await midi.init()
  trackingInit(app.locals.midiPorts)
  if (OPEN_AT_LAUNCH) {
    spawn('explorer.exe', ["http://localhost:"+port+"/tracking"])
  }
  
})

require('./routes/close')(app, server)

app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandée.'
    res.status(404).json({message});
});