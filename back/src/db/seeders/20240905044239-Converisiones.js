'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('conversion_UMs', [
      { uni_medida: 'L',seg_umedida: 'ml',cant_principal: 1 ,cant_secundaria: 1000, createdAt: new Date(), updatedAt: new Date() },
      { uni_medida: 'Kg',seg_umedida: 'g',cant_principal: 1 ,cant_secundaria: 1000, createdAt: new Date(), updatedAt: new Date() },
    
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
