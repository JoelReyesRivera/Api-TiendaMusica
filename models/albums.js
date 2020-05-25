const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class albums extends Model { }

module.exports = (sequelize)=> albums.init(
    {
        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        Title: {
            type: Sequelize.STRING
        }
    },{ sequelize, modelName:'albums' }
)