'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

// <=============================== Maestro de articulos ===============================> 
    await queryInterface.addColumn('maestro_articulos', 'tipoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_articulos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('maestro_articulos', 'conversionId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'conversion_UMs',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
// <=============================== Fin Maestro de articulos ===============================> 


// <=============================== Recetas ===============================> 
    await queryInterface.addColumn('receta', 'articuloId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'disponibilidad_articulos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('receta', 'maestroId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'maestro_articulos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
// <=============================== Fin Recetas ===============================> 


// <=============================== Pedido Stock y Produccion ===============================> 
    await queryInterface.addColumn('pedido_stocks', 'articuloId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'maestro_articulos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('pedido_produccions', 'articuloId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'maestro_articulos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
// <=============================== Fin Pedido Stock y Produccion ===============================> 



// <=============================== Disponibilidad de Articulos ===============================> 
    await queryInterface.addColumn('disponibilidad_articulos', 'articuloId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'maestro_articulos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('disponibilidad_articulos', 'conversionId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'conversion_UMs',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
// <=============================== Fin Disponibilidad de Articulos  ===============================> 



// <=============================== Ventas ===============================> 
    await queryInterface.addColumn('venta', 'pedidoId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'maestro_articulos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

// <=============================== Fin Ventas ===============================> 




// <=============================== Usuarios ===============================> 
await queryInterface.addColumn('usuarios', 'personaId', {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'personas',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

// <=============================== Fin Usuarios ===============================> 

    
  },

  down: async (queryInterface, Sequelize) => {
    
    // <=============================== Maestro de articulos ===============================> 
    await queryInterface.removeColumn('maestro_articulos', 'tipoId');
    await queryInterface.removeColumn('maestro_articulos', 'conversionId');
    // <=============================== Fin Maestro de articulos ===============================> 

    // <=============================== Recetas ===============================> 
    await queryInterface.removeColumn('receta', 'articuloId');
    await queryInterface.removeColumn('receta', 'maestroId');
    // <=============================== Fin Recetas ===============================> 

    // <=============================== Pedido Stock y Produccion ===============================> 
    await queryInterface.removeColumn('pedido_stocks', 'articuloId');
    await queryInterface.removeColumn('pedido_produccions', 'articuloId');
    // <=============================== Fin Pedido Stock y Produccion ===============================> 

    // <=============================== Disponibilidad de Articulos ===============================> 
    await queryInterface.removeColumn('disponibilidad_articulos', 'articuloId');
    await queryInterface.removeColumn('disponibilidad_articulos', 'unidad_medida');
    // <=============================== Fin Disponibilidad de Articulos  ===============================> 

    // <=============================== Ventas ===============================> 
    await queryInterface.removeColumn('venta', 'pedidoId');
    // <=============================== Fin Ventas ===============================> 

    // <=============================== Usuarios ===============================> 
    await queryInterface.removeColumn('usuarios', 'personaId');
    // <=============================== Fin Usuarios ===============================> 


  }
};