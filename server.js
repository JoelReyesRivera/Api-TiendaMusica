const express = require('express')
const morgan = require('morgan')

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const models = require('./configure-db')
const media_types = require("./routes/media_types")(models);
app.use("/api/MediaTypes",media_types);
const genres = require("./routes/genres")(models);
app.use("/api/Genres",genres);
const playlist = require("./routes/playlist")(models);
app.use("/api/Playlist",playlist);
const artist = require("./routes/artist")(models);
app.use("/api/Artist",artist);


var port = process.env.PORT || 3000

app.use(morgan('dev'))

app.listen(port, err => {
  if (err) {
    return console.log('Ocurrio un error', err)
  }
  console.log(`http://localhost:${port}`)
})
