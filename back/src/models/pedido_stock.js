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
      pedido_stock.belongsToMany(models.disponibilidad_articulos, {
        foreignKey: 'pedidoId',
        onUpdate: 'CASCADE',
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