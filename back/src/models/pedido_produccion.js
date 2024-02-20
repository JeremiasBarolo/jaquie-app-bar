'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedido_produccion extends Model {
    
    static associate(models) {
      pedido_produccion.belongsTo(models.venta, { foreignKey: 'ventaId' });
      pedido_produccion.belongsTo(models.maestro_articulos, { foreignKey: 'maestroId' });
      
    }
  }
  pedido_produccion.init({
    cant_requerida: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pedido_produccion',
  });
  return pedido_produccion;
};