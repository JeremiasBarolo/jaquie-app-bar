'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estadistica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  estadistica.init({
    costo_total: DataTypes.INTEGER,
    recaudacion: DataTypes.INTEGER,
    profit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'estadistica',
  });
  return estadistica;
};