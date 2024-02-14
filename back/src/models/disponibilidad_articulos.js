'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class disponibilidad_articulos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  disponibilidad_articulos.init({
    cant_fisica: DataTypes.INTEGER,
    cant_comprometida: DataTypes.INTEGER,
    cant_disponible: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'disponibilidad_articulos',
  });
  return disponibilidad_articulos;
};