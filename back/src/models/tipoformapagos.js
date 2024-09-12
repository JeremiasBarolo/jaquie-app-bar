'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoFormaPagos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TipoFormaPagos.hasMany(models.venta, {
        foreignKey: 'tipoFormaPagoId'
      })
    }
  }
  TipoFormaPagos.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipoFormaPagos',
  });
  return TipoFormaPagos;
};