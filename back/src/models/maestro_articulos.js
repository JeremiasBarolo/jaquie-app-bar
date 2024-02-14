'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class maestro_articulos extends Model {
    
    static associate(models) {


      // relacion con tipo de articulo
      maestro_articulos.belongsTo(models.tipo_articulo, {
        foreignKey: 'tipoId',
        onUpdate: 'CASCADE',
      });


      // relacion comversion
      maestro_articulos.belongsTo(models.conversion_UM, {
        foreignKey: 'conversionId',
        onUpdate: 'CASCADE',
      });



      maestro_articulos.hasOne(models.disponibilidad_articulos, {
        foreignKey: 'articuloId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      // Ventas
      // maestro_articulos.belongsToMany(models.venta, {
      //   through: 'pedido_produccion',
      //   foreignKey: 'articuloId',
      //   onUpdate: 'CASCADE',  
      // });

      maestro_articulos.hasMany(models.receta, {
        foreignKey: 'maestroId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

    }
  }
  maestro_articulos.init({
    costo_unitario: DataTypes.INTEGER,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'maestro_articulos',
  });
  return maestro_articulos;
};