const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class invoices_items extends Model { }

module.exports = (sequelize)=> invoices_items.init(
    {
        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        UnitPrice: {
            type: Sequelize.NUMBER
        },
        Quantity:{
            type: Sequelize.INTEGER
        }
    },{ sequelize, modelName:'invoices_items' }
)