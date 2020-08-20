const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database')
class TagModel extends Model {};

TagModel.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Tag' // We need to choose the model name
});

module.exports = TagModel;