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
const employees = require("./routes/employees")(models);
app.use("/api/Employees",employees);
const albums = require("./routes/albums")(models);
app.use("/api/Albums",albums);
const customers = require("./routes/customers")(models);
app.use("/api/Customers",customers);
const invoices = require("./routes/invoices")(models);
app.use("/api/Invoices",invoices);
const tracks = require("./routes/tracks")(models);
app.use("/api/Tracks",tracks);
const playlist_track = require("./routes/playlist_track")(models);
app.use("/api/PlaylistTrack",playlist_track);
const invoices_items = require("./routes/invoices_item")(models);
app.use("/api/InvoicesItems",invoices_items);


app.use(morgan('dev'))


var port = process.env.PORT || 3000


app.listen(port, err => {
  if (err) {
    return console.log('Ocurrio un error', err)
  }
  console.log(`http://localhost:${port}`)
})
