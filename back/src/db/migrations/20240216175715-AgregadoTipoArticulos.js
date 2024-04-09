'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tipo_articulos', [
      { description: 'Bebidas', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Comidas', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Insumos', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Productos Elaborados', createdAt: new Date(), updatedAt: new Date() },
      
    ], {});

    await queryInterface.bulkInsert('conversion_UMs', [
      { uni_medida: 'L',seg_umedida: 'ml',cant_principal: 1 ,cant_secundaria: 1000, createdAt: new Date(), updatedAt: new Date() },
      { uni_medida: 'Kg',seg_umedida: 'g',cant_principal: 1 ,cant_secundaria: 1000, createdAt: new Date(), updatedAt: new Date() },
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tipo_articulos', null, {});
    await queryInterface.bulkDelete('conversion_UMs', null, {});
  }
};