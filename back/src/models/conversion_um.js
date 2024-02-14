'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversion_UM extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      conversion_UM.hasMany(models.maestro_articulos, {
        foreignKey: 'conversionId',
      })

      conversion_UM.hasMany(models.disponibilidad_articulos, {
        foreignKey: 'unidad_medida'
      })
    }
  }
  conversion_UM.init({
    uni_medida: DataTypes.STRING,
    seg_umedida: DataTypes.STRING,
    cant_principal: DataTypes.INTEGER,
    cant_secundaria: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'conversion_UM',
  });
  return conversion_UM;
};