const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class artist extends Model { }

module.exports = (sequelize)=> artist.init(
    {
        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        Name: {
            type: Sequelize.STRING
        }
    },{ sequelize, modelName:'artist' }
)