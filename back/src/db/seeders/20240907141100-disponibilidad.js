'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('disponibilidad_articulos', [
      { cant_disponible: 1, cant_comprometida: 1, cant_fisica: 1, articuloId: 1, conversionId: 1,  createdAt: new Date(), updatedAt: new Date() },
      { cant_disponible: 1, cant_comprometida: 1, cant_fisica: 1, articuloId: 2, conversionId: 1,  createdAt: new Date(), updatedAt: new Date() },
      { cant_disponible: 1, cant_comprometida: 1, cant_fisica: 1, articuloId: 5, conversionId: 2,  createdAt: new Date(), updatedAt: new Date() },
      { cant_disponible: 1, cant_comprometida: 1, cant_fisica: 1, articuloId: 6, conversionId: 2,  createdAt: new Date(), updatedAt: new Date() },
      { cant_disponible: 1, cant_comprometida: 1, cant_fisica: 1, articuloId: 7, conversionId: 2,  createdAt: new Date(), updatedAt: new Date() },

      
      
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
