'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_articulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tipo_articulo.hasMany(models.maestro_articulos, {
        foreignKey: 'tipoId'
      })
    }
  }
  tipo_articulo.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipo_articulo',
  });
  return tipo_articulo;
};