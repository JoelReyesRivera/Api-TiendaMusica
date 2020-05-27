const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class customers extends Model { }

module.exports = (sequelize)=> customers.init(
    {
        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        LastName: {
            type: Sequelize.STRING
        },
        FirstName: {
            type: Sequelize.STRING
        },
        Company: {
            type: Sequelize.STRING
        },
        Address: {
            type: Sequelize.STRING
        },
        City:{
            type: Sequelize.STRING
        },
        State:{
            type: Sequelize.STRING
        },
        Country:{
            type: Sequelize.STRING
        },
        PostalCode:{
            type: Sequelize.STRING
        },
        Phone:{
            type: Sequelize.STRING
        },
        Fax:{
            type: Sequelize.STRING
        },
        Email:{
            type: Sequelize.STRING
        }
    },{ sequelize, modelName:'customers' }
)