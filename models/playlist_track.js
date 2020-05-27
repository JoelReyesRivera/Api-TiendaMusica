const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class playlist_track extends Model { }

module.exports = (sequelize)=> playlist_track.init({},
    { sequelize, modelName:'playlist_track' }
)