const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000


app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json("Ok")
})

require('./routes/getFixtures')(app)

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée.'
      res.status(404).json({message});
  });

app.listen(port, () => console.log('Application démarrée'))
