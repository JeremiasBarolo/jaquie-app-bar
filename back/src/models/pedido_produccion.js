'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedido_produccion extends Model {
    
    static associate(models) {
      pedido_produccion.belongsToMany(models.ventas, {
        foreignKey: 'pedidoId',
        onUpdate: 'CASCADE',
      });
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