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



      // Para crear articulos por pedidos
      maestro_articulos.hasMany(models.pedido_stock, {
        foreignKey: 'articuloId',
        onUpdate: 'CASCADE',
      });


      // Para crear pedidos de las mesas
      maestro_articulos.hasMany(models.pedido_produccion, {
        foreignKey: 'articuloId',
        onUpdate: 'CASCADE',
      });


      // recetas de productos elaborados
      maestro_articulos.belongsToMany(models.disponibilidad_articulos, {
        through: 'receta',
        foreignKey: 'maestroId',
        onUpdate: 'CASCADE',  
      });

      // Disponibilidad de Articulos
      maestro_articulos.hasMany(models.disponibilidad_articulos, {
        through: 'pedido_stock',
        foreignKey: 'articuloId',
        onUpdate: 'CASCADE',  
      });

      // Ventas
      maestro_articulos.hasMany(models.venta, {
        through: 'pedido_produccion',
        foreignKey: 'articuloId',
        onUpdate: 'CASCADE',  
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