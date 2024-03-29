'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tipo_articulos', [
      { description: 'Bebidas', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Comidas', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Insumos', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Productos Elaborados', createdAt: new Date(), updatedAt: new Date() },
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tipo_articulos', null, {});
  }
};