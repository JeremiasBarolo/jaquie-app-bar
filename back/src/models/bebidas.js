'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bebidas extends Model {
    
    static associate(models) {
      Bebidas.belongsTo(models.maestro_articulos, {
        foreignKey: 'nombre',
        as: 'NombreArticulo',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Bebidas.belongsTo(models.maestro_articulos, {
        foreignKey: 'primerComponente',
        as: 'PrimerComponenteArticulo',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Bebidas.belongsTo(models.maestro_articulos, {
        foreignKey: 'segundoComponente',
        as: 'SegundoComponenteArticulo',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Bebidas.belongsTo(models.maestro_articulos, {
        foreignKey: 'tercerComponente',
        as: 'TercerComponenteArticulo',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Bebidas.belongsTo(models.maestro_articulos, {
        foreignKey: 'cuartoComponente',
        as: 'CuartoComponenteArticulo',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Bebidas.belongsTo(models.maestro_articulos, {
        foreignKey: 'quintoComponente',
        as: 'QuintoComponenteArticulo',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Bebidas.init({
    primerComponenteCantidad: DataTypes.INTEGER,
    segundoComponenteCantidad: DataTypes.INTEGER,
    tercerComponenteCantidad: DataTypes.INTEGER,
    cuartoComponenteCantidad: DataTypes.INTEGER,
    quintoComponenteCantidad: DataTypes.INTEGER,
    cantidadTotalRecipiente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bebidas',
  });
  return Bebidas;
};