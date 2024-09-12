'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductosDelDia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductosDelDia.belongsTo(models.maestro_articulos, {
        foreignKey: 'articuloId',
        onUpdate: 'CASCADE',
      })

      ProductosDelDia.belongsTo(models.estadistica, {
        foreignKey: 'estadisticaId',
        onUpdate: 'CASCADE',
      })
    }
  }
  ProductosDelDia.init({
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductosDelDia',
  });
  return ProductosDelDia;
};