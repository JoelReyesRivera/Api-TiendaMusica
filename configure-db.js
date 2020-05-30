const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

sequelize.authenticate()
    .then(()=> {
        console.log("Conexión a la base de datos establecida");
    })
    .error((error)=> {
        console.error(error);
    });

const media_types = require("./models/media_types")(sequelize);
const genres = require("./models/genres")(sequelize);
const artist = require("./models/artist")(sequelize);
const playlist = require("./models/playlist")(sequelize);
const albums = require("./models/albums")(sequelize);
const tracks = require("./models/tracks")(sequelize);
const employees = require("./models/employees")(sequelize);
const customers = require("./models/customers")(sequelize);
const invoices = require("./models/invoices")(sequelize);
const invoices_items = require("./models/invoices_items")(sequelize);


artist.hasMany(albums,{foreignKey:'ArtistId', as:"Albums"})
albums.hasMany(tracks,{foreignKey:'AlbumId', as:"Tracks"})
genres.hasMany(tracks,{foreignKey:'GenreId', as:"Tracks"})
media_types.hasMany(tracks,{foreignKey:'MediaTypeId', as:"Tracks"})
employees.hasMany(employees,{foreignKey:'ReportsTo', as:"Employees"})
employees.hasMany(customers,{foreignKey:'SupportRepId', as:"Customers"})
customers.hasMany(invoices,{foreignKey:'CustomerId', as:"Invoices"})
invoices.hasMany(invoices_items,{foreignKey:'InvoiceId', as:"Invoices_items"})
tracks.hasMany(invoices_items,{foreignKey:'TrackId', as:"Invoices_items"})
playlist.belongsToMany(tracks,{foreignKey:'PlayListId',through: "playlist_track" })
tracks.belongsToMany(playlist,{foreignKey:'TrackId',through: "playlist_track"})
sequelize.sync({force:false});

module.exports = {
    media_types,genres,artist,playlist,albums,tracks,employees,customers,invoices,invoices_items
}