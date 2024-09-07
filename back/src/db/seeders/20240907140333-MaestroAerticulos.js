'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('maestro_articulos', [
      { descripcion: 'Fernet', conversionId: 1, tipoId: 3, costo_unitario: 1200,  createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Coca', conversionId: 1, tipoId: 3, costo_unitario: 1200,  createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Fernet con Coca', conversionId: 1, tipoId: 4, costo_unitario: 12000,  createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Lomo Completo', conversionId: 2, tipoId: 4, costo_unitario: 12000,  createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Carne de Lomo', conversionId: 2, tipoId: 3, costo_unitario: 1200,  createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Pan de Lomo', conversionId: 2, tipoId: 3, costo_unitario: 1200,  createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Papas Copetin', conversionId: 2, tipoId: 2, costo_unitario: 1200,  createdAt: new Date(), updatedAt: new Date() },
      
      
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
