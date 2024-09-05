'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TipoFormaPagos', [
      { descripcion: 'Debito', createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Credito', createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Efectivo', createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Efectivo + Credito', createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Efectivo + Debito', createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Credito + Debito', createdAt: new Date(), updatedAt: new Date() },
      { descripcion: 'Otros', createdAt: new Date(), updatedAt: new Date() },
    
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
