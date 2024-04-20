'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class maestro_articulos extends Model {
    
    static associate(models) {


      // Relacion con tipo de articulo
      maestro_articulos.belongsTo(models.tipo_articulo, {
        foreignKey: 'tipoId',
        onUpdate: 'CASCADE',
      });


      // Relacion comversion
      maestro_articulos.belongsTo(models.conversion_UM, {
        foreignKey: 'conversionId',
        onUpdate: 'CASCADE',
      });


      // Disponibilidad de Articulos
      maestro_articulos.hasOne(models.disponibilidad_articulos, {
        foreignKey: 'articuloId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      // Venta - Maestro de Articulos
      maestro_articulos.belongsToMany(models.venta, {
        through: models.pedido_produccion,
        foreignKey: 'maestroId',
      }
         
      );

      // Recetas
      maestro_articulos.hasMany(models.receta, {
        foreignKey: 'maestroId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });


      // Pedido de Stock  
      maestro_articulos.hasMany(models.pedido_stock, {
        foreignKey: 'articuloId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      
     
      maestro_articulos.hasMany(models.pedido_produccion, {
        foreignKey: 'maestroId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });


      maestro_articulos.hasMany(models.Bebidas, {
        foreignKey: 'nombre',
        
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      maestro_articulos.hasMany(models.Bebidas, {
        foreignKey: 'primerComponente',
        
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      

      maestro_articulos.hasMany(models.Bebidas, {
        foreignKey: 'segundoComponente',
        
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      maestro_articulos.hasMany(models.Bebidas, {
        foreignKey: 'tercerComponente',
        
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      maestro_articulos.hasMany(models.Bebidas, {
        foreignKey: 'cuartoComponente',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      maestro_articulos.hasMany(models.Bebidas, {
        foreignKey: 'quintoComponente',
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