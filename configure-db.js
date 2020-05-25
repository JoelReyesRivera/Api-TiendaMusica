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

artist.hasMany(albums,{foreignKey:'ArtistId', as:"Albums"})
albums.hasMany(tracks,{foreignKey:'AlbumId', as:"Tracks"})
genres.hasMany(tracks,{foreignKey:'GenreId', as:"Tracks"})
media_types.hasMany(tracks,{foreignKey:'MediaTypeId', as:"Tracks"})




sequelize.sync({force:true});


module.exports = {
};