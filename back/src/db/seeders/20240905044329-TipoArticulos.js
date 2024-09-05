'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipo_articulos', [
      { description: 'Bebidas', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Comidas', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Insumos', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Productos Elaborados', createdAt: new Date(), updatedAt: new Date() },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
  }
};
