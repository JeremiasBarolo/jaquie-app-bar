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
      // relacion comversion
      disponibilidad_articulos.belongsTo(models.conversion_UM, {
        foreignKey: 'conversionId',
        onUpdate: 'CASCADE',
      });

      disponibilidad_articulos.belongsTo(models.maestro_articulos, {
        foreignKey: 'articuloId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
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