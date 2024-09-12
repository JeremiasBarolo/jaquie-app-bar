'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      venta.belongsToMany(models.maestro_articulos, 
        { 
          through: models.pedido_produccion,
          foreignKey: 'ventaId',
        
        });
        venta.belongsTo(models.TipoFormaPagos, {
          foreignKey: 'tipoFormaPagoId',
          onUpdate: 'CASCADE',
        });

      

    }
    
  }
  venta.init({
    mesa: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'venta',
  });
  return venta;
};