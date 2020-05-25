const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class media_types extends Model { }

module.exports = (sequelize)=> media_types.init(
    {
        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        Name: {
            type: Sequelize.STRING
        }
    },{ sequelize, modelName:'media_types' }
)