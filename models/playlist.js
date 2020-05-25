const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class playlist extends Model { }

module.exports = (sequelize)=> playlist.init(
    {
        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        Name: {
            type: Sequelize.STRING
        }
    },{ sequelize, modelName:'playlist' }
)