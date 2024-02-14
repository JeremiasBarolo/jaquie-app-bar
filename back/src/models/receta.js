'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class receta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  receta.init({
    cant_necesaria: DataTypes.INTEGER,
    n_linea: DataTypes.INTEGER,
    cant_fisica: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'receta',
  });
  return receta;
};