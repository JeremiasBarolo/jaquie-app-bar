'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedido_stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Relación con Maestro de Artículos
      pedido_stock.belongsTo(models.maestro_articulos, { 
        foreignKey: 'articuloId' 
      });

    // Relación con Disponibilidad de Artículos
      pedido_stock.hasOne(models.disponibilidad_articulos, { 
        foreignKey: 'articuloId' 
      });
    }
  }
  pedido_stock.init({
    cant_requerida: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pedido_stock',
  });
  return pedido_stock;
};