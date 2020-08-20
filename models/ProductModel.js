const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database')
class ProductModel extends Model {};

ProductModel.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  productCode: {
      type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Product' // We need to choose the model name
});

module.exports = ProductModel;