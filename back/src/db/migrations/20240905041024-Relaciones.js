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

    await queryInterface.addColumn('pedido_produccions', 'ventaId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'venta',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('pedido_produccions', 'maestroId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'maestro_articulos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

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

// <=============================== Bebidas ===============================>
await queryInterface.addColumn('Bebidas', 'nombre', {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'maestro_articulos',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

await queryInterface.addColumn('Bebidas', 'primerComponente', {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'maestro_articulos',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
await queryInterface.addColumn('Bebidas', 'segundoComponente', {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'maestro_articulos',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
await queryInterface.addColumn('Bebidas', 'tercerComponente', {
  type: Sequelize.INTEGER,
  allowNull: true,
  references: {
    model: 'maestro_articulos',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
await queryInterface.addColumn('Bebidas', 'cuartoComponente', {
  type: Sequelize.INTEGER,
  allowNull: true,
  references: {
    model: 'maestro_articulos',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
await queryInterface.addColumn('Bebidas', 'quintoComponente', {
  type: Sequelize.INTEGER,
  allowNull: true,
  references: {
    model: 'maestro_articulos',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});


await queryInterface.addColumn('venta', 'tipoFormaPagoId', {
  type: Sequelize.INTEGER,
  allowNull: true,
  references: {
    model: 'TipoFormaPagos',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

// <=============================== Fin Bebidas ===============================> 

    
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
    await queryInterface.removeColumn('pedido_produccions', 'ventaId');
    await queryInterface.removeColumn('pedido_produccions', 'maestroId');
    await queryInterface.removeColumn('pedido_stocks', 'articuloId');
    // <=============================== Fin Pedido Stock y Produccion ===============================> 

    // <=============================== Disponibilidad de Articulos ===============================> 
    await queryInterface.removeColumn('disponibilidad_articulos', 'articuloId');
    await queryInterface.removeColumn('disponibilidad_articulos', 'conversionId');
    // <=============================== Fin Disponibilidad de Articulos  ===============================> 

    // <=============================== Usuarios ===============================> 
    await queryInterface.removeColumn('usuarios', 'personaId');
    // <=============================== Fin Usuarios ===============================> 


  }
};