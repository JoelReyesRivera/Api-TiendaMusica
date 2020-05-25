const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()
require("./configure-db");


var port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())

const routes = require('./routes')
routes(app)

app.listen(port, err => {
  if (err) {
    return console.log('Ocurrio un error', err)
  }
  console.log(`http://localhost:${port}`)
})
